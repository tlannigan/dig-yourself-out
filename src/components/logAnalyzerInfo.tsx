import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function LogAnalyzerInfo() {
    return (
        <VStack
            align="start"
            justify="space-between"
            flexBasis={{ base: '100%', md: '40%' }}
            border="2px"
            borderColor="green.500"
            borderRadius={16}
            p={{ base: 4, sm: 8 }}>

            <div>
                <Heading fontSize={{ base: 24, lg: 32 }} mb={4}>Log Analyzer</Heading>

                <Text mb={4}>
                    A tool that accepts common types of (modded) Minecraft logs and automatically tell you what&apos;s
                    wrong.
                </Text>

                <Text mb={4}>
                    The log analyzer is still in an alpha state. It will catch many common issues in logs, but not everything.
                </Text>
            </div>
            
            <Link href="/analyzer">
                <Button
                    tabIndex={-1}
                    alignSelf="start"
                    aria-label="Visit log analyzer page"
                    variant="outline"
                    textColor="white"
                    _hover={{ bg: 'green.500', borderColor: 'transparent' }}>
                    Analyze your logs
                </Button>
            </Link>

        </VStack>
    )
}
