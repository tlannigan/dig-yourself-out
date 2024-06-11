import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function LogParserInfo() {
    return (
        <VStack
            align="start"
            flexBasis={'30%'}
            h="100%"
            border="2px"
            borderColor="green.500"
            borderRadius={16}
            p={8}>
            <Heading alignSelf="center" mb={4}>Log Analyzer</Heading>
            <Text mb={8}>
                A tool that accepts common types of (modded) Minecraft logs and automatically tell you what&apos;s
                wrong.
            </Text>
            
            <Link href="/parser">
                <Button
                    alignSelf="start"
                    aria-label="Visit log analyzer page"
                    variant="outline"
                    textColor="white"
                    _hover={{ bg: 'green.500', borderColor: 'transparent' }}>
                    Try it out
                </Button>
            </Link>
        </VStack>
    )
}
