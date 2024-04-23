import getIssues from '../issueParser'
import { generalRules } from '../../rules/general'
import { crashReportRules } from '../../rules/crash'

export const crashReportParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [generalRules, crashReportRules])

        return { issues }
    },
}
