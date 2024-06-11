'use client'

import { HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname()
    const isActive = (path: string) => path === pathname
    const underlineStyles = {
        textDecoration: 'underline 3px',
        textUnderlineOffset: '4px'
    }

    return (
        <HStack spacing={'4rem'} fontSize={20}>
            <Link href="/parser">
                <Text
                    h={'100%'}
                    sx={isActive('/parser') ? underlineStyles : ''}
                    _hover={underlineStyles}>
                    Log Analyzer
                </Text>
            </Link>
            <Link href="/docs">
                <Text
                    h={'100%'}
                    sx={isActive('/docs') ? underlineStyles : ''}
                    _hover={underlineStyles}>
                    Documentation
                </Text>
            </Link>
        </HStack>
    )
}