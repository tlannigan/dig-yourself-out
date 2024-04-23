import { ChangeEventHandler, DragEventHandler, useEffect, useState } from 'react';
import UploadCallToAction from './uploadCallToAction';
import Inspector from './inspector';
import { getFileInfo } from '../parsers/parser';
import fetchRemoteFile from '../remoteFileHandler';
import { useDisclosure } from '@chakra-ui/react';

export default function InspectorContainer() {
    const [uploadedFile, setUploadedFile] = useState<File>()
    const [remoteFileUrl, setRemoteFileUrl] = useState<string>('')
    const [file, setFile] = useState()
    const [isLoading, setIsLoading] = useState(false)

    // UploadRemoteFileModal controls
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Parses file information
    useEffect(() => {
        async function getParsedFile() {
            setIsLoading(true)
            const fileInfo = await getFileInfo(uploadedFile)
            setIsLoading(false)
            setFile(fileInfo)
        }
        if (uploadedFile) {
            getParsedFile()
        }
    }, [uploadedFile])

    // Fetches remote files
    useEffect(() => {
        async function getRemoteFile() {
            setIsLoading(true)
            const response = await fetchRemoteFile(remoteFileUrl)
            setIsLoading(false)
            onClose()
            const file = new File([new Blob([response])], 'Remote file', { type: 'text/plain', lastModified: 0 })
            setUploadedFile(file)
            setRemoteFileUrl('')
        }
        if (remoteFileUrl !== '') {
            getRemoteFile()
        }
    }, [remoteFileUrl, onClose])

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
                setUploadedFile={setUploadedFile}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                file={file} />
        )
    } else {
        return (
            <UploadCallToAction
                handlers={{ dropHandler, dragOverHandler, dragLeaveHandler, fileBrowserHandler }}
                disclosure={{ isOpen, onOpen, onClose }}
                setRemoteFileUrl={setRemoteFileUrl}
                setUploadedFile={setUploadedFile}
                setIsLoading={setIsLoading}
                isLoading={isLoading} />
        )
    }
}