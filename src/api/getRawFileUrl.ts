export function getRawFileUrl(fileUrl: string): string {
    const url = fileUrl.trim()
    const fileId = getUrlPathId(url)
    if (url.startsWith('https://gnomebot.dev/paste/') && !url.endsWith('/raw')) {
        // Gnomebot pastebin
        return `${url}/raw`
    } else if (url.startsWith('https://pastebin.com/')) {
        // Pastebin pastebin
        if (url.startsWith('https://pastebin.com/raw/')) {
            return url
        } else {
            return `https://pastebin.com/raw/${fileId}`
        }
    } else if (url.startsWith('https://mclo.gs/')) {
        // MC Logs pastebin
        return `https://api.mclo.gs/1/raw/${fileId}`
    } else if (url.startsWith('https://paste.gg/p/') && url.endsWith('/raw')) {
        return url
    } else if (url.startsWith('https://paste.ee/p/')) {
        // Pastee pastebin
        return `https://paste.ee/r/${fileId}`
    } else if (isUrlSupportedDomain(url)) {
        return url
    }
    throw new Error(`${url} is not a supported domain.`)
}

// Example: `https://pastebin.com/n3hPafCi` returns `n3hPafCi`
export function getUrlPathId(url: string): string {
    const splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 1]
}

// Checks if URL is supported raw file domain
export function isUrlSupportedDomain(url: string): boolean {
    return (
        url.startsWith('https://gnomebot.dev/paste/') ||
        url.startsWith('https://pastebin.com/') ||
        url.startsWith('https://api.mclo.gs/1/raw/') ||
        url.startsWith('https://paste.ee/r/') ||
        url.startsWith('https://gist.githubusercontent.com/')
    )
}
