import { extendTheme } from '@chakra-ui/react'
import { fonts } from './fonts'

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: '#222020',
                color: 'white',
            },
        }),
    },
    fonts: {
        body: 'var(--font-fira)',
    },
})
