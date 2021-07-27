import {FormControls, HookProps} from "@common-types";

/**
 * Данные для хуков
 */
export const getHookData = ({controlName, currentControl, newValue, form, controlIndex, formIndex, selectedValue}) => {

    const hookData: HookProps = {
        currentControl,
        controlName,
        newValue,
        form,
        controlIndex,
        formIndex,
        selectedValue
    }

    return hookData
}