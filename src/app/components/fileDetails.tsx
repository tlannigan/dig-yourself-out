import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Table,
    TableContainer,
    Tbody
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import fetchMinecraftProfile from '../fetchMinecraftProfile'
import TableRow from './fileDetailsRow'

export type FileDetailsProps = {
    file: any
}

export default function FileDetails({ file }: FileDetailsProps) {
    const [usernameExists, setUsernameExists] = useState<boolean>(true)

    // Check if player owns Minecraft
    useEffect(() => {
        async function getMinecraftProfile() {
            const minecraftProfile = await fetchMinecraftProfile(file.username)
            setUsernameExists(minecraftProfile !== undefined)
        }
        if (file.username && !file.username.includes('<')) {
            getMinecraftProfile()
        }
    }, [file.username])

    if (file) {
        const getUsername = () => {
            if (file.username) {
                if (usernameExists) {
                    return file.username
                } else {
                    return file.username + '*'
                }
            }
            return ''
        }

        return (
            <AccordionItem borderColor="transparent">
                <h2>
                    <AccordionButton fontSize={16} color="green.500" p={4} _hover={{ bg: '#333030' }} borderRadius="lg">
                        <Box as="span" flex={1} textAlign="left">
                            Details
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel
                    borderRadius="lg"
                    borderWidth={2}
                    borderColor="green.500"
                    fontSize={14}
                    textColor="white"
                    px={0}
                    py={2}>
                    <TableContainer>
                        <Table variant="unstyled" size="sm">
                            <Tbody>
                                <TableRow rowName='Filename' data={file.name} />
                                <TableRow rowName='Modified' data={file.modified} />
                                <TableRow rowName='Username' data={getUsername()} />
                                <TableRow rowName='Minecraft' data={file.mcVersion} />
                                <TableRow rowName='Java' data={file.java} />
                                <TableRow rowName='Forge' data={file.forgeVersion} />
                                <TableRow rowName='Fabric' data={file.fabricVersion} />
                                <TableRow rowName='NeoForge' data={file.neoForgeVersion} />
                                <TableRow rowName='Launcher' data={file.launcher} />
                                <TableRow rowName='Memory' data={file.memoryFlags} />
                                <TableRow rowName='OS' data={file.os} />
                                <TableRow rowName='Lines' data={file.lineCount} />
                            </Tbody>
                        </Table>
                    </TableContainer>
                </AccordionPanel>
            </AccordionItem>
        )
    }
    return <></>
}
