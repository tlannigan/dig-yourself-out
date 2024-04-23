import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Text, Input, UseDisclosureProps } from '@chakra-ui/react'
import { CopyAll } from '@mui/icons-material'
import { ChangeEventHandler } from 'react'

export type FileActionsProps = {
    fileBrowserHandler: ChangeEventHandler
    disclosure: UseDisclosureProps
}

export default function FileActions({
    fileBrowserHandler,
    disclosure
}: FileActionsProps) {
    const { isOpen, onOpen, onClose } = disclosure

    const openFileInput = () => {
        const fileInput = document.getElementById('file-input')
        if (fileInput) fileInput.click()
    }

    return (
        <AccordionItem borderColor="transparent">
            <h2>
                <AccordionButton fontSize={16} textColor="green.500" p={4} _hover={{ bg: '#333030' }} borderRadius='lg'>
                    <Box as="span" flex="1" textAlign="left">
                        Actions
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel borderRadius="lg" borderWidth={2} borderColor="green.500" fontSize={14} textColor="white" p={4}>
                <Flex direction='column' rowGap={2}>
                    <Text>Upload a new file (or drag it in)</Text>
                    <Flex direction="row" columnGap={4}>
                        <Input type="file" accept=".txt, .log" onChange={fileBrowserHandler} id="file-input" display="none" />
                        <Button onClick={openFileInput} aria-label='Browse device for files' variant='outline' textColor='white' _hover={{ bg: 'green.500', borderColor: 'transparent' }}>Browse</Button>
                        <Button onClick={onOpen} aria-label='Upload file from URL' variant='outline' textColor='white' _hover={{ bg: 'green.500', borderColor: 'transparent' }}>Upload from URL</Button>
                    </Flex>
                    {/* <Text mt={4}>Copy this file&apos;s URL to clipboard</Text>
                    <Button w='min-content' aria-label='Visit Discord community' rightIcon={<CopyAll />} variant='outline' textColor='white' _hover={{ bg: 'green.500', borderColor: 'transparent' }}>Share</Button> */}
                </Flex>
            </AccordionPanel>
        </AccordionItem>
    )
}