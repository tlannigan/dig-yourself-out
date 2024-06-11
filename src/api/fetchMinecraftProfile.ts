'use server'

export type MinecraftProfile = {
    id?: string
    name?: string
}

export default async function fetchMinecraftProfile(username: string) {
    try {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
        if (response.ok) {
            if (response.status === 200) {
                // Profile exists with username
                const profile = await response.json() as MinecraftProfile
                return profile
            } else if (response.status === 204) {
                // Username is not currently in use
                return {}
            }
        }
    } catch (err) {
        console.error(err)
        if (err instanceof Error) {
            throw new Error(err.message)
        }
    }
}