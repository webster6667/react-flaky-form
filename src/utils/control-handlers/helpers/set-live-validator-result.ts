import {GetValidatorResult} from "./types"

import {LiveValidator, HookProps, ControlOutputDataProps} from "@common-types"

/**
 * @description
 * Записывает результат живого валидатора, в объект вывода данных контрола
 *
 * @param {LiveValidator} validator - Живой валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {ControlOutputDataProps} controlOutputData - Объект в котором хранятся данные вывода контрола
 *
 * @returns {void}
 */
export const setLiveValidatorResult:GetValidatorResult = (validator, hookProps, controlOutputData) => {
    const {errorData = null, modifiedValueToWrite = null} = validator(hookProps),
          {shouldLockInput, hasError} = errorData

    if (shouldLockInput) controlOutputData.isWriteInputEnable = false
    if (hasError) controlOutputData.hasError = true

    /**
     * Если в валидаторе модифицировали вводимое значение, и вернули, записать в объект вывода
     */
    if (modifiedValueToWrite) controlOutputData.writeToControlValue = modifiedValueToWrite

    /**
     * Записать настройки вывода ошибки в главный объект вывода
     */
    if (errorData) controlOutputData.errorDataForControl = errorData
}