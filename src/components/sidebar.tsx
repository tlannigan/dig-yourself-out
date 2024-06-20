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
    listRef: any
}

export default function Sidebar({ fileBrowserHandler, disclosure, file, listRef }: SidebarProps) {
    const { isOpen, onToggle } = useDisclosure()

    return (
            <Box
                id="sidebar"
                flexBasis={!isOpen ? '28rem' : '0'}
                maxH="calc(100dvh - 64px)"
                pr={2}
                overflowY={!isOpen ? 'auto' : 'visible'}
                style={{ scrollbarWidth: 'thin' }}>
                <Collapse animateOpacity in={!isOpen}>
                    <Accordion defaultIndex={[0, 1, 2]} allowMultiple borderRadius={4}>
                        <FileActions fileBrowserHandler={fileBrowserHandler} disclosure={disclosure} />
                        <FileDetails file={file} />
                        <FileIssues issues={file.issues} listRef={listRef} />
                    </Accordion>
                </Collapse>
                <CollapseButton onToggle={onToggle} isOpen={isOpen} />
            </Box>
    )
}
