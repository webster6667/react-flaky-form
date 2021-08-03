import {SetSubmitBtnValidatorResult} from "./types"
import {LockSubmitBtnErrorData} from "./../types"

import {StaticValidator, HookProps} from "@common-types"

/**
 * @description
 * Записывает результат валидаора на блокировку кнопки отправки
 *
 * @param {StaticValidator} validator - Валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {LockSubmitBtnErrorData} errorData - Объект в котором хранятся свойство блокировать или не блокировать кнопку
 * @param {boolean} shouldCheckValidatorSettings - Проверять необходимость блокировать ли кнопку отправки, по дополнительному полю shouldLockSubmitBtnWhenControlInvalid в настройкам rules
 *
 * @returns {void}
 */
export const setSubmitBtnValidatorResult:SetSubmitBtnValidatorResult = (validator, hookProps, errorData, shouldCheckValidatorSettings = false) => {
    const {hasError = false, shouldLockSubmitBtn = false} = validator(hookProps)

    if (hasError && shouldCheckValidatorSettings && shouldLockSubmitBtn) {
        errorData.shouldLockSubmitBtn = true
    } else if(hasError) {
        errorData.shouldLockSubmitBtn = true
    }

}