'use client'

import { Flex } from '@chakra-ui/react'
import Navbar from './components/navbar'
import InspectorContainer from './components/inspectorContainer'
import { fonts } from './fonts'

export default function InspectorPage() {
    return (
        <Flex direction="column" minH="100dvh" p={4} className={fonts.firaMono.variable}>
            <Navbar />
            <InspectorContainer />
        </Flex>
    )
}
