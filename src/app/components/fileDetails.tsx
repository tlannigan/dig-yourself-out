import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Table, TableContainer, Tbody, Td, Tooltip, Tr } from '@chakra-ui/react'

export type FileDetailsProps = {
    file: any
}

export default function FileDetails({ file }: FileDetailsProps) {
    if (file) {
        const getTableRow = (rowName: string, data: string) => {
            if (data) {
                const maxCharacterLength = 26
                const isDisabled = data.length <= maxCharacterLength

                return (
                    <Tr>
                        <Td>{rowName}:</Td>
                        <Td>
                            <Tooltip
                                isDisabled={isDisabled}
                                label={data}
                                fontSize='lg'
                                bg='green.500'>
                                
                                {truncateLine(data, maxCharacterLength)}

                            </Tooltip>
                        </Td>
                    </Tr>
                )
            }
        }

        return (
            <AccordionItem borderColor='transparent'>
                <h2>
                    <AccordionButton
                        fontSize={16}
                        color='green.500'
                        p={4}
                        _hover={{ bg: '#333030' }}
                        borderRadius='lg'>
                            
                        <Box as='span' flex={1} textAlign='left'>
                            Details
                        </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel
                    borderRadius='lg'
                    borderWidth={2}
                    borderColor='green.500'
                    fontSize={14}
                    textColor='white'
                    px={0}
                    py={2}>

                    <TableContainer>
                        <Table variant='unstyled' size='sm'>
                            <Tbody>
                                {getTableRow('Filename', file.name)}
                                {getTableRow('Modified', file.modified)}
                                {getTableRow('Minecraft', file.mcVersion)}
                                {getTableRow('Java', file.java)}
                                {getTableRow('Forge', file.forgeVersion)}
                                {getTableRow('Fabric', file.fabricVersion)}
                                {getTableRow('NeoForge', file.neoForgeVersion)}
                                {getTableRow('Launcher', file.launcher)}
                                {getTableRow('Memory', file.memoryFlags)}
                                {getTableRow('OS', file.os)}
                                {getTableRow('Lines', file.lineCount)}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </AccordionPanel>
            </AccordionItem>
        )
    }
    return <></>
}

export function truncateLine(line: string, truncateLength: number) {
    if (line.length <= truncateLength) {
        return line
    } else {
        return line.substring(0, truncateLength - 3) + '...'
    }
}