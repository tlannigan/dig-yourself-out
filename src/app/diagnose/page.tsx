import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import { fonts } from '../fonts';

export default function DiagnosePage() {
    return (
        <Flex direction="column" minH="100dvh" p={4} className={fonts.firaMono.variable}>
            <Navbar />
        </Flex>
    )
}