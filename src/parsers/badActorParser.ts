'use server'

import fetchMinecraftProfile from '../../api/fetchMinecraftProfile'
import { FileInfo } from './parser'

export type BadActor = {
    isHacker: boolean
    isPirate: boolean
}

const expectedUserType = 'msa'
const expectedVersionType = 'release'

export async function getBadActorInfo(file: FileInfo): Promise<BadActor> {
    return {
        isHacker: isHacker(file),
        isPirate: await isPirate(file)
    }
}

// Check if using client or mods that allow cheating/exploits
export function isHacker(file: FileInfo): boolean {
    // Check for `meteor-client` and `baritone`
    const usingExploitMods = false
    return true
}

// Check if player owns Minecraft
export async function isPirate(file: FileInfo): Promise<boolean> {
    const usernameValid = await isUsernameValid(file)
    const userTypeValid = isUserTypeValid(file)
    const versionTypeValid = isVersionTypeValid(file)
    return !usernameValid || !userTypeValid || !versionTypeValid
}

export async function isUsernameValid(file: FileInfo) {
    if (file.username) {
        const profile = await fetchMinecraftProfile(file.username)
        return profile?.name !== undefined
    }
    return true
}

export function isUserTypeValid(file: FileInfo) {
    if (file.userType) {
        return file.userType === expectedUserType
    }
    return true
}

export function isVersionTypeValid(file: FileInfo) {
    if (file.versionType) {
        return file.versionType === expectedVersionType
    }
    return true
}
