import { Flex } from '@chakra-ui/react';
import LogAnalyzerInfo from './logAnalyzerInfo';
import DiagnoseLogsInfo from './diagnoseLogsInfo';

export default function PageOptionsContainer() {
    return (
        <Flex
            justifyContent="center"
            columnGap={8}
            borderRadius={4}
            fontSize={24}
            color="white"
            pt={8}>

            <LogAnalyzerInfo />
            <DiagnoseLogsInfo />
        </Flex>
    )
}