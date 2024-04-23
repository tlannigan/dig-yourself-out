import { Button, Flex, HStack, Input, Text, UseDisclosureProps } from '@chakra-ui/react'
import { ChangeEventHandler, DragEventHandler, Dispatch, SetStateAction } from 'react'
import LoadingOverlay from './loadingOverlay'
import UploadRemoteFileModal from './uploadRemoteFileModal'
import { FileUploadOutlined } from '@mui/icons-material'

export type UploadCallToActionProps = {
    handlers: FileHandlers
    setUploadedFile: (prevFile: File) => void
    setRemoteFileUrl: Dispatch<SetStateAction<string>>
    setIsLoading: (isLoading: boolean) => void
    disclosure: UseDisclosureProps
    isLoading: boolean
}

export type FileHandlers = {
    dropHandler: DragEventHandler
    dragOverHandler: DragEventHandler
    dragLeaveHandler: DragEventHandler
    fileBrowserHandler: ChangeEventHandler
}

export default function UploadCallToAction({
    handlers,
    setUploadedFile,
    setRemoteFileUrl,
    setIsLoading,
    disclosure,
    isLoading
}: UploadCallToActionProps) {
    const { isOpen, onOpen, onClose } = disclosure
    
    const openFileInput = () => {
        const fileInput = document.getElementById('file-input')
        if (fileInput) fileInput.click()
    }

    return (
        <Flex
            id="dropzone"
            onDrop={handlers.dropHandler}
            onDragOver={handlers.dragOverHandler}
            onDragLeave={handlers.dragLeaveHandler}
            direction="column"
            justifyContent="center"
            rowGap={4}
            borderRadius={4}
            fontSize={24}
            color='white'
            flexGrow={1}>
            
            <LoadingOverlay isLoading={isLoading} />

            <HStack mx='auto'>
                <Text>Drag your files here</Text>
                <FileUploadOutlined fontSize='large' />
            </HStack>
            
            <Text mx="auto">or</Text>

            <HStack mx="auto" mt={4}>
                <Button onClick={openFileInput} size="lg" colorScheme="green" mr={4}>
                    Browse your PC
                </Button>
                <Input type="file" accept=".txt, .log" onChange={handlers.fileBrowserHandler} id="file-input" display="none" />
                <Button size="lg" colorScheme="green" onClick={onOpen}>
                    Upload from URL
                </Button>
            </HStack>

            <UploadRemoteFileModal
                setRemoteFileUrl={setRemoteFileUrl}
                disclosure={disclosure}
                isLoading={isLoading} />
        </Flex>
    )
}