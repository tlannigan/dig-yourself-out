import { VStack, Heading, Text, UnorderedList, ListItem, Button } from '@chakra-ui/react'
import StyledLink from './styledLink'
import Link from 'next/link'

export default function LearnInfo() {
    return (
        <VStack
            align="start"
            justify="space-between"
            flexBasis={{ base: '100%', md: '40%' }}
            border="2px"
            borderColor="green.500"
            borderRadius={16}
            p={{ base: 4, sm: 8 }}>
            
            <div>
                <Heading fontSize={{ base: 24, lg: 32 }} mb={4}>Learn</Heading>

                <Text mb={4}>Advice and tutorials on all things Minecraft:</Text>

                <UnorderedList mb={8} spacing={2}>
                    <ListItem><StyledLink href="/" text="Diagnose your own crashes" /></ListItem>
                    <ListItem><StyledLink href="/" text="Setting up a Minecraft server" /></ListItem>
                    <ListItem><StyledLink href="/" text="Finding sources of lag" /></ListItem>
                    <ListItem>And many more!</ListItem>
                </UnorderedList>
            </div>
            
            <Link href="/learn">
                <Button
                    tabIndex={-1}
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
