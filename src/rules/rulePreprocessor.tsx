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
    const alertElements = [<p key={-1}>Remove one of the following mods:</p>]
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().toLowerCase().startsWith('mod id: ')) {
            const indexOfFileNames = lines[i].indexOf('from mod files:') + 16
            const fileNames = lines[i].slice(indexOfFileNames).split(', ')
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
// [17:12:54] [main/ERROR]: Mixin apply for mod durabilityviewer failed mixins.durabilityviewer.json:TooltipMixin from mod durabilityviewer -> net.minecraft.class_1799: org.spongepowered.asm.mixin.transformer.throwables.InvalidMixinException @Shadow method method_7969 in mixins.durabilityviewer.json:TooltipMixin from mod durabilityviewer was not located in the target class net.minecraft.class_1799. Using refmap DurabilityViewer-refmap.json
export const getMixinApplyFailures = (lines: string[]): ReactElement[] => {
    const alertElements = [<p key={-1}>These mixins are failing to apply, try removing the mod(s) that own them:</p>]
    const splitWords = lines[0].trim().split(/[\s:]/g)
    const mixinJsons = splitWords.filter((word) => word.endsWith('.json') && !word.includes('refmap'))

    if (mixinJsons) {
        // Remove "mixins" and "json" portions of the mixin name, leaving the name given by the mod author
        const filteredMixinNames = new Set(mixinJsons.map((mixin) => mixin.replace(/(mixins|mixin|json)/g, '')))

        for (const [index, mixin] of filteredMixinNames.entries()) {
            alertElements.push(<p key={index}>&bull; {mixin.split('.')}</p>)
        }
    }

    return alertElements
}

export const getModloadingErrorMods = (lines: string[]) => {
    const indexOfModName = lines[0].toLowerCase().indexOf('modid: ') + 7
    const modName = lines[0].slice(indexOfModName).split(', ')[0]
    return [<p key={1}>Mod ID &quot;{modName}&quot; failed to load correctly.</p>]
}