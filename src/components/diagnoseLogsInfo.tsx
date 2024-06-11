import { VStack, Heading, Text, UnorderedList, ListItem, Button } from '@chakra-ui/react'
import StyledLink from './styledLink'
import Link from 'next/link'

export default function DiagnoseLogsInfo() {
    return (
        <VStack
            align="start"
            flexBasis={'30%'}
            h="100%"
            border="2px"
            borderColor="green.500"
            borderRadius={16}
            p={8}>

            <Heading alignSelf="center" mb={4}>Documentation</Heading>

            <Text mb={4}>Learn and read through tutorials on all things Minecraft:</Text>

            <UnorderedList mb={8}>
                <ListItem><StyledLink href="/" text="Diagnose your own crashes" /></ListItem>
                <ListItem><StyledLink href="/" text="Setting up a Minecraft server" /></ListItem>
                <ListItem><StyledLink href="/" text="Finding sources of lag" /></ListItem>
            </UnorderedList>
            
            <Link href="/docs">
                <Button
                    aria-label="Visit documentation page"
                    variant="outline"
                    textColor="white"
                    _hover={{ bg: 'green.500', borderColor: 'transparent' }}>
                    See all documentation
                </Button>
            </Link>
        </VStack>
    )
}
