import { Flex } from '@chakra-ui/react';
import Header from '@/components/header';
import { fonts } from '../fonts';

export default function LearnPage() {
    return (
        <Flex direction="column" minH="100dvh" p={4} className={fonts.firaMono.variable}>
            <Header />
        </Flex>
    )
}