import { Launcher } from '../enums'

export default function getLauncherName(assetsDirectory: string) {
    const launcherType = getLauncherType(assetsDirectory)
    switch (launcherType) {
        case Launcher.VANILLA:
            return 'Vanilla'
        case Launcher.CURSEFORGE:
            return 'CurseForge'
        case Launcher.PRISM:
            return 'Prism'
        case Launcher.POLYMC:
            return 'PolyMC'
        case Launcher.MULTIMC:
            return 'MultiMC'
        case Launcher.MODRINTH:
            return 'Modrinth'
        case Launcher.FTB_APP:
            return 'FTB App'
        case Launcher.ATLAUNCHER:
            return 'ATLauncher'
        case Launcher.GDLAUNCHER:
            return 'GDLauncher'
        default:
            return 'Unknown'
    }
}

export function getLauncherType(assetsDirectory: string) {
    let launcher = Launcher.UNKNOWN
    const contains = (targetDir: string) => hasPath(assetsDirectory, targetDir)

    if (contains('AppData/Roaming/.minecraft/assets')) {
        launcher = Launcher.VANILLA
    } else if (contains('curseforge/minecraft/Install/assets')) {
        launcher = Launcher.CURSEFORGE
    } else if (contains('PrismLauncher/assets')) {
        launcher = Launcher.PRISM
    } else if (contains('PolyMC/assets')) {
        launcher = Launcher.POLYMC
    } else if (contains('MultiMC/assets')) {
        launcher = Launcher.MULTIMC
    } else if (contains('com.modrinth.theseus/meta/assets')) {
        launcher = Launcher.MODRINTH
    } else if (contains('.ftba/bin/assets')) {
        launcher = Launcher.FTB_APP
    } else if (contains('ATLauncher/assets')) {
        launcher = Launcher.ATLAUNCHER
    } else if (contains('datastore/assets') || contains('data/assets')) {
        launcher = Launcher.GDLAUNCHER
    } else {
        launcher = Launcher.UNKNOWN
    }
    return launcher
}

// Checks if filepaths contain a sub-path directory
// Handles both forward and backslashes in parameters
export function hasPath(fullPath: string, targetDir: string) {
    const forwardSlashedFullPath = fullPath.replaceAll('\\', '/').toLowerCase()
    const forwardSlashesTargetDir = targetDir.replaceAll('\\', '/').toLowerCase()
    return forwardSlashedFullPath.includes(forwardSlashesTargetDir)
}
