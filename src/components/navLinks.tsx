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
        <HStack spacing={'3rem'} fontSize={20}>
            <Link href="/analyzer">
                <Text
                    h={'100%'}
                    sx={isActive('/analyzer') ? underlineStyles : ''}
                    _hover={underlineStyles}>
                    Log Analyzer
                </Text>
            </Link>
            <Link href="/learn">
                <Text
                    h={'100%'}
                    sx={isActive('/learn') ? underlineStyles : ''}
                    _hover={underlineStyles}>
                    Learn
                </Text>
            </Link>
        </HStack>
    )
}