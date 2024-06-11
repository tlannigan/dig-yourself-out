import { HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function HeaderTitle() {
    return (
        <HStack fontSize={24} columnGap={4}>
            <Link href="/">
                <Text fontWeight={700} _hover={{ textDecoration: 'underline' }}>
                    Dig Yourself Out
                </Text>
            </Link>
            <Text color="rgba(255, 255, 255, 0.75)">Alpha</Text>
        </HStack>
    )
}