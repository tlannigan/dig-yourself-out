import { Equality } from '../enums'
import { RuleCategory } from './general'

export const fabricRules: RuleCategory = {
    title: 'Fabric',
    versionChecks: [
        {
            type: 'fabricVersion',
            equality: Equality.GT,
            version: '0.0.0',
        },
    ],
    rules: [],
}
