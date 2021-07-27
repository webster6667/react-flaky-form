import {FormParamsProps} from "@common-types";

import {GetRequireFormParams} from "./types"

/**
 * Обязательные параметры формы для инициализации
 */
export const getRequireFormParams:GetRequireFormParams = (formParamsProps = {}) => {

    const formParams: FormParamsProps = {
        loaded: false,
        triedSubmit: false,
        isSubmitBtnLocked: false,
        errorList: [],
        commonError: '',
        ...formParamsProps
    }

    return formParams

}

