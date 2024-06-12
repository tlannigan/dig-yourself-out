import { extendTheme } from '@chakra-ui/react'
import { fonts } from './fonts'

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: '#222020',
                color: 'white',
            },
            '&:focus-visible': {
                outline: '4px solid magenta !important',
                borderRadius: '4px'
            }
        }),
    },
    fonts: {
        body: 'var(--font-fira)',
    },
})
