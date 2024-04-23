import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import DiscordIcon from './discordIcon';
import GithubIcon from './githubIcon';

export default function Navbar() {
    return (
        <Box maxW='100dvw' bg='green.500' borderRadius='lg' px={4} py={2}>
            <Flex justify='space-between'>
                <Text fontSize={24} fontWeight={700}>Dig Yourself Out</Text>
                <HStack>
                    <a href='https://discord.gg/PFVJgTWAkX' target='blank'>
                        <IconButton variant='ghost' size='sm' aria-label='Join our Discord community' icon={<DiscordIcon />} fontSize={24} _hover={{ bg: 'rgba(64, 64, 64, 0.25)' }} />
                    </a>
                    <a href='https://github.com/tlannigan/dig-yourself-out' target='_blank'>
                        <IconButton variant='ghost' size='sm' aria-label='Visit the GitHub repository' icon={<GithubIcon />} fontSize={24} _hover={{ bg: 'rgba(64, 64, 64, 0.25)' }} />
                    </a>
                </HStack>
            </Flex>
        </Box>
    )
}