import getIssues from '../issueParser'
import { generalRules } from '../../rules/general'

export const extendedMultimcLogParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [generalRules])

        return { issues }
    }
}