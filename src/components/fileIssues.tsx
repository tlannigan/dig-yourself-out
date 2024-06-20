import { Issue } from '@/parsers/issueParser'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack } from '@chakra-ui/react'
import IssueAlert from './issue'

export type FileIssueProps = {
    issues: Issue[],
    listRef: any
}

export default function FileIssues({ issues, listRef }: FileIssueProps) {
    return (
        <AccordionItem borderColor="transparent">
            <h2>
                <AccordionButton p={4} fontSize={16} textColor="green.500" borderRadius="lg" _hover={{ bg: '#333030' }}>
                    <Box as="span" flex={1} textAlign="left">
                        Issues
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel p={0} fontSize={14}>
                <Stack>
                    {issues.map((issue) => <IssueAlert key={issue.lineNumber} issue={issue} listRef={listRef} />)}
                </Stack>
            </AccordionPanel>
        </AccordionItem>
    )
}
