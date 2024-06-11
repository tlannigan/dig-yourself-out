'use client'

import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import DiscordIcon from './discordIcon'
import GithubIcon from './githubIcon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()
    const isActive = (path: string) => path === pathname

    return (
        <Box as="header" maxW="100dvw" bg="green.500" borderRadius="lg" px={4} py={2}>
            <Flex justify="space-between">
                <HStack fontSize={24} columnGap={4}>
                    <Link href="/">
                        <Text fontWeight={700} textDecoration={isActive("/") ? "underline" : ""} _hover={{ textDecoration: 'underline' }}>
                            Dig Yourself Out
                        </Text>
                    </Link>
                    <Text color="rgba(255, 255, 255, 0.75)">Alpha</Text>
                </HStack>
                <HStack spacing={'4rem'}>
                    <Link href="/">
                        <Text h={'100%'} textDecoration={isActive("/") ? "underline" : ""} _hover={{ textDecoration: 'underline' }} fontSize={20}>
                            Log Parser
                        </Text>
                    </Link>
                    <Link href="/diagnose">
                        <Text h={'100%'} textDecoration={isActive("/diagnose") ? "underline" : ""} _hover={{ textDecoration: 'underline' }} fontSize={20}>
                            How to Diagnose
                        </Text>
                    </Link>
                </HStack>
                <HStack>
                    <a
                        href="https://discord.gg/PFVJgTWAkX"
                        target="blank"
                        tabIndex={1}
                        aria-label="Join our Discord community">
                        <IconButton
                            tabIndex={-1}
                            variant="ghost"
                            size="sm"
                            aria-label="Join our Discord community"
                            icon={<DiscordIcon />}
                            fontSize={24}
                            _hover={{ bg: 'rgba(64, 64, 64, 0.25)' }}
                        />
                    </a>
                    <a
                        href="https://github.com/tlannigan/dig-yourself-out"
                        target="_blank"
                        tabIndex={2}
                        aria-label="Visit the GitHub repository">
                        <IconButton
                            tabIndex={-1}
                            variant="ghost"
                            size="sm"
                            aria-label="Visit the GitHub repository"
                            icon={<GithubIcon />}
                            fontSize={24}
                            _hover={{ bg: 'rgba(64, 64, 64, 0.25)' }}
                        />
                    </a>
                </HStack>
            </Flex>
        </Box>
    )
}
