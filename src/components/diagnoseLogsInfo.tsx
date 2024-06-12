import { VStack, Heading, Text, UnorderedList, ListItem, Button } from '@chakra-ui/react'
import StyledLink from './styledLink'
import Link from 'next/link'

export default function LearnInfo() {
    return (
        <VStack
            align="start"
            flexBasis={'50%'}
            flexGrow={1}
            flexShrink={0}
            h="100%"
            border="2px"
            borderColor="green.500"
            borderRadius={16}
            p={8}>

            <Heading fontSize={{ base: 24, md: 32 }} mb={4}>Learn</Heading>

            <Text mb={4}>Advice and tutorials on all things Minecraft:</Text>

            <UnorderedList mb={8}>
                <ListItem><StyledLink href="/" text="Diagnose your own crashes" /></ListItem>
                <ListItem><StyledLink href="/" text="Setting up a Minecraft server" /></ListItem>
                <ListItem><StyledLink href="/" text="Finding sources of lag" /></ListItem>
            </UnorderedList>
            
            <Link href="/learn">
                <Button
                    aria-label="Visit documentation page"
                    variant="outline"
                    textColor="white"
                    _hover={{ bg: 'green.500', borderColor: 'transparent' }}>
                    Learn more
                </Button>
            </Link>
        </VStack>
    )
}
