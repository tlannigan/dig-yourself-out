import { generalRules } from '@/app/rules/general'
import getIssues from '../issueParser'

export const unknownFileParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [generalRules])

        return { issues }
    },
}
