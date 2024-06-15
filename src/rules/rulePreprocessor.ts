export const getMissingOrUnsupportedDependencies = (lines: string[]): string => {
    let missingDependencies = new Set()
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
            const values = lines[i].trim().split(':')
            const modId = values[1].split(',')[0].trim().slice(1, -1)
            const expectedRange = values[3].split(', ')[0].trim().slice(1, -1)
            let message
            if (expectedRange !== "'*'") {
                message = `Install ${modId} ${expectedRange}\n`
            } else {
                message = `Install ${modId}\n`
            }
            missingDependencies.add(message)
        } else {
            break
        }
    }
    return [...missingDependencies].join('\n')
}