import { Box, Flex, Show } from '@chakra-ui/react'
import HeaderTitle from './headerTitle'
import NavLinks from './navLinks'
import ExternalNavLinks from './externalNavLinks'
import HamburgerMenu from './hamburgerMenu'

export default function Header() {
    return (
        <Box as="header" maxW="100dvw" bg="green.500" borderRadius="lg" px={4} py={2}>
            <Flex justify="space-between">
                <HeaderTitle />
                <Show above="lg">
                    <NavLinks />
                    <ExternalNavLinks />
                </Show>
                <Show below="lg">
                    <HamburgerMenu />
                </Show>
            </Flex>
        </Box>
    )
}
