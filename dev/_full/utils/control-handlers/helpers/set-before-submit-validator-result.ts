import {SetBeforeSubmitValidatorResult} from "./types"

import {LiveValidator, HookProps, ControlOutputDataProps} from "@common-types"

/**
 * @description
 * Записывает результат статического валидатора перед отправкой данный на сервер
 *
 * @param {LiveValidator} validator - Валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {ControlOutputDataProps} beforeSubmitErrorData - Объект в котором хранятся результаты валидации
 *
 * @returns {void}
 */
export const setBeforeSubmitValidatorResult:SetBeforeSubmitValidatorResult = (validator, hookProps, beforeSubmitErrorData) => {
    const {errorData = null} = validator(hookProps),
          {hasError} = errorData
    
    /**
     * Отметить флаг что в контроле была хоть одна ошибка
     */
    if (hasError) {
        beforeSubmitErrorData.isControlBeforeSubmitValidationSuccess = false
        beforeSubmitErrorData.hasControlError = true
    }


    /**
     * Записать настройки вывода ошибки в главный объект вывода
     */
    if (errorData) beforeSubmitErrorData.errorDataForControl = errorData
}