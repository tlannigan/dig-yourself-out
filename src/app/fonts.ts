import { Fira_Mono } from 'next/font/google'

const firaMono = Fira_Mono({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-fira',
})

export const fonts = {
    firaMono,
}
