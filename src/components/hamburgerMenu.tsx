import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Article, Chat, FindInPage, GitHub, Menu as MuiMenu } from '@mui/icons-material'
import Link from 'next/link'
import DiscordIcon from './discordIcon'

export default function HamburgerMenu() {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Navigation"
                alignSelf="center"
                textColor="white"
                colorScheme="blackAlpha"
                size="sm"
                _hover={{ bg: 'rgba(64, 64, 64, 0.25)' }}
                _focus={{ bg: 'rgba(64, 64, 64, 0.25)' }}
                icon={<MuiMenu />}
                variant="ghost"
            />
            <MenuList bg="#1A1A1A" borderColor="black" fontSize={24}>

                <MenuItem as={Link} href="/analyzer" bg="#1A1A1A" _hover={{ bg: '#242424' }} _focus={{ bg: '#242424' }} icon={<FindInPage />}>
                    Log Analyzer
                </MenuItem>

                <MenuItem as={Link} href="/learn" bg="#1A1A1A" _hover={{ bg: '#242424' }} _focus={{ bg: '#242424' }} icon={<Article />}>
                    Learn
                </MenuItem>

                <MenuItem
                    as={Link}
                    href="https://discord.gg/PFVJgTWAkX"
                    bg="#1A1A1A"
                    _hover={{ bg: '#242424' }}
                    _focus={{ bg: '#242424' }}
                    icon={<DiscordIcon marginLeft={0.15} marginRight={0.2} />}>
                    Discord
                </MenuItem>

                <MenuItem
                    as={Link}
                    href="https://github.com/tlannigan/dig-yourself-out"
                    bg="#1A1A1A"
                    _hover={{ bg: '#242424' }}
                    _focus={{ bg: '#242424' }}
                    icon={<GitHub />}>
                    GitHub
                </MenuItem>

            </MenuList>
        </Menu>
    )
}
