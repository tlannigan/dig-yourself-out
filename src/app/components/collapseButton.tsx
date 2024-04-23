import { Button, Flex, IconButton } from '@chakra-ui/react'
import { DoubleArrow } from '@mui/icons-material'

export type CollapseButtonProps = {
    onToggle: () => void
    isOpen: boolean
}

export default function CollapseButton({ onToggle, isOpen }: CollapseButtonProps) {
    if (!isOpen) {
        return (
            <Flex justifyContent='end'>
                <Button
                    onClick={onToggle}
                    variant='ghost'
                    leftIcon={<DoubleArrow style={{ transform: 'rotate(180deg)' }} />}
                    size='md'
                    my={4}
                    textColor='green.500'
                    _hover={{ bg: '#333030' }}>

                    Collapse

                </Button>
            </Flex>
        )
    } else {
        return (
            <Flex>
                <IconButton aria-label='Open sidebar' onClick={onToggle} icon={<DoubleArrow />} size='lg' my={4} textColor='green.500' bg='#333030' _hover={{ bg: '#3E3C3C' }} />
            </Flex>
        )
    }
}