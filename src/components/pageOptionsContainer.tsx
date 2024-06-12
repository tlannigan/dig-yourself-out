import { Flex } from '@chakra-ui/react';
import LogAnalyzerInfo from './logAnalyzerInfo';
import LearnInfo from './diagnoseLogsInfo';

export default function PageOptionsContainer() {
    return (
        <Flex
            justifyContent="center"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            columnGap={8}
            rowGap={8}
            borderRadius={4}
            fontSize={[16, 16, 16, 16, 24]}
            color="white"
            pt={8}>

            <LogAnalyzerInfo />
            <LearnInfo />
        </Flex>
    )
}