import {
    Button,
    Input,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    UseDisclosureProps,
} from '@chakra-ui/react'
import { KeyboardEvent, useRef } from 'react'

export type UploadRemoteFileModalProps = {
    setRemoteFileUrl: (url: string) => void
    disclosure: UseDisclosureProps
    isLoading: boolean
}

export default function UploadRemoteFileModal({ setRemoteFileUrl, disclosure, isLoading }: UploadRemoteFileModalProps) {
    const { isOpen, onOpen, onClose } = disclosure
    const initialRef = useRef(null)

    const fetchFileFromUrl = () => {
        const urlInput = document.getElementById('file-fetch-url') as HTMLInputElement
        if (urlInput && urlInput.value) setRemoteFileUrl(urlInput.value)
    }

    // Click upload button when pressing Enter in text input
    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const uploadButton = document.getElementById('fetch-remote-file-button') as HTMLElement
            if (uploadButton) uploadButton.click()
        }
    }

    return (
        <Modal initialFocusRef={initialRef} isOpen={isOpen!} onClose={onClose!} motionPreset="slideInBottom" isCentered>
            <ModalOverlay style={{ zIndex: 20 }}>
                <ModalContent bg="#222020" color="white" fontFamily="Fira Mono">
                    <ModalHeader>Upload file from URL</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                        <Text>Supported domains:</Text>
                        <UnorderedList>
                            <ListItem>gnomebot.dev</ListItem>
                            <ListItem>pastebin.com</ListItem>
                            <ListItem>paste.ee</ListItem>
                            <ListItem>gist.githubusercontent.com</ListItem>
                            <ListItem>mclo.gs</ListItem>
                        </UnorderedList>
                    </ModalBody>

                    <ModalFooter>
                        <Input
                            ref={initialRef}
                            id="file-fetch-url"
                            type="url"
                            placeholder="https://gnomebot.dev/..."
                            onKeyDown={onKeyPress}
                        />
                        <Button
                            id="fetch-remote-file-button"
                            isLoading={isLoading}
                            colorScheme="green"
                            color="white"
                            onClick={fetchFileFromUrl}
                            ml={4}>
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}
