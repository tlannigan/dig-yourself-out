import { Flex, Button, UseDisclosureProps } from '@chakra-ui/react'
import Log from './log'
import Sidebar from './sidebar'
import LoadingOverlay from './loadingOverlay'
import { FileHandlers } from './uploadCallToAction'
import UploadRemoteFileModal from './uploadRemoteFileModal'
import { Dispatch, SetStateAction } from 'react'

export type InspectorProps = {
    handlers: FileHandlers
    setRemoteFileUrl: Dispatch<SetStateAction<string>>
    disclosure: UseDisclosureProps
    isLoading: boolean
    isParsing: boolean
    file: any
}

export default function Inspector({
    handlers,
    setRemoteFileUrl,
    disclosure,
    isLoading,
    isParsing,
    file
}: InspectorProps) {
    return (
        <Flex
            flexGrow={1}
            borderRadius="lg"
            id="dropzone"
            onDrop={handlers.dropHandler}
            onDragOver={handlers.dragOverHandler}
            onDragLeave={handlers.dragLeaveHandler}>

            <LoadingOverlay isLoading={isLoading} isParsing={isParsing} />

            <Sidebar
                fileBrowserHandler={handlers.fileBrowserHandler}
                disclosure={disclosure}
                file={file} />

            <Flex direction="column">
                {/* <Flex px={4} pt={4} direction='row' columnGap={4}>
                    <Button size='sm' variant='filled' color='white' fontWeight={100} bg='rgba(48, 48, 48, 0.6)' _hover={{ bg: 'rgba(48, 48, 48, 1)' }} borderColor='green.500'>Browse new file</Button>
                    <Button size='sm' variant='filled' color='white' fontWeight={100} bg='rgba(48, 48, 48, 0.6)' _hover={{ bg: 'rgba(48, 48, 48, 1)' }} borderColor='green.500'>Upload file from URL</Button>
                </Flex> */}
                <Log file={file} />
            </Flex>

            <UploadRemoteFileModal
                setRemoteFileUrl={setRemoteFileUrl}
                disclosure={disclosure}
                isLoading={isLoading} />
        </Flex>
    )
}