import { Flex } from '@chakra-ui/react';
import LogAnalyzerInfo from './logAnalyzerInfo';
import LearnInfo from './diagnoseLogsInfo';

export default function PageOptionsContainer() {
    return (
        <Flex
            justifyContent={{ base: 'start', md: 'center' }}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            columnGap={8}
            rowGap={4}
            borderRadius={4}
            fontSize={{ base: 16, lg: 20 }}
            color="white">

            <LogAnalyzerInfo />
            <LearnInfo />
        </Flex>
    )
}