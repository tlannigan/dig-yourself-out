import { Box } from '@chakra-ui/react'
import LogLine from './logLine'

export default function Log({ file }: { file: any }) {
    // const displayLines = file ? file.lines.map((line: string, i: number) => {
    //     return <span id={`${i + 1}`} key={i + 1} className={getLogLevel(line)} style={{ display: 'block', lineHeight: '20px' }}>{line}</span>
    // }) : []

    return (
        <Box py={4} pr={4} fontSize={12} whiteSpace="pre">
            {file.lines.map((line: string, index: number) => (
                <LogLine key={index} line={line} lineNumber={index} />
            ))}
        </Box>
    )
}
