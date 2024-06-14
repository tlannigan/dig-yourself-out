import getIssues from '../issueParser'
import { generalRules } from '@/rules/general'
import { crashReportRules } from '@/rules/crash'
import { getMemoryFlags } from './standardLogParser'

export const crashReportParser = {
    parse: (lines: string[]) => {
        const issues = getIssues({ lines }, [generalRules, crashReportRules])
        const systemInfo = getArgs(lines)

        return {
            issues,
            ...systemInfo
        }
    },
}

export function getArgs(lines: string[]) {
    const startOfSystemDetails = lines.findIndex((line) => line.toLowerCase().includes('-- system details --'))
    if (startOfSystemDetails >= 0) {
        const systemDetails = lines.slice(startOfSystemDetails, lines.length - 1)

        const mcVersion = getSystemDetailsValue(systemDetails, 'minecraft version')
        const java =  getSystemDetailsValue(systemDetails, 'java version')
        const cpu = getSystemDetailsValue(systemDetails, 'processor name')
        const physicalMemory = getPhysicalMemory(lines)
        const allocatedMemory = getMemoryFlags(systemDetails)

        return {
            mcVersion,
            java,
            cpu,
            physicalMemory,
            allocatedMemory
        }
    }
}

export function getSystemDetailsValue(lines: string[], key: string): string {
    const line = lines.find(line => line.toLowerCase().includes(`${key}:`))
    return line ? line.split(':')[1].trim() : ''
}

export function getPhysicalMemory(lines: string[]) {
    let physicalMegabytes = 0
    const memoryLines = lines.filter(line => line.toLowerCase().includes('memory slot ') && line.toLowerCase().includes('capacity (mb):'))
    for (let i = 0; i < memoryLines.length; i++) {
        const megabytes = memoryLines[i].split(':')[1].trim()
        physicalMegabytes = physicalMegabytes + parseInt(megabytes)
    }
    if (physicalMegabytes > 0) {
        return physicalMegabytes.toString() + ' MB'
    } else {
        return ''
    }
}