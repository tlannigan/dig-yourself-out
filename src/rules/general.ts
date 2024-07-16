import { ReactElement } from 'react'
import { AlertLevel, Equality } from '../constants/enums'
import { getMixinApplyFailures } from './rulePreprocessor'

export type RuleCategory = {
    title: string
    versionChecks: VersionCheck[]
    rules: Rule[]
}

export type Rule = {
    level: AlertLevel
    title: string
    description?: ReactElement[] | string
    preprocessor?: (lines: string[]) => ReactElement[]
    candidates: string[]
    onlyAppearsOnce: boolean
    versionChecks: VersionCheck[]
}

export type VersionCheck = {
    type: string
    equality: Equality
    version: string
}

export const generalRules: RuleCategory = {
    title: 'General',
    versionChecks: [],
    rules: [
        {
            level: AlertLevel.ERROR,
            title: 'Java 8 required',
            description: 'Minecraft 1.16.5 and older requires Java 8.',
            candidates: [],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.LTE,
                    version: '1.16.5',
                },
                {
                    type: 'java',
                    equality: Equality.GTE,
                    version: '1.8.1',
                },
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Java 16 required',
            description: 'Minecraft 1.17 requires Java 16.',
            candidates: [],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.17.0...1.18.0',
                },
                {
                    type: 'java',
                    equality: Equality.RANGE,
                    version: '16.0.0...17.0.0',
                },
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Java 17 required',
            description: 'Minecraft 1.18+ requires Java 17.',
            candidates: [],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.18.0...1.20.5',
                },
                {
                    type: 'java',
                    equality: Equality.LT,
                    version: '17.0.0',
                },
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Java 17 required',
            description: 'Minecraft 1.18+ requires Java 17.',
            candidates: [],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.18.0...1.20.5',
                },
                {
                    type: 'java',
                    equality: Equality.RANGE,
                    version: '18.0.0...21.0.0',
                },
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Java 17 required',
            description: 'Minecraft 1.18+ requires Java 17.',
            candidates: [],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.18.0...1.20.5',
                },
                {
                    type: 'java',
                    equality: Equality.GTE,
                    version: '22.0.0',
                },
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Java 21 required',
            description: 'Minecraft 1.20.5+ requires Java 21.',
            candidates: [],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.20.5',
                },
                {
                    type: 'java',
                    equality: Equality.GTE,
                    version: '22.0.0',
                },
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Failed to bind to port',
            description:
                'A process is already using the assigned port. Close any other servers or restart your computer.',
            candidates: ['**** FAILED TO BIND TO PORT!'],
            onlyAppearsOnce: true,
            versionChecks: [],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Mixin injection failure',
            preprocessor: getMixinApplyFailures,
            candidates: [
                'Mixin apply failed',
                'ERROR]: Mixin apply for mod',
                'Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError',
            ],
            onlyAppearsOnce: false,
            versionChecks: [],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Mixin injection failure',
            description:
                "Something is conflicting with Fabric's reach_entity_attributes module mixins. You will likely have to binary search to find the issue.",
            candidates: [
                'Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError: Critical injection failure: Constant modifier method getActualReachDistance(DLnet/minecraft/world/level/Level;Lnet/minecraft/world/entity/player/Player;)D in mixins.reach-entity-attributes.json:ItemMixin from mod reach_entity_attributes failed injection check',
            ],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.16.5'
                }
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Invalid or corrupted config',
            description:
                'One or more config files have become corrupted. Fix or delete them. When this error occurs there are usually multiple config files that require attention.',
            candidates: ['ConfigLoadingException: Failed loading config file'],
            onlyAppearsOnce: true,
            versionChecks: [],
        },
        {
            level: AlertLevel.WARNING,
            title: 'Server running in offline mode',
            description: 'Offline servers can cause problems with mods that rely on player IDs. Switch to online mode before continuing to debug.',
            candidates: ['SERVER IS RUNNING IN OFFLINE/INSECURE MODE'],
            onlyAppearsOnce: true,
            versionChecks: [],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Pose stack not empty',
            description: 'This error is often caused by Epic Fight. Try removing it.',
            candidates: ['java.lang.IllegalStateException: Pose stack not empty'],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.16.5'
                }
            ],
        },
        {
            level: AlertLevel.WARNING,
            title: 'Log possibly cut off',
            description: 'If a log is written to at midnight it will be archived and a new file is created, leading to cut off logs.',
            candidates: ['00:00:00', '00:00:01', '00:00:02', '00:00:03', '00:00:04', '00:00:05'],
            onlyAppearsOnce: true,
            versionChecks: [],
        },
        {
            level: AlertLevel.WARNING,
            title: 'Cloud folder detected',
            description: 'It is not recommended to store your modpack instances or servers in cloud-saved folders, like OneDrive or CloudDocs, as it can lead to corrupted files.',
            candidates: ['OneDrive', 'com~apple~CloudDocs'],
            onlyAppearsOnce: true,
            versionChecks: [],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Maximum ID range exceeded',
            description: 'Install Not Enough Item IDs (NEID).',
            candidates: ['Invalid id 4096 - maximum id range exceeded'],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.7...1.8'
                }
            ],
        },
        {
            level: AlertLevel.ERROR,
            title: 'Maximum ID range exceeded',
            description: 'Install Roughly Enough Item IDs (REID).',
            candidates: ['Invalid id 4096 - maximum id range exceeded'],
            onlyAppearsOnce: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.12...1.13'
                }
            ],
        },
    ],
}
