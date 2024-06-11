'use client'

import { Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Show } from '@chakra-ui/react'
import HeaderTitle from './headerTitle'
import NavLinks from './navLinks'
import ExternalNavLinks from './externalNavLinks'
import { Article, Chat, FindInPage, GitHub, Menu as MuiMenu } from '@mui/icons-material'

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
                    <Menu colorScheme='black'>
                        <MenuButton
                            as={IconButton}
                            aria-label="Navigation"
                            alignSelf="center"
                            textColor="white"
                            bg="transparent"
                            size="sm"
                            _hover={{ bg: 'rgba(64, 64, 64, 0.25)' }}
                            icon={<MuiMenu />}
                            variant="ghost"
                        />
                        <MenuList bg="#1A1A1A" borderColor="black">
                            <MenuItem bg="#1A1A1A" _hover={{ bg: "#242424" }} icon={<FindInPage />}>Log Analyzer</MenuItem>
                            <MenuItem bg="#1A1A1A" _hover={{ bg: "#242424" }} icon={<Article />}>Documentation</MenuItem>
                            <MenuItem bg="#1A1A1A" _hover={{ bg: "#242424" }} icon={<Chat />}>Discord</MenuItem>
                            <MenuItem bg="#1A1A1A" _hover={{ bg: "#242424" }} icon={<GitHub />}>GitHub</MenuItem>
                        </MenuList>
                    </Menu>
                </Show>
            </Flex>
        </Box>
    )
}
