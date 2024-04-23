import { Box, Flex, Text, Spinner } from '@chakra-ui/react'

export type LoadingOverlayProps = {
    isLoading: boolean
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
    return (
        <Box pos='absolute' top={0} left={0} w="100dvw" h='100dvh' bg='rgba(32, 32, 32, 0.75)' display={isLoading ? 'block' : 'none'}>
            <Flex justify='center' alignContent='middle' direction='row' minH='100dvh'>
                <Flex justify='center' direction='column'>
                    <Text mb={4}>Parsing file</Text>
                    <Spinner size='xl' thickness='4px' color='white' mx='auto' label='Parsing file...' />
                </Flex>
            </Flex>
        </Box>
    )
}