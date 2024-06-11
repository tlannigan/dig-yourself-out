'use server'

import { getRawFileUrl } from './getRawFileUrl'

export default async function fetchRemoteFile(url: string) {
    try {
        const rawFileUrl = getRawFileUrl(url)
        const response = await fetch(rawFileUrl)
        return await response.text()
    } catch (err) {
        console.error(err)
        if (err instanceof Error) {
            throw new Error(err.message)
        }
    }
}
