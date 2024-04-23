'use server'

export default async function fetchRemoteFile(url: string) {
    const rawFileUrl = getRawFileUrl(url)
    let text = ''
    try {
        const response = await fetch(rawFileUrl)
        text = await response.text()
    } catch (err) {
        console.error(err)
    }
    return text
}

function getRawFileUrl(fileUrl: string) {
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
    }
    return url
}

// Example: `https://pastebin.com/n3hPafCi` returns `n3hPafCi`
function getFileQueryId(url: string) {
    const splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 1]
}