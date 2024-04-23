import { FileType } from '../enums'

export default function getMinecraftFileType(lines: string[], name: string) {
    // Get the first few lines to account for any discrepancies as
    // some launchers and server hosts add additional lines to logs
    const initialLines = lines.slice(0, 10)

    if (isStandardLog(initialLines)) {
        return FileType.STANDARD_LOG
    } else if (isExtendedMultimcLog(initialLines)) {
        return FileType.EXTENDED_MULTIMC_LOG
    } else if (isCrashReport(initialLines, name)) {
        return FileType.CRASH_REPORT
    } else if (isLauncherLog(name)) {
        return FileType.LAUNCHER_LOG
    } else if (isHotSpotCrashDump(name)) {
        return FileType.HOTSPOT_CRASH_DUMP
    } else if (isServerProperties(name)) {
        return FileType.SERVER_PROPERTIES
    } else {
        return FileType.UNKNOWN
    }
}

export function isStandardLog(lines: string[]) {
    // Example first line in a typical Fabric log:
    // "Loading Minecraft 1.20.1 with Fabric Loader 0.15.9"
    const isFabricLog = lines.find((line) => {
        const lowercaseLine = line.toLowerCase()
        return lowercaseLine.includes('loading minecraft ') && lowercaseLine.includes('with fabric loader')
    })

    // Example first line in a typical modern Forge log:
    // "ModLauncher running: args [--username, Tirsty_, --version, forge-47.2.21, etc"
    const isForgeModernLog = lines.find((line) => line.toLowerCase().includes('modlauncher running: args'))

    // Example first line in a typical legacy Forge log
    // "Loading tweak class name cpw.mods.fml.common.launcher.FMLTweaker"
    const isForgeLegacyLog = lines.find((line) => line.toLowerCase().includes('forge mod loader version '))

    return isFabricLog || isForgeModernLog || isForgeLegacyLog
}

export function isExtendedMultimcLog(lines: string[]) {
    return lines.find((line) => {
        const lowerCaseLine = line.toLowerCase()
        return (
            lowerCaseLine.includes('prism launcher version') ||
            lowerCaseLine.includes('polymc version') ||
            lowerCaseLine.includes('multimc version')
        )
    })
}

export function isCrashReport(lines: string[], name: string) {
    // Matches files named crash-1970-12-31_23.59.59-[client|server].txt
    const hasCrashReportFileName = name.startsWith('crash-') && name.endsWith('.txt')
    const firstLineSaysCrashReport = lines.slice(0, 5).find((l) => l.toLowerCase().includes('minecraft crash report'))
    return hasCrashReportFileName || firstLineSaysCrashReport
}

export function isLauncherLog(name: string) {
    return name.startsWith('launcher_log') && name.endsWith('.txt')
}

export function isHotSpotCrashDump(name: string) {
    // Matches files named hs_err_pidXXX.log
    return name.startsWith('hs_err_pid') && name.endsWith('.log')
}

export function isServerProperties(name: string) {
    return name === 'server.properties'
}
