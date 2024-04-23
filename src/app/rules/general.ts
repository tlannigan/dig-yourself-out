import { Equality } from '../enums'

export type RuleCategory = {
    title: string
    versionChecks: VersionCheck[]
    rules: Rule[]
}

export type Rule = {
    level: string
    title: string
    description: string
    candidates: string[]
    onlyAppearsOnce: boolean
    onlyVersionChecks: boolean
    versionChecks: VersionCheck[]
}

export type VersionCheck = {
    type: string
    equality: Equality
    version: string
}

export const generalRules: RuleCategory = {
    title: "General",
    versionChecks: [],
    rules: [
        {
            level: "error",
            title: "Java 8 required",
            description: "Minecraft 1.16.5 and older requires Java 8.",
            candidates: [],
            onlyAppearsOnce: true,
            onlyVersionChecks: true,
            versionChecks: [
                {
                    type: "mcVersion",
                    equality: Equality.LTE,
                    version: "1.16.5"
                },
                {
                    type: "java",
                    equality: Equality.GTE,
                    version: "1.8.1"
                }
            ]
        },
        {
            level: "error",
            title: "Java 16 required",
            description: "Minecraft 1.17 requires Java 16.",
            candidates: [],
            onlyAppearsOnce: true,
            onlyVersionChecks: true,
            versionChecks: [
                {
                    type: "mcVersion",
                    equality: Equality.RANGE,
                    version: "1.17.0...1.18.3"
                },
                {
                    type: "java",
                    equality: Equality.RANGE,
                    version: "16.0.0...17.0.1"
                }
            ]
        },
        {
            level: "error",
            title: "Java 17 required",
            description: "Minecraft 1.18+ requires Java 17.",
            candidates: [],
            onlyAppearsOnce: true,
            onlyVersionChecks: true,
            versionChecks: [
                {
                    type: "mcVersion",
                    equality: Equality.GTE,
                    version: "1.18.0"
                },
                {
                    type: "java",
                    equality: Equality.LT,
                    version: "17.0.0",
                }
            ]
        },
        {
            level: "error",
            title: "Failed to bind to port",
            description: "A process is already using the assigned port. Close any other servers or restart your computer.",
            candidates: ["**** FAILED TO BIND TO PORT!"],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: []
        },
        {
            level: "error",
            title: "Mixin injection failure",
            description: "A mod was unable to inject mixins. This may be caused by a single mod or an incompatibility between one or more mods.",
            candidates: ["Mixin apply failed", "ERROR]: Mixin apply for mod", "Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError"],
            onlyAppearsOnce: false,
            onlyVersionChecks: false,
            versionChecks: []
        },
        {
            level: "error",
            title: "Mixin injection failure",
            description: "Something is conflicting with Fabric's reach_entity_attributes module mixins. You will likely have to binary search to find the issue.",
            candidates: ["Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError: Critical injection failure: Constant modifier method getActualReachDistance(DLnet/minecraft/world/level/Level;Lnet/minecraft/world/entity/player/Player;)D in mixins.reach-entity-attributes.json:ItemMixin from mod reach_entity_attributes failed injection check"],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: []
        },
        {
            level: "error",
            title: "Invalid or corrupted config",
            description: "One or more config files have become corrupted. Fix or delete them. When this error occurs there are usually multiple config files that require attention.",
            candidates: ["ConfigLoadingException: Failed loading config file"],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: []
        }
    ]
}