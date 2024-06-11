import getIssues from '../issueParser'
import { generalRules } from '@/rules/general'
import getLauncherName from '../launcherParser'
import { forgeRules } from '@/rules/forge'
import { fabricRules } from '@/rules/fabric'

export const extendedMultimcLogParser = {
    parse: (lines: string[]) => {
        const args = getArgs(lines)
        const systemInfo = getSystemInfo(lines)
        const issues = getIssues({ lines, ...args, ...systemInfo }, [generalRules, forgeRules, fabricRules])

        return {
            ...args,
            ...systemInfo,
            issues,
        }
    },
}

export function getArgs(lines: string[]) {
    const startOfStandardLog = lines.findIndex((l) => {
        return l.toLowerCase().includes('loading minecraft ') && l.toLowerCase().includes('with fabric loader ') ||
            l.toLowerCase().includes('modlauncher running: args') ||
            l.toLowerCase().includes('forge mod loader version')
    })

    if (startOfStandardLog === -1) {
        return {}
    }

    const firstFewLines = lines.slice(startOfStandardLog, startOfStandardLog + 10)

    // Check if using Fabric
    const fabricArgsLine = firstFewLines.find((l) => l.toLowerCase().includes('loading minecraft ') && l.toLowerCase().includes('with fabric loader '))
    if (fabricArgsLine) {
        return getFabricArgs(fabricArgsLine)
    }

    // Check if using Forge 1.16 and newer
    const modernArgsLine = firstFewLines.find((l) => l.toLowerCase().includes('modlauncher running: args'))
    if (modernArgsLine) {
        return getModernArgs(modernArgsLine)
    }

    // Check if using Forge 1.12 or below
    const legacyInfoLine = firstFewLines.find((l) => l.toLowerCase().includes('forge mod loader version'))
    if (legacyInfoLine) {
        return getLegacyArgs(legacyInfoLine)
    }
}

export function getFabricArgs(argsLine: string) {
    const splitArgsLine = argsLine.toLowerCase().split(' ')
    const mcVersionIndex = splitArgsLine.indexOf('minecraft') + 1
    const fabricLoaderVersion = splitArgsLine.indexOf('loader') + 1

    return {
        mcVersion: splitArgsLine[mcVersionIndex],
        fabricVersion: splitArgsLine[fabricLoaderVersion].trim(),
    }
}

// Parse args from Minecraft 1.16.5+
export function getModernArgs(argsLine: string) {
    const argsStart = argsLine.indexOf('args [') + 6
    const argsSlice = argsLine.slice(argsStart, argsLine.length)
    const args: any = {}

    // Separate keys from values and add them to the args object
    const keyValuePairs = argsSlice.split(', ')
    const keys = keyValuePairs.filter((s) => s.startsWith('--'))
    const values = keyValuePairs.filter((s) => !s.startsWith('--'))
    keys.forEach((key, index) => {
        const keyName = key.substring(2)
        if (keyName.startsWith('fml.')) {
            args[keyName.substring(4)] = values[index]
        } else {
            args[keyName] = values[index]
        }
    })

    args.launcher = args.assetsDir ? getLauncherName(args.assetsDir) : ''

    return args
}

// Parse args from Minecraft until 1.12.2
export function getLegacyArgs(argsLine: string) {
    const modloaderInfo = argsLine.split(' ')
    const mcVersionIndex = modloaderInfo.indexOf('Minecraft') + 1
    const mcVersion = modloaderInfo[mcVersionIndex]
    const forgeVersionIndex = modloaderInfo.indexOf('version') + 1
    const forgeVersion = modloaderInfo[forgeVersionIndex]

    return { mcVersion, forgeVersion }
}

export function getSystemInfo(lines: string[]) {
    const startOfStandardLog = lines.findIndex((l) => {
        return l.toLowerCase().includes('loading minecraft ') && l.toLowerCase().includes('with fabric loader ') ||
            l.toLowerCase().includes('modlauncher running: args') ||
            l.toLowerCase().includes('forge mod loader version')
    })

    if (startOfStandardLog === -1) {
        return {}
    }

    const firstFewLines = lines.slice(startOfStandardLog, startOfStandardLog + 10)
    const standardLogLines = lines.slice(startOfStandardLog)

    const forgeModernInfoLine = firstFewLines.find((l) => l.toLowerCase().includes('starting: java version'))
    if (forgeModernInfoLine) {
        return {
            ...getModernSystemInfo(forgeModernInfoLine),
        }
    }

    const forgeLegacyInfoLine = firstFewLines.find((l) => l.toLowerCase().includes('java is'))
    if (forgeLegacyInfoLine) {
        return {
            memoryFlags: getMemoryFlags(standardLogLines),
            ...getLegacySystemInfo(forgeLegacyInfoLine),
        }
    }

    const fabricInfoLine = firstFewLines.find((l) => l.toLowerCase().includes('    - java'))
    if (fabricInfoLine) {
        return { java: fabricInfoLine.split('    - java ')[1].trim() }
    }

    return { java: '', os: '' }
}

// Parse system info from Minecraft 1.16.5+
export function getModernSystemInfo(infoLine: string) {
    let java = ''
    let os = ''

    const systemInfoStartIndex = infoLine.indexOf('starting: java version') + 22
    const systemInfoString = infoLine.substring(systemInfoStartIndex)
    const systemInfoArray = systemInfoString.split('; ')

    if (systemInfoArray && systemInfoArray.length > 0) {
        // Parse Java version
        java = systemInfoArray[0].trim().split(' ')[0].replace('_', '.')

        // Parse operating system if available (Minecraft 1.19.2+)
        if (systemInfoArray.length > 1) {
            os = systemInfoArray[1].substring(3).trim()
        }
    }

    return { java, os }
}

// Parse system info from Minecraft until 1.12.2
export function getLegacySystemInfo(infoLine: string) {
    const systemInfoArray = infoLine.split(', ')
    const java = systemInfoArray[1].split(' ')[1].replace('_', '.')
    const os = systemInfoArray[2].substring(11)

    return { java, os }
}

// Try to find -Xmx and -Xms flags
export function getMemoryFlags(lines: string[]) {
    const jvmFlagLine = lines.find((l) => l.trim().startsWith('JVM Flags:'))
    if (jvmFlagLine) {
        const jvmFlags = jvmFlagLine.split('; ')
        const memoryFlags = jvmFlags[1].split(' ').filter((flag) => flag.startsWith('-Xmx') || flag.startsWith('-Xms'))
        return memoryFlags.join(', ')
    }
    return ''
}
