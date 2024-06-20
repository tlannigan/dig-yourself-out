import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import { fonts } from './fonts'

export const viewport: Viewport = {
    colorScheme: 'dark'
}

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
        locale: 'en_US',
        images: [
            {
                url: 'https://digyourselfout.app/opengraph-image.png',
                width: 1920,
                height: 1080
            }
        ]
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
