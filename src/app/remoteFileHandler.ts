'use server'

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
        return ''
    }
}

function getRawFileUrl(fileUrl: string): string {
    const url = fileUrl.trim()
    const fileQueryId = getFileQueryId(url)
    if (url.startsWith('https://gnomebot.dev/paste/') && !url.endsWith('/raw')) {
        // Gnomebot pastebin
        return `${url}/raw`
    } else if (url.startsWith('https://pastebin.com/')) {
        // Pastebin pastebin
        if (url.startsWith('https://pastebin.com/raw/')) {
            return url
        } else {
            return `https://pastebin.com/raw/${fileQueryId}`
        }
    } else if (url.startsWith('https://mclo.gs/')) {
        // MC Logs pastebin
        return `https://api.mclo.gs/1/raw/${fileQueryId}`
    } else if (url.startsWith('https://paste.ee/p/')) {
        // Pastee pastebin
        return `https://paste.ee/r/${fileQueryId}`
    } else if (isUrlSupportedDomain(url)) {
        return url
    }
    throw new Error(`${url} is not a supported domain.`)
}

// Example: `https://pastebin.com/n3hPafCi` returns `n3hPafCi`
function getFileQueryId(url: string): string {
    const splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 1]
}

function isUrlSupportedDomain(url: string): boolean {
    return (
        url.startsWith('https://gnomebot.dev/paste/') ||
        url.startsWith('https://pastebin.com/') ||
        url.startsWith('https://mclo.gs/') ||
        url.startsWith('https://paste.ee/r/') ||
        url.startsWith('https://gist.githubusercontent.com/')
    )
}
