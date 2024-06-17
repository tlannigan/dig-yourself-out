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
                missingDependencies.push(<p key={i}>Install {modId} {expectedRange}</p>)
            } else {
                missingDependencies.push(<p key={i}>Install {modId}</p>)
            }
        } else {
            break
        }
    }

    return unique(missingDependencies)
}

// Examples
// [29May2024 12:51:10.411] [main/FATAL] [mixin/]: Mixin apply failed shulkerboxtooltip-common.mixins.json:client.ScreenMixin -> net.minecraft.client.gui.screens.Screen: org.spongepowered.asm.mixin.injection.throwables.InvalidInjectionException @ModifyArg annotation on updateTooltipLeftAndBottomPos specifies a target class 'net/minecraft/client/gui/screen/Screen', which is not supported [PREINJECT Applicator Phase -> shulkerboxtooltip-common.mixins.json:client.ScreenMixin -> Prepare Injections ->  -> modify$bng000$updateTooltipLeftAndBottomPos(Lcom/mojang/math/Matrix4f;Lcom/mojang/blaze3d/vertex/BufferBuilder;IIIIIII)I -> Parse]
// Filename: mixin_apply_failed.log