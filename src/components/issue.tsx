import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

export type IssueProps = {
    rule: any,
    lineNumber: number
}

export default function Issue({ rule, lineNumber }: IssueProps) {
    // Use JS to scroll instead of anchor scrolling
    // Otherwise horizontal scrolling happens, too
    const scrollVertically = (event: any) => {
        event.preventDefault()
        const href = event.target.parentElement.getAttribute("href").slice(1)
        window.location.hash = href
        const target = document.querySelector(`[id='${href}']`) as HTMLElement
        if (target) scroll(0, target.offsetTop)
    }

    const lineNumberText = lineNumber >= 0
        ? <span> on <Link href={'#' + lineNumber} onClick={scrollVertically}><span style={{ textDecoration: 'underline' }}>line {lineNumber}</span></Link></span>
        : ''

    return (
        <Alert status={rule.level} variant='solid' borderRadius='lg'>
            <AlertIcon />
            <Box>
                <AlertTitle>{rule.title}{lineNumberText}</AlertTitle>
                <AlertDescription>{rule.description}</AlertDescription>
            </Box>
        </Alert>
    )
}