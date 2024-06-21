import { unique } from '@/utils/lists'
import { ReactElement } from 'react'

/**
 * Parses out the missing dependencies and provides them as a user-readable list
 * 
 * @param lines file lines starting with the first line where the rule that was detected
 * @returns all mods listed that have to be installed
 */
export const getMissingOrUnsupportedDependencies = (lines: string[]): ReactElement[] => {
    let alertElements = []
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
            const values = lines[i].trim().split(':')
            const modId = values[1].split(',')[0].trim().slice(1, -1)
            const expectedRange = values[3].split(', ')[0].trim().slice(1, -1)
            
            if (expectedRange !== "'*'") {
                alertElements.push(<p key={i}>&bull; Install {modId} {expectedRange}</p>)
            } else {
                alertElements.push(<p key={i}>&bull; Install {modId}</p>)
            }
        } else {
            break
        }
    }

    return unique(alertElements)
}

export const getDuplicateMods = (lines: string[]): ReactElement[] => {
    let alertElements = [<p key={-1}>Remove one of the following mods:</p>]
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
            const indexOfFileNames = lines[i].indexOf('from mod files:') + 16
            console.log(indexOfFileNames)
            const fileNames = lines[i].slice(indexOfFileNames).split(', ')
            console.log(fileNames)
            for (const fileName of fileNames) {
                alertElements.push(<p key={i}>&bull; {fileName}</p>)
            }
        } else {
            break
        }
    }

    return alertElements
}

// [29May2024 12:51:10.411] [main/FATAL] [mixin/]: Mixin apply failed shulkerboxtooltip-common.mixins.json:client.ScreenMixin -> net.minecraft.client.gui.screens.Screen: org.spongepowered.asm.mixin.injection.throwables.InvalidInjectionException @ModifyArg annotation on updateTooltipLeftAndBottomPos specifies a target class 'net/minecraft/client/gui/screen/Screen', which is not supported [PREINJECT Applicator Phase -> shulkerboxtooltip-common.mixins.json:client.ScreenMixin -> Prepare Injections ->  -> modify$bng000$updateTooltipLeftAndBottomPos(Lcom/mojang/math/Matrix4f;Lcom/mojang/blaze3d/vertex/BufferBuilder;IIIIIII)I -> Parse]
// Caused by: org.spongepowered.asm.mixin.injection.throwables.InjectionError: Critical injection failure: Variable modifier method setBlockStateInjectGenerateSkylightMapVanilla(Z)Z in mixins.phosphor.json:common.MixinChunk$Vanilla from mod unknown-owner failed injection check, (0/1) succeeded. Scanned 1 target(s). Using refmap mixins.phosphor.refmap.json
export const getMixinApplyFailures = (lines: string[]): ReactElement[] => {
    let alertElements = [<p key={-1}>These mixins are failing to apply, try removing the mods that own them:</p>]
    let mixinJsons = new Set(lines[0].match(/(((\w+)|(\w+(-|\.|_)\w+))\.(mixins|mixin|refmap)+.json)/g))
    if (mixinJsons) {
        for (const [index, mixin] of mixinJsons.entries()) {
            // Remove "mixins", "json", and/or "refmap" portions of the mixin name, leaving the name given by the mod author
            const mixinName = mixin.replace(/(mixins|mixin|refmap|json)/g, '')
            alertElements.push(<p key={index}>&bull; {mixinName.split('.')}</p>)
        }
    }

    return alertElements
}

export const getModloadingErrorMods = (lines: string[]) => {
    const indexOfModName = lines[0].toLowerCase().indexOf('modid: ') + 7
    const modName = lines[0].slice(indexOfModName).split(', ')[0]
    return [<p key={1}>Mod ID {modName} failed to load correctly.</p>]
}