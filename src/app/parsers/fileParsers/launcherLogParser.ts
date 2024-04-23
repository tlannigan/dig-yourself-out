import getIssues from '../issueParser'
import generalRules from '../../rules/general.json'
import launcherLogRules from '../../rules/launcher_log.json'

export const launcherLogParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [generalRules, launcherLogRules])

        return { issues }
    }
}