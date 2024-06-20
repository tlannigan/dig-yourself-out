import { Issue } from '@/parsers/issueParser'
import { Alert, AlertDescription, AlertTitle, Box, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

export default function IssueAlert({
    issue,
    listRef,
    setTargetLine
}: {
    issue:
    Issue,
    listRef: any,
    setTargetLine: Dispatch<SetStateAction<number>>
}) {
    const scrollTo = (e: any) => {
        e.preventDefault()

        // Scroll to line in react window list
        listRef?.current.scrollToItem(issue.lineNumber - 1, 'start')
        setTargetLine(issue.lineNumber)
    }

    const lineNumberText = issue.lineNumber >= 0
        ? <span> on <Box as='span' onClick={scrollTo} _hover={{ cursor: 'pointer' }}><span style={{ textDecoration: 'underline' }}>line {issue.lineNumber}</span></Box></span>
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