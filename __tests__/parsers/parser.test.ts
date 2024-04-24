import { getLastModified } from "@/app/parsers/parser"

describe('Get last modified datetime', () => {
    const genericTimestamp = 1000000000000
    const genericLocalDateTime = '9/8/2001, 7:46:40 PM'
    const genericUtcDateTime = '9/9/2001, 1:46:40 AM'

    it('returns empty', () => {
        const dateTime = getLastModified(0, true)
        expect(dateTime).toBe('')
    })

    it('returns local datetime', () => {
        const useLocalTime = true
        const dateTime = getLastModified(genericTimestamp, useLocalTime)
        expect(dateTime).toBe(genericLocalDateTime)
    })

    it('returns local datetime', () => {
        const useLocalTime = false
        const dateTime = getLastModified(genericTimestamp, useLocalTime)
        expect(dateTime).toBe(genericUtcDateTime)
    })
})