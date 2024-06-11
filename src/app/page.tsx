import { Flex } from '@chakra-ui/react'
import Header from '@/components/header'
import { fonts } from './fonts'
import PageOptionsContainer from '@/components/pageOptionsContainer'
import Footer from '@/components/footer'

export default function Page() {
    return (
        <Flex direction="column" justify="space-between" minH="100dvh" p={4} className={fonts.firaMono.variable}>
            <Header />
            <PageOptionsContainer />
            <Footer />
        </Flex>
    )
}
