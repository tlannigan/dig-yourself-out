import { Box, Flex } from '@chakra-ui/react'
import HeaderTitle from './headerTitle'
import NavLinks from './navLinks'
import ExternalNavLinks from './externalNavLinks'

export default function Navbar() {

    return (
        <Box as="header" maxW="100dvw" bg="green.500" borderRadius="lg" px={4} py={2}>
            <Flex justify="space-between">
                <HeaderTitle />
                <NavLinks />
                <ExternalNavLinks />
            </Flex>
        </Box>
    )
}
