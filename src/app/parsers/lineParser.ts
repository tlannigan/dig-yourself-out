export class GetLinesState {
    allLines: string[] = []
    duplicateIndex: number = -1
    duplicateCount: number = 0
    partialLine: string = ''
}

// Returns array of file lines
export default async function getLines(file: File, removeDuplicates: boolean) {
    const stream = file.stream().pipeThrough(new TextDecoderStream())
    const reader = stream.getReader()
    let allLines: string[] = []

    try {
        allLines = await parseLines(reader, removeDuplicates)
    } catch (e) {
        console.log("getFileLines Error: " + e)
    } finally {
        reader.releaseLock()
    }
    
    return allLines
}

export async function parseLines(streamReader: ReadableStreamDefaultReader<string>, removeDuplicates: boolean) {
    const state = new GetLinesState()

    while (true) {
        const { done, value } = await streamReader.read()

        const rawLines = value ? value.split(/\n/) : []
        const linesWithSpacesInsteadOfTabs = replaceTabsWithSpaces(rawLines)
        const lines = removeAllNewlineCharacters(linesWithSpacesInsteadOfTabs)

        if (state.partialLine !== '' && lines.length > 0) {
            lines[0] = state.partialLine + lines[0] // Complete the partial line
            state.partialLine = ''
        } else if (state.partialLine !== '') {
            lines.push(state.partialLine)
        }

        // Check for a partial line that doesn't end with a newline
        if (lines.length > 0 && !lastLineEndsWithNewline(rawLines) && !done) {
            const poppedLine = lines.pop() as string
            state.partialLine = poppedLine
        }
        
        if (removeDuplicates) {
            const deduplicatedLines = deduplicateLines(lines, state, done)
            state.allLines = state.allLines.concat(deduplicatedLines)
        } else {
            state.allLines = state.allLines.concat(lines)
        }

        if (done) break
    }

    const linesWithNewlines = addNewlineCharacterEndings(state.allLines)
    return linesWithNewlines
}

export function deduplicateLines(lines: string[], state: GetLinesState, done: boolean) {
    const deduplicatedLines = []
            
    const addRepeatedLine = () => {
        deduplicatedLines.push(`      Repeated ${state.duplicateCount} more time(s)`)
    }

    const resetDuplicateInfo = () => {
        state.duplicateIndex = -1
        state.duplicateCount = 0
    }

    for (let line = 0; line < lines.length; line++) {
        const isLineBlank = lines[line].trim() === ''
        if (isLineBlank) {
            deduplicatedLines.push(lines[line] + '\n')
            continue
        }

        if (line > 0) {
            const isLineDuplicateOfPreviousLine = removeTimestamp(lines[line]) === removeTimestamp(lines[line - 1])
            if (isLineDuplicateOfPreviousLine) {
                if (state.duplicateIndex < 0) { // If this is a new duplicate chain
                    state.duplicateIndex = line - 1 // Mark the first of the duplicates
                }
                state.duplicateCount++
            } else {
                if ((state.duplicateIndex >= 0) && (line !== lines.length - 1)) {
                    addRepeatedLine()
                    resetDuplicateInfo()
                    deduplicatedLines.push(lines[line])
                } else {
                    deduplicatedLines.push(lines[line])
                }
            }
        } else {
            const isLineDuplicateOfPreviousIterationsLastLine = (state.allLines.length > 0) && (removeTimestamp(lines[line]) === removeTimestamp(state.allLines[state.allLines.length - 1]))
            if (isLineDuplicateOfPreviousIterationsLastLine) {
                state.duplicateCount++
                if (lines.length === 1) {
                    addRepeatedLine()
                    resetDuplicateInfo()
                }
            } else {
                deduplicatedLines.push(lines[line])
            }
        }
    }

    if (done && state.duplicateIndex >= 0) {
        addRepeatedLine()
        resetDuplicateInfo()
    }
    
    return deduplicatedLines
}

export function replaceTabsWithSpaces(lines: string[]) {
    return lines.map(line => line.replace(/\t/gy, '    '))
}

export function removeAllNewlineCharacters(lines: string[]) {
    return lines.map(line => line.replace(/\r?\n|\r/g, ''))
}

export function addNewlineCharacterEndings(lines: string[]) {
    return lines.map((line, index) => {
        const isBlank = line.trim() === ''
        const isLastElement = index === lines.length - 1
        return (!isBlank && !isLastElement) ? line + '\r' : line
    })
}

export function lastLineEndsWithNewline(lines: string[]) {
    return /(\r\n|\r|\n)/.test(lines[lines.length - 1])
}

export function removeTimestamp(line: string) {
    if (line.startsWith('[')) {
        const end = line.indexOf(']') + 1
        const detimestampedLine = line.substring(end)
        // Check if line only consists of text within square brackets
        if (detimestampedLine.trim() !== '') {
            return detimestampedLine
        } else {
            return line
        }
    } else {
        return line
    }
}