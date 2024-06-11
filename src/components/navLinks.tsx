'use client'

import { HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname()
    const isActive = (path: string) => path === pathname

    return (
        <HStack spacing={'4rem'} fontSize={20}>
            <Link href="/parser">
                <Text
                    h={'100%'}
                    textDecoration={isActive('/parser') ? 'underline' : ''}
                    _hover={{ textDecoration: 'underline' }}>
                    Log Analyzer
                </Text>
            </Link>
            <Link href="/docs">
                <Text
                    h={'100%'}
                    textDecoration={isActive('/docs') ? 'underline' : ''}
                    _hover={{ textDecoration: 'underline' }}>
                    Documentation
                </Text>
            </Link>
        </HStack>
    )
}