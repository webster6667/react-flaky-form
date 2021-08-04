import {formCycle} from '@control-utils/controls-cycle'
import {defaultStaticValidator} from '@validators/static-validator'
import {setLockSubmitBtnValidatorResult} from './helpers/set-lock-submit-validator-result'

import {CurrentControlData, HookProps} from "@common-types"
import {ShouldLockSubmitBtnByControl, LockSubmitBtnErrorData, ShouldLockSubmitBtnByForm} from "./types"


/**
 * @description
 * Функция проходит через данные контрола, и на их основании определяет блокировать ли кнопку ввода
 *
 * @param {CurrentControlData} currentControlData - Все данные по переданному контролу
 * @param {FormProps} form - главный объект формы
 *
 * @returns {boolean}
 *
 */
export const shouldLockSubmitBtnByControl:ShouldLockSubmitBtnByControl = (currentControlData, form) => {


    const {currentControl} = currentControlData,
          hookData: HookProps = {...currentControlData, newValue: currentControl.value, selectedValue: null, form},
          lockSubmitValidator = currentControl.customLockSubmitBtnValidator || form.formSettings.customLockSubmitBtnValidator || defaultStaticValidator,
          additionalLockSubmitBtnValidator = currentControl.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null,
          hasLockSubmitBtnValidator = typeof lockSubmitValidator === "function",
          hasAdditionalLockSubmitBtnValidator = typeof additionalLockSubmitBtnValidator === "function",
          errorData:LockSubmitBtnErrorData = {shouldLockSubmitBtn: false}

    /**
     * Запуск валидатора по правилам
     */
    if (hasLockSubmitBtnValidator) setLockSubmitBtnValidatorResult(lockSubmitValidator, hookData, errorData, true)

    /**
     * Запуск дополнительного валидатора
     */
    if (hasAdditionalLockSubmitBtnValidator) setLockSubmitBtnValidatorResult(additionalLockSubmitBtnValidator, hookData, errorData)

    return errorData.shouldLockSubmitBtn
}

/**
 * @description
 * Функция проходит через данные всех контролов, и на их основании определяет нужно ли блокировать кнопку
 *
 * @param {FormProps} form - главный объект формы, содержащий все контролы
 *
 * @returns {boolean}
 */
export const shouldLockSubmitBtnByForm:ShouldLockSubmitBtnByForm = (form) => {
    return formCycle(form, shouldLockSubmitBtnByControl)
}
