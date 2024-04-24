import { getUrlPathId, getRawFileUrl } from "@/app/remoteFileHandler"

const gnomebotUrl = 'https://gnomebot.dev/paste/1234567890'
const pastebinUrl = 'https://pastebin.com/1234567890'
const mclogsUrl = 'https://mclo.gs/1234567890'
const pasteeeUrl = 'https://paste.ee/p/1234567890'

const rawGnomebotUrl = 'https://gnomebot.dev/paste/1234567890/raw'
const rawPastebinUrl = 'https://pastebin.com/raw/1234567890'
const rawMclogsUrl = 'https://api.mclo.gs/1/raw/1234567890'
const rawPasteeeUrl = 'https://paste.ee/r/1234567890'
const rawGistUrl = 'https://gist.githubusercontent.com/1234567890'

const pathParameter = '1234567890'

describe('Get file query ID', () => {
    it('returns final path parameter', () => {
        const filePathId = getUrlPathId(gnomebotUrl)
        expect(filePathId).toBe(pathParameter)
    })
})

describe('Get raw file URL', () => {
    it('returns raw Gnomebot URL when providing a non-raw URL', () => {
        const url = getRawFileUrl(gnomebotUrl)
        expect(url).toBe(rawGnomebotUrl)
    })

    it('returns raw Gnomebot URL when providing a raw URL', () => {
        const url = getRawFileUrl(rawGnomebotUrl)
        expect(url).toBe(rawGnomebotUrl)
    })

    it('returns raw Pastebin URL when providing a non-raw URL', () => {
        const url = getRawFileUrl(pastebinUrl)
        expect(url).toBe(rawPastebinUrl)
    })

    it('returns raw Pastebin URL when providing a raw URL', () => {
        const url = getRawFileUrl(rawPastebinUrl)
        expect(url).toBe(rawPastebinUrl)
    })

    it('returns raw MC Logs URL when providing a non-raw URL', () => {
        const url = getRawFileUrl(mclogsUrl)
        expect(url).toBe(rawMclogsUrl)
    })

    it('returns raw MC Logs URL when providing a raw URL', () => {
        const url = getRawFileUrl(rawMclogsUrl)
        expect(url).toBe(rawMclogsUrl)
    })

    it('returns raw Pasteee URL when providing a non-raw URL', () => {
        const url = getRawFileUrl(pasteeeUrl)
        expect(url).toBe(rawPasteeeUrl)
    })

    it('returns raw Pastee URL when providing a raw URL', () => {
        const url = getRawFileUrl(rawPasteeeUrl)
        expect(url).toBe(rawPasteeeUrl)
    })

    it('returns Gist URL when providing a raw URL', () => {
        const url = getRawFileUrl(rawGistUrl)
        expect(url).toBe(rawGistUrl)
    })
})