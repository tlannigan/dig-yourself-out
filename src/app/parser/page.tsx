import { Flex } from '@chakra-ui/react'
import Header from '@/components/header'
import ParserContainer from '@/components/parserContainer'
import { fonts } from '../fonts'

export default function ParserPage() {
    return (
        <Flex direction="column" minH="100dvh" p={4} className={fonts.firaMono.variable}>
            <Header />
            <ParserContainer />
        </Flex>
    )
}
