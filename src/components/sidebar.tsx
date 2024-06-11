import { Accordion, Box, Collapse, UseDisclosureProps, useDisclosure } from '@chakra-ui/react'
import FileDetails from './fileDetails'
import FileIssues from './fileIssues'
import CollapseButton from './collapseButton'
import FileActions from './fileActions'
import { ChangeEventHandler } from 'react'

export type SidebarProps = {
    fileBrowserHandler: ChangeEventHandler
    disclosure: UseDisclosureProps
    file: any
}

export default function Sidebar({ fileBrowserHandler, disclosure, file }: SidebarProps) {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box
            id="sidebar"
            flexShrink={!isOpen ? 0 : 1}
            boxSize="sm"
            maxW="100%"
            h="100dvh"
            pb={4}
            overflowY={!isOpen ? 'auto' : 'visible'}
            borderRadius="lg"
            position="sticky"
            top={0}
            alignSelf="flex-start"
            style={{ scrollbarWidth: 'none' }}>
            <Collapse animateOpacity in={!isOpen} style={{ zIndex: 10 }}>
                <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
                    <FileActions fileBrowserHandler={fileBrowserHandler} disclosure={disclosure} />
                    <FileDetails file={file} />
                    <FileIssues file={file} />
                </Accordion>
            </Collapse>
            <CollapseButton onToggle={onToggle} isOpen={isOpen} />
        </Box>
    )
}
