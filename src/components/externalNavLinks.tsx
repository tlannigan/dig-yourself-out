import { HStack, IconButton } from '@chakra-ui/react';
import DiscordIcon from './discordIcon';
import GithubIcon from './githubIcon';

export default function ExternalNavLinks() {
    return (
        <HStack>
            <a
                href="https://discord.gg/PFVJgTWAkX"
                target="_blank"
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
    )
}