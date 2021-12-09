import {ControlsToFormData} from "./types"

/**
 * Переводит контролы в formData
 */
export const controlsToFormData:ControlsToFormData = controls => {
    const formData = new FormData()

    Object.keys(controls).map(controlName => {
        const controlValue = controls[controlName].value

        if (Array.isArray(controlValue)) {

            controlValue.map((value, index) => {
                formData.set(`${String(controlName)}${index}`, String(controlValue))
            })

        } else {
            formData.set(String(controlName), String(controlValue))
        }

    })

    return formData
}
