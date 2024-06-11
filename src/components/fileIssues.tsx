import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack } from '@chakra-ui/react'

export type FileIssueProps = {
    file: any
}

export default function FileIssues({ file }: FileIssueProps) {
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
            <AccordionPanel p={0}>
                <Stack>{file && file.issues ? file.issues : ''}</Stack>
            </AccordionPanel>
        </AccordionItem>
    )
}
