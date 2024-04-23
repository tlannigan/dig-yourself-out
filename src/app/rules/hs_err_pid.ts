import { RuleCategory } from './general'

export const hotspotCrashDumpRules: RuleCategory = {
    title: 'HotSpot Crash Dump',
    versionChecks: [],
    rules: [
        {
            level: 'error',
            title: 'AMD driver crash',
            description:
                'An AMD driver issue has crashed your game. Make sure Minecraft is using the right GPU or update your AMD drivers.',
            candidates: ['C  [atio6axx'],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [],
        },
        {
            level: 'error',
            title: 'Intel driver crash',
            description:
                'An Intel driver issue has crashed your game. Try updating your graphic drivers or try some of the solutions at https://bugs.mojang.com/browse/MC-32606.',
            candidates: [
                'ig7icd32.dll',
                'ig7icd64.dll',
                'ig75icd32.dll',
                'ig75icd64.dll',
                'ig8icd64.dll',
                'ig9icd64.dll',
            ],
            onlyAppearsOnce: true,
            onlyVersionChecks: false,
            versionChecks: [],
        },
    ],
}
