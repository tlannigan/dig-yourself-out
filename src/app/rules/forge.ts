import { Equality } from '../enums'
import { RuleCategory } from './general'

export const forgeRules: RuleCategory = {
    title: 'Forge',
    versionChecks: [
        {
            type: 'forgeVersion',
            equality: Equality.GT,
            version: '0.0.0',
        },
    ],
    rules: [
        {
            level: 'error',
            title: 'OptiFine detected',
            description: 'Consider modern alternatives to OptiFine like Embeddium and Oculus or Sodium and Iris.',
            candidates: ['OptiFineTransformationService.onLoad'],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.16.5',
                },
            ],
        },
        {
            level: 'error',
            title: 'Missing or unsupported dependencies',
            description: 'Correct the dependency issues listed in your log.',
            candidates: ['Missing or unsupported mandatory dependencies'],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.18.2',
                },
            ],
        },
        {
            level: 'error',
            title: 'Unsupported optional dependencies',
            description: 'Correct the dependency issues listed in your log.',
            candidates: ['Unsupported installed optional dependencies'],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.18.2',
                },
            ],
        },
        {
            level: 'error',
            title: 'Missing dependencies',
            description: 'Correct the dependency issues listed in your log.',
            candidates: ['net.minecraftforge.fml.ModLoadingException'],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.16.0...1.17.0',
                },
            ],
        },
        {
            level: 'error',
            title: 'Missing dependencies',
            description: 'Correct the dependency issues listed in your log.',
            candidates: ['net.minecraftforge.fml.common.MissingModsException'],
            onlyAppearsOnce: false,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.12.0...1.13.0',
                },
            ],
        },
        {
            level: 'error',
            title: 'Missing dependencies',
            description: 'Correct the dependency issues listed in your log.',
            candidates: [') requires mods ['],
            onlyAppearsOnce: false,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.EQ,
                    version: '1.7.10',
                },
            ],
        },
        {
            level: 'error',
            title: 'Wrong Java 8 version',
            description: 'Forge 36.2.25 and below requires Java 8 update 320 or below for Minecraft 1.16.',
            candidates: [],
            onlyAppearsOnce: true,
            onlyVersionChecks: true,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.RANGE,
                    version: '1.16.0...1.17.0',
                },
                {
                    type: 'forgeVersion',
                    equality: Equality.RANGE,
                    version: '36.0.0...36.2.26',
                },
                {
                    type: 'java',
                    equality: Equality.GT,
                    version: '1.8.0.320',
                },
            ],
        },
        {
            level: 'error',
            title: 'Failed to initialize mod container',
            description: 'This can be caused by using a mod for the wrong modloader (eg. Fabric vs. Forge).',
            candidates: ['The following classes are missing, but are reported in the mods.toml'],
            onlyAppearsOnce: false,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.16.5',
                },
            ],
        },
        {
            level: 'error',
            title: 'Duplicate mods detected',
            description: 'Some mods can contain code from other mods and they can conflict. Remove one of the duplicate mods listed.',
            candidates: ['Found duplicate mods:'],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [
                {
                    type: 'mcVersion',
                    equality: Equality.GTE,
                    version: '1.16.5',
                },
            ],
        },
    ],
}
