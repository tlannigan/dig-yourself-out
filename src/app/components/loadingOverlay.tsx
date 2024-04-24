import { Box, Flex, Text, Spinner } from '@chakra-ui/react'

export type LoadingOverlayProps = {
    isLoading: boolean
    isParsing: boolean
}

export default function LoadingOverlay({ isLoading, isParsing }: LoadingOverlayProps) {
    const getLabel = (): string => {
        if (isLoading) {
            return 'Fetching file'
        } else if (isParsing) {
            return 'Parsing file'
        }
        return 'This should not be displaying anymore. Uh-oh.'
    }

    return (
        <Box
            display={isLoading || isParsing ? 'block' : 'none'}
            style={{ zIndex: 15 }}
            pos="absolute"
            top={0}
            left={0}
            w="100dvw"
            h="100dvh"
            bg="rgba(32, 32, 32, 0.75)">
            <Flex justify="center" alignContent="middle" direction="row" minH="100dvh">
                <Flex justify="center" direction="column">
                    <Text mb={4}>{getLabel()}</Text>
                    <Spinner size="xl" thickness="4px" color="white" mx="auto" label="Parsing file..." />
                </Flex>
            </Flex>
        </Box>
    )
}
