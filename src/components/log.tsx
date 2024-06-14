import { Box } from '@chakra-ui/react'
import LogLine from './logLine'

export default function Log({ file }: { file: any }) {
    return (
        <Box py={4} pr={4} fontSize={12} whiteSpace="pre">
            {file.lines.map((line: string, index: number) => (
                <LogLine key={index} line={line} lineNumber={index} />
            ))}
        </Box>
    )
}
