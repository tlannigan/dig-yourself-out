import { HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function HeaderTitle() {
    return (
        <HStack fontSize={[16, 24, 24]} lineHeight={1.15} columnGap={4}>
            <Link href="/">
                <Text
                    fontWeight={700}
                    _hover={{
                        textDecoration: 'underline 3px',
                        textUnderlineOffset: '4px',
                    }}>
                    Dig Yourself Out
                </Text>
            </Link>
        </HStack>
    )
}
