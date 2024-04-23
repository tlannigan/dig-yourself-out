import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { fonts } from './fonts'

export const metadata: Metadata = {
    title: 'Dig Yourself Out',
    description: 'Diagnose modded Minecraft problems',
    keywords: ['Minecraft', 'modded'],
    creator: 'tirsty',
    openGraph: {
        title: 'Dig Yourself Out',
        description: 'Diagnose modded Minecraft problems',
        url: 'https://digyourselfout.app',
        siteName: 'Dig Yourself Out',
        type: 'website',
        locale: 'en_US'
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={fonts.firaMono.variable}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
