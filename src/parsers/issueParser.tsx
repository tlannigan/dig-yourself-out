import { ReactElement } from 'react'
import Issue from '../components/issue'
import { Equality } from '@/constants/enums'
import { RuleCategory } from '@/rules/general'

// Returns an array of issue components for each matched rule
export default function getIssues(fileInfo: any, ruleCategories: RuleCategory[], enableDebugging = false) {
    const issues: ReactElement[] = []

    // Iterate over rule categories
    for (const ruleCategory of ruleCategories) {
        // Short circuit if rule category doesn't apply to file
        if (!doesRuleApplyToFile(fileInfo, ruleCategory, enableDebugging)) continue

        // Iterate over individual rules
        for (const [index, rule] of ruleCategory.rules.entries()) {
            // Short circuit if file doesn't pass rule's version checks
            if (!doesRuleApplyToFile(fileInfo, rule, enableDebugging)) continue

            // Check if rule only consists of version checks and no line checking
            if (rule.candidates.length === 0) {
                issues.push(<Issue rule={rule} lineNumber={-1} key={index} />)
            } else {
                for (let line = 0; line < fileInfo.lines.length; line++) {
                    if (rule.candidates.some((candidate: any) => fileInfo.lines[line].includes(candidate))) {
                        issues.push(<Issue rule={rule} lineNumber={line + 1} key={line + 1} />)
                        if (rule.onlyAppearsOnce) break
                    }
                }
            }
        }
    }

    // Add message that no issues were found
    if (issues.length === 0) {
        issues.push(getNoIssueIssue())
    }

    return issues
}

// Check if rule should be applied
function doesRuleApplyToFile(fileInfo: any, rule: any, enableDebugging: boolean) {
    if (enableDebugging) console.log('=  ' + rule.title + '  =')

    for (const check of rule.versionChecks) {
        // Short circuit if file doesn't have required property
        if (!fileInfo[check.type]) {
            return false
        }

        if (check.equality === Equality.RANGE) {
            const ranges = check.version.split('...')
            const startInclusive = ranges[0]
            const endExclusive = ranges[1]

            const greaterThanOrEqualToCheck = versionCompare(fileInfo[check.type], startInclusive, { zeroExtend: true })
            const lessThanCheck = versionCompare(fileInfo[check.type], endExclusive, { zeroExtend: true })

            if (enableDebugging)
                console.log(`${check.type}: ${fileInfo[check.type]} between ${startInclusive} and ${endExclusive}`)

            if (greaterThanOrEqualToCheck < 0 || lessThanCheck >= 0) {
                return false
            }
        } else {
            const comparison = versionCompare(fileInfo[check.type], check.version, { zeroExtend: true })

            if (enableDebugging)
                console.log(`${check.type + ': ' + fileInfo[check.type]} ${check.equality} ${check.version} Result: ${comparison}`)

            if (check.equality === Equality.EQ && comparison !== 0) {
                return false
            } else if (check.equality === Equality.NOT && comparison === 0) {
                return false
            } else if (check.equality === Equality.GTE && comparison < 0) {
                return false
            } else if (check.equality === Equality.GT && comparison <= 0) {
                return false
            } else if (check.equality === Equality.LTE && comparison > 0) {
                return false
            } else if (check.equality === Equality.LT && comparison >= 0) {
                return false
            }
        }
    }
    return true
}

/**
 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
 *
 * This function was born in http://stackoverflow.com/a/6832721.
 *
 * @param {string} v1 The first version to be compared.
 * @param {string} v2 The second version to be compared.
 * @param {object} [options] Optional flags that affect comparison behavior:
 * <ul>
 *     <li>
 *         <tt>lexicographical: true</tt> compares each part of the version strings lexicographically instead of
 *         naturally; this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than
 *         "1.2".
 *     </li>
 *     <li>
 *         <tt>zeroExtend: true</tt> changes the result if one version string has less parts than the other. In
 *         this case the shorter string will be padded with "zero" parts instead of being considered smaller.
 *     </li>
 * </ul>
 * @returns {number|NaN}
 * <ul>
 *    <li>0 if the versions are equal</li>
 *    <li>a negative integer iff v1 < v2</li>
 *    <li>a positive integer iff v1 > v2</li>
 *    <li>NaN if either version string is in the wrong format</li>
 * </ul>
 *
 * @copyright by Jon Papaioannou (["john", "papaioannou"].join(".") + "@gmail.com")
 * @license This function is in the public domain. Do what you want with it, no strings attached.
 */
function versionCompare(v1: string, v2: string, options: any): number {
    var lexicographical: boolean = options && options.lexicographical,
        zeroExtend: boolean = options && options.zeroExtend,
        v1parts: any[] = v1.split('.'),
        v2parts: any[] = v2.split('.')

    function isValidPart(x: string) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x)
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push('0')
        while (v2parts.length < v1parts.length) v2parts.push('0')
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number)
        v2parts = v2parts.map(Number)
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1
        }

        if (v1parts[i] == v2parts[i]) {
            continue
        } else if (v1parts[i] > v2parts[i]) {
            return 1
        } else {
            return -1
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1
    }

    return 0
}

export function getNoIssueIssue() {
    const noIssueRule = {
        level: 'info',
        title: 'No issues detected',
        description: 'This is either a good thing or a bad thing.',
    }

    return <Issue rule={noIssueRule} lineNumber={-1} key={0} />
}

export function getKey(index: number) {
    return (index !== -1) ? index : 0
}