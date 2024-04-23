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
    // Gnomebot pastebin
    if (url.startsWith('https://gnomebot.dev/paste/') && !url.endsWith('/raw')) {
        return `${url}/raw`
    // Pastebin pastebin
    } else if (url.startsWith('https://pastebin.com/')) {
        if (url.startsWith('https://pastebin.com/raw/')) {
            return url
        } else {
            return `https://pastebin.com/raw/${fileQueryId}`
        }
    // MC Logs pastebin
    } else if (url.startsWith('https://mclo.gs/')) {
        return `https://api.mclo.gs/1/raw/${fileQueryId}`
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
    return url.startsWith('https://gnomebot.dev/paste/') ||
        url.startsWith('https://pastebin.com/') ||
        url.startsWith('https://mclo.gs/') ||
        url.startsWith('https://gist.githubusercontent.com/')
}