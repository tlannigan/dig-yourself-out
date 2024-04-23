import { Box } from '@chakra-ui/react'

export type LogProps = {
    file: any
}

export default function Log({ file }: LogProps) {
    const displayLines = file ? file.lines.map((line: string, i: number) => {
        return <span id={`${i + 1}`} key={i + 1} className={getLogLevel(line)} style={{ display: 'block', lineHeight: '20px' }}>{line}</span>
    }) : []

    return (
        <Box p={4} fontSize={12} className='log-container' whiteSpace='pre'>
            {displayLines}
        </Box>
    )
}

export function getLogLevel(line: string) {
    if (line.includes('/INFO]')) {
        return 'info'
    } else if (line.includes('/WARN]')) {
        return 'warning'
    } else if (line.includes('/ERROR]') || line.includes('/FATAL]')) {
        return 'error'
    } else if (line.trim().startsWith('Caused by: ')) {
        return 'error'
    } else if (line.startsWith('      Repeated')) {
        return 'repeat'
    } else {
        return 'unknown'
    }
}