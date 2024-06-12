import { Td, Tooltip, Tr } from '@chakra-ui/react'

export type TableRowProps = {
    rowName: string
    data: string
}

export default function TableRow({ rowName, data }: TableRowProps) {
    if (data) {
        const maxCharacterLength = 25
        const isDisabled = data.length <= maxCharacterLength

        return (
            <Tr>
                <Td>{rowName}:</Td>
                <Td>
                    <Tooltip isDisabled={isDisabled} label={data} fontSize="md" bg="green.500">
                        {truncateLine(data, maxCharacterLength)}
                    </Tooltip>
                </Td>
            </Tr>
        )
    }
    return ''
}

export function truncateLine(line: string, truncateLength: number) {
    if (line.length <= truncateLength) {
        return line
    } else {
        return line.substring(0, truncateLength - 3) + '...'
    }
}
