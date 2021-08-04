import messageLayoutsReplacer from "message-layouts-replacer";

import {setControlErrorToFormErrorList} from './helpers/set-control-error-to-form-error-list'

import {DefaultBeforeSubmitValidatorErrorHandler} from "./types";
import {replaceLayoutSymbols} from "@error-handlers/helpers/replace-layout-symbols";

export const defaultBeforeSubmitValidatorErrorHandler:DefaultBeforeSubmitValidatorErrorHandler = (errorDataForControl, hooksData) => {

    //@todo: form тащить из хука или из род функции
    
    const {currentControl, form} = hooksData,
          {label: controlLabel, value} = currentControl,
          {message = null, limit = null} = errorDataForControl || {},
          beforeError = currentControl.beforeSubmitValidatorError || form.formSettings.beforeSubmitValidatorError || null,
          afterError = currentControl.afterSubmitValidatorError || form.formSettings.afterSubmitValidatorError || null


    /**
     * Хук перед всплытием ошибки
     */
    if (typeof beforeError === "function") {
        beforeError(hooksData)
    }


        if (errorDataForControl) {

            /**
             * Обработанное сообщение об ошибке
             */
            const errorMessage = replaceLayoutSymbols(message, {limit, controlLabel, writeToControlValue: value})


            /**
             * Записать ошибку контрола
             */
            currentControl.error = errorMessage

            /**
             * Записать ошибку в список ошибок формы
             */
            setControlErrorToFormErrorList(errorMessage, form, hooksData)

            /**
             * Отобразить ошибку
             */
            currentControl.hasError = true

        }

    /**
     * Хук после всплытием ошибки
     */
    if (typeof afterError === "function") {
        afterError(hooksData)
    }

}