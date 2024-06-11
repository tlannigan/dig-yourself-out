import getIssues from '../issueParser'
import { hotspotCrashDumpRules } from '@/rules/hs_err_pid'

export const hotspotCrashDumpParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [hotspotCrashDumpRules])

        return { issues }
    },
}
