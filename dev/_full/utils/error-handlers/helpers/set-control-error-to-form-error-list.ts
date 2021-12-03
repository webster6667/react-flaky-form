import {FormProps, HookProps} from "@common-types"
import {SetControlErrorToFormErrorList} from "./types"

/**
 * @description
 * Функция записывает все ошибки контролов формы, в объект с всеми ошибками формы
 *
 * @param {string} errorMessage - Текст ошибки контрола
 * @param {FormProps} form - Объект формы куда будут писатся все ошибки
 * @param {HookProps} hooksData - Данные контрола
 *
 */
export const setControlErrorToFormErrorList:SetControlErrorToFormErrorList = (errorMessage, form, hooksData) => {
    const {formIndex = null, controlName} = hooksData,
          isMultiForm = formIndex !== null,
          newError = {[controlName]: errorMessage}

    /**
     * Зафиксировать ошибки за определенной формой по индексу
     */
    if (isMultiForm) {
        const formErrors = form.formParams.errorList[formIndex]

        form.formParams.errorList[formIndex] = {...formErrors, ...newError}
    } else {

        if (Array.isArray(form.formParams.errorList) && controlName) {
            form.formParams.errorList.push(newError)
        }

    }

}