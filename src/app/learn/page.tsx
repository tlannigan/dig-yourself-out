import { Flex, Heading } from '@chakra-ui/react';
import Header from '@/components/header';
import { fonts } from '../fonts';

export default function LearnPage() {
    return (
        <Flex direction="column" minH="100dvh" p={4} className={fonts.firaMono.variable}>
            <Header />
            
            <Flex
                direction="column"
                justifyContent="center"
                borderRadius={4}
                fontSize={24}
                color="white"
                flexGrow={1}>

                <Heading textAlign='center'>This page is currently under construction.</Heading>

            </Flex>
        </Flex>
    )
}