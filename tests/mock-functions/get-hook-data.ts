import {HookProps} from "@common-types";

import {GetHookData} from "./types"

/**
 * Данные для хуков
 */
export const getHookData:GetHookData = ({controlName, currentControl, newValue, form, controlIndex = null, formIndex = null, selectedValue = null}) => {

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