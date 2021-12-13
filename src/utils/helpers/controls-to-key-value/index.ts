import {ControlsToKeyValue} from "./types"

/**
 * Переводит контролы в formData
 */
export const controlsToKeyValue:ControlsToKeyValue = controls => {
    const result:{[key: string]: any} = {}

    Object.keys(controls).map(controlName => {
        const controlValue = controls[controlName].value

            result[controlName] = controlValue
    })

    return result
}
