import {FormParamsProps} from "@common-types";

import {GetRequireFormParams} from "./types"

/**
 * Обязательные параметры формы для инициализации
 */
export const getRequireFormParams:GetRequireFormParams = ({
                                      loaded = false,
                                      triedSubmit = false,
                                      isSubmitBtnLocked = false,
                                      errorList = [],
                                      commonError = ''
}) => {

    const formParams: FormParamsProps = {
        loaded,
        triedSubmit,
        isSubmitBtnLocked,
        errorList,
        commonError
    }

    return formParams

}

