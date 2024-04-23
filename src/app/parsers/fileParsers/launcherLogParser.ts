import getIssues from '../issueParser'
import { generalRules } from '../../rules/general'
import { launcherLogRules } from '../../rules/launcher_log'

export const launcherLogParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [generalRules, launcherLogRules])

        return { issues }
    },
}
