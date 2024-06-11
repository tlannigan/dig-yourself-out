import { HStack, Text } from '@chakra-ui/react';
import StyledLink from './styledLink';

export default function Footer() {
    return (
        <HStack justify="center" mt={4}>
            <Text>© 2024 Dig Yourself Out. All rights reserved. Made by <StyledLink href="https://tlannigan.com" text="tlannigan" openInNewTab />.</Text>
        </HStack>
    )
}