import { Container, Text, textDecoration } from '@chakra-ui/react';
import Link from 'next/link';

export default function StyledLink({ href, text, openInNewTab = false }: { href: string, text: string, openInNewTab?: boolean }) {
    return (
        <Link
            href={href}
            target={openInNewTab ? "_blank" : ""}>
            <Text as="span" display="inline" color="blue.400" _hover={{ textDecoration: "underline" }}>{text}</Text>
        </Link>
    )
}