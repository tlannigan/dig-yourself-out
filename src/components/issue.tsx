import { Issue } from '@/parsers/issueParser'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'

export default function IssueAlert({ issue, listRef }: { issue: Issue, listRef: any }) {
    // Use listRef to scroll to target line
    const scrollTo = () => listRef?.current.scrollToItem(issue.lineNumber, 'start')

    const lineNumberText = issue.lineNumber >= 0
        ? <span> on <a href={'#' + issue.lineNumber} onClick={scrollTo}><span style={{ textDecoration: 'underline' }}>line {issue.lineNumber}</span></a></span>
        : ''

    return (
        <Alert status={issue.rule.level} variant='solid' borderRadius='lg'>
            <Box>
                <AlertTitle>{issue.rule.title}{lineNumberText}</AlertTitle>
                <AlertDescription>{issue.rule.description}</AlertDescription>
            </Box>
        </Alert>
    )
}