import { Box, Flex, UseDisclosureProps } from '@chakra-ui/react'
import Log from './log'
import Sidebar from './sidebar'
import LoadingOverlay from './loadingOverlay'
import { FileHandlers } from './uploadCallToAction'
import UploadRemoteFileModal from './uploadRemoteFileModal'
import { Dispatch, SetStateAction, createRef } from 'react'

export type ParserProps = {
    handlers: FileHandlers
    setRemoteFileUrl: Dispatch<SetStateAction<string>>
    disclosure: UseDisclosureProps
    isLoading: boolean
    isParsing: boolean
    file: any
}

export default function Parser({
    handlers,
    setRemoteFileUrl,
    disclosure,
    isLoading,
    isParsing,
    file,
}: ParserProps) {
    const listRef = createRef()

    return (
        <Flex
            borderRadius="lg"
            flexGrow={1}
            maxW="100dvw"
            id="dropzone"
            onDrop={handlers.dropHandler}
            onDragOver={handlers.dragOverHandler}
            onDragLeave={handlers.dragLeaveHandler}>

            <LoadingOverlay isLoading={isLoading} isParsing={isParsing} />

            <Sidebar fileBrowserHandler={handlers.fileBrowserHandler} disclosure={disclosure} file={file} listRef={listRef} />

            <Box flexGrow={1} pt={4} pl={4} fontSize={12} whiteSpace="pre">
                <Log file={file} listRef={listRef} />
            </Box>

            <UploadRemoteFileModal setRemoteFileUrl={setRemoteFileUrl} disclosure={disclosure} isLoading={isLoading} />
        </Flex>
    )
}
