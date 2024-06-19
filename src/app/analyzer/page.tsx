import { Flex } from '@chakra-ui/react'
import Header from '@/components/header'
import ParserContainer from '@/components/parserContainer'
import { fonts } from '../fonts'

export default function AnalyzerPage() {
    return (
        <Flex direction="column" maxH="100dvh" minH="100dvh" px={4} pt={4} className={fonts.firaMono.variable}>
            <Header />
            <ParserContainer />
        </Flex>
    )
}
