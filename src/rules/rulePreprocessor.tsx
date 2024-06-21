import { unique } from '@/utils/lists'
import { ReactElement } from 'react'

/**
 * Parses out the missing dependencies and provides them as a user-readable list
 * 
 * @param lines file lines starting with the first line where the rule that was detected
 * @returns all mods listed that have to be installed
 */
export const getMissingOrUnsupportedDependencies = (lines: string[]): ReactElement[] => {
    let missingDependencies = []
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
            const values = lines[i].trim().split(':')
            const modId = values[1].split(',')[0].trim().slice(1, -1)
            const expectedRange = values[3].split(', ')[0].trim().slice(1, -1)
            
            if (expectedRange !== "'*'") {
                missingDependencies.push(<p key={i}>&bull; Install {modId} {expectedRange}</p>)
            } else {
                missingDependencies.push(<p key={i}>&bull; Install {modId}</p>)
            }
        } else {
            break
        }
    }

    return unique(missingDependencies)
}

export const getDuplicateMods = (lines: string[]): ReactElement[] => {
    let duplicateMods = [<p key={0}>Remove one of the following mods:</p>]
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
            const indexOfFileNames = lines[i].indexOf('from mod files:') + 16
            console.log(indexOfFileNames)
            const fileNames = lines[i].slice(indexOfFileNames).split(', ')
            console.log(fileNames)
            for (const fileName of fileNames) {
                duplicateMods.push(<p key={i}>&bull; {fileName}</p>)
            }
        } else {
            break
        }
    }

    return duplicateMods
}

// [29May2024 12:51:10.411] [main/FATAL] [mixin/]: Mixin apply failed shulkerboxtooltip-common.mixins.json:client.ScreenMixin -> net.minecraft.client.gui.screens.Screen: org.spongepowered.asm.mixin.injection.throwables.InvalidInjectionException @ModifyArg annotation on updateTooltipLeftAndBottomPos specifies a target class 'net/minecraft/client/gui/screen/Screen', which is not supported [PREINJECT Applicator Phase -> shulkerboxtooltip-common.mixins.json:client.ScreenMixin -> Prepare Injections ->  -> modify$bng000$updateTooltipLeftAndBottomPos(Lcom/mojang/math/Matrix4f;Lcom/mojang/blaze3d/vertex/BufferBuilder;IIIIIII)I -> Parse]
export const getMixinApplyFailures = (lines: string[]): ReactElement[] => {
    let namedMixins = [<p key={-1}>These mixins are failing to apply, try removing the mods that own them:</p>]
    let mixinJsons = new Set(lines[0].match(/(((\w+)|(\w+(-|\.|_)\w+))\.(mixins|mixin)+.json)/g))
    if (mixinJsons) {
        for (const [index, mixin] of mixinJsons.entries()) {
            // Remove the "mixins.json" portion of the mixin name, leaving the name given by the mod author
            namedMixins.push(<p key={index}>&bull; {mixin.split('.').slice(0, -2).join('.')}</p>)
        }
    }

    return namedMixins
}