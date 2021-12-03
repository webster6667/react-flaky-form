import {errorDataHandler} from "simple-input-validators";

import {StaticErrorDataHandler} from "./types"
import {ValidatorErrorProps} from "@common-types"

/**
 * @description
 * Функция записывает данные ошибки статического валидатора, и определяет нужно ли блокировать форму отправки
 *
 * @param {ValidatorErrorProps} commonErrorData - объект с данными ошибки
 * @param {ValidatorErrorProps} propsToUpdate - Слой новых свойств которые будут накладыватся
 *
 */
export const StaticValidatorErrorHandler: StaticErrorDataHandler = (commonErrorData, propsToUpdate) => {
    const {shouldLockSubmitBtnWhenControlInvalid = false} = propsToUpdate,
          shouldLockSubmitBtn = commonErrorData.shouldLockSubmitBtn ? true : shouldLockSubmitBtnWhenControlInvalid

    errorDataHandler(commonErrorData, {...propsToUpdate, hasError: true, shouldLockSubmitBtn})
}