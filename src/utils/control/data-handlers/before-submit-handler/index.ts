import {defaultBeforeSubmitValidator} from '@validators/before-submit-validator'
import {defaultBeforeSubmitValidatorErrorHandler} from '@error-handlers/before-submit-validator-error-handler'
import {setBeforeSubmitValidatorResult} from './helpers/set-before-submit-validator-result'


import {HookProps} from "@common-types";
import {ControlsHandlerBeforeSubmit, BeforeSubmitErrorData} from "./types"

export const controlsHandlerBeforeSubmit:ControlsHandlerBeforeSubmit = (currentControlData, form) => {

    const {currentControl} = currentControlData,
          hookData: HookProps = {...currentControlData, newValue: currentControl.value, selectedValue: null, form},
          submitValidator = currentControl.customSubmitValidator || defaultBeforeSubmitValidator,
          additionalSubmitValidator = currentControl.additionalSubmitValidator || form.formSettings.additionalSubmitValidator || null,
          beforeSubmitValidator = currentControl.beforeSubmitValidator || form.formSettings.beforeSubmitValidator || null,
          afterSubmitValidator = currentControl.afterSubmitValidator || form.formSettings.afterSubmitValidator || null,
          hasSubmitValidator = typeof submitValidator === "function",
          hasAdditionalSubmitValidator = typeof additionalSubmitValidator === "function",
          beforeSubmitErrorData:BeforeSubmitErrorData = {
              isControlBeforeSubmitValidationSuccess: true,
              errorDataForControl: null,
              hasControlError: false
          }

    /**
     * Хук перед валидацией
     */
    if (typeof beforeSubmitValidator === "function") {
        beforeSubmitValidator(hookData)
    }

    /**
     * Запуск валидатора по правилам
     */
    if (hasSubmitValidator) setBeforeSubmitValidatorResult(submitValidator, hookData, beforeSubmitErrorData)

    /**
     * Запуск дополнительного валидатора
     */
    if (hasAdditionalSubmitValidator) setBeforeSubmitValidatorResult(additionalSubmitValidator, hookData, beforeSubmitErrorData)

    const {isControlBeforeSubmitValidationSuccess, errorDataForControl, hasControlError} = beforeSubmitErrorData

    /**
     * Обработать ошибку контрола
     */
    if (hasControlError) defaultBeforeSubmitValidatorErrorHandler(errorDataForControl, hookData)

    /**
     * Хук после валидации
     */
    if (typeof afterSubmitValidator === "function") {
        afterSubmitValidator(hookData)
    }


    return isControlBeforeSubmitValidationSuccess
}
