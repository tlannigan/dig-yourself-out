import { ChangeEventHandler, DragEventHandler, useCallback, useEffect, useState } from 'react'
import { getFileInfo } from '../parsers/parser'
import { useToast, useDisclosure } from '@chakra-ui/react'
import fetchRemoteFile from '../remoteFileHandler'
import UploadCallToAction from './uploadCallToAction'
import Inspector from './inspector'
import { useRouter } from 'next/navigation'

export default function InspectorContainer() {
    const router = useRouter()

    const [uploadedFile, setUploadedFile] = useState<File>()
    const [remoteFileUrl, setRemoteFileUrl] = useState<string>('')
    const [file, setFile] = useState() // Parsed file info

    // Handles showing loading overlay while asynchronous code executes
    const [isLoading, setIsLoading] = useState(false)
    const [isParsing, setIsParsing] = useState(false)

    // UploadRemoteFileModal controls
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()
    const showToast = useCallback(
        (errorMessage: string) => {
            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        },
        [toast],
    )

    // Parses file information
    useEffect(() => {
        // Fully removes # from window location
        const removeHash = () => {
            window.location.hash = ''
            router.replace('/')
        }

        async function getParsedFile() {
            try {
                setIsParsing(true)
                setFile(undefined)
                const fileInfo = await getFileInfo(uploadedFile)
                setFile(fileInfo)
            } catch (err) {
                if (err instanceof Error) {
                    showToast(err.message)
                }
            } finally {
                setIsParsing(false)
                removeHash()
            }
        }
        if (uploadedFile) {
            getParsedFile()
        }
    }, [uploadedFile, showToast, router])

    // Fetches remote files
    useEffect(() => {
        async function getRemoteFile() {
            try {
                setIsLoading(true)
                setFile(undefined)
                const response = await fetchRemoteFile(remoteFileUrl)
                const file = createFileFromText(response)
                setUploadedFile(file)
            } catch (err) {
                if (err instanceof Error) {
                    showToast(err.message)
                }
            } finally {
                setIsLoading(false)
                setRemoteFileUrl('')
                onClose() // Close modal
            }
        }
        if (remoteFileUrl !== '') {
            getRemoteFile()
        }
    }, [remoteFileUrl, showToast, onClose])

    const dropHandler: DragEventHandler = (event: any) => {
        event.preventDefault()

        if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length === 1) {
            [...event.dataTransfer.items].forEach((item) => {
                if (item.kind === 'file') {
                    setUploadedFile(item.getAsFile())
                }
            })
        } else if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items.length > 1) {
            alert('Please only upload one file at a time.')
        }

        const dropZone = document.getElementById('dropzone')
        if (dropZone) dropZone.classList.remove('dropzone-highlight')
    }

    const dragOverHandler: DragEventHandler = (event: any) => {
        event.preventDefault()
        const dropZone = document.getElementById('dropzone')
        if (dropZone) dropZone.classList.add('dropzone-highlight')
    }

    const dragLeaveHandler: DragEventHandler = (event: any) => {
        event.preventDefault()
        const dropZone = document.getElementById('dropzone')
        if (dropZone) dropZone.classList.remove('dropzone-highlight')
    }

    // Handle selecting files from device file browser
    const fileBrowserHandler: ChangeEventHandler = (event: any) => {
        event.preventDefault()
        const fileInput: any = document.getElementById('file-input')
        const files = fileInput ? fileInput.files : []
        if (files && files.length === 1) {
            setUploadedFile(files[0])
        }
    }
    if (file && uploadedFile) {
        return (
            <Inspector
                handlers={{ dropHandler, dragOverHandler, dragLeaveHandler, fileBrowserHandler }}
                disclosure={{ isOpen, onOpen, onClose }}
                setRemoteFileUrl={setRemoteFileUrl}
                isLoading={isLoading}
                isParsing={isParsing}
                file={file}
            />
        )
    } else {
        return (
            <UploadCallToAction
                handlers={{ dropHandler, dragOverHandler, dragLeaveHandler, fileBrowserHandler }}
                disclosure={{ isOpen, onOpen, onClose }}
                setRemoteFileUrl={setRemoteFileUrl}
                isLoading={isLoading}
                isParsing={isParsing}
            />
        )
    }
}

export function createFileFromText(text: string) {
    return new File([new Blob([text])], 'Remote file', { type: 'text/plain', lastModified: 0 })
}