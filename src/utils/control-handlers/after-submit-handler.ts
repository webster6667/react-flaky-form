import {ControlProps, FormProps, HookProps, ValidatorErrorProps} from "@src/types";
import {messageParser} from "@src/helpers/parse-error-message";
import {defaultBeforeSubmitValidator} from "@src/helpers/vaidate-control-before-submit";

// export const validateControlAfterSubmit = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null) => {
//
//     //Данные для хуков
//     let isControlBeforeSubmitValidationSuccess: boolean = true,
//         hookData: HookProps = {currentControl: control, controlIndex, formIndex, controlName, newValue: control.value, form},
//         submitValidator = control.customSubmitValidator || form.formSettings.customSubmitValidator || defaultBeforeSubmitValidator,
//         additionalSubmitValidator = control.additionalSubmitValidator || form.formSettings.additionalSubmitValidator || null,
//         beforeSubmitValidator = control.beforeSubmitValidator || form.formSettings.beforeSubmitValidator || null,
//         afterSubmitValidator = control.afterSubmitValidator || form.formSettings.afterSubmitValidator || null,
//         errorDataForControl:ValidatorErrorProps = null,
//         beforeError = control.beforeSubmitValidatorError || form.formSettings.beforeSubmitValidatorError || null,
//         afterError = control.afterSubmitValidatorError || form.formSettings.afterSubmitValidatorError || null
//
//     //Хук перед валидацией
//     if (typeof beforeSubmitValidator === "function") {
//         beforeSubmitValidator(hookData)
//     }
//
//
//     //Если контрол не проходит функциональный валидатор - блокируем кнопку
//     if (typeof submitValidator === 'function') {
//         const {hasError = false, errorData = null} = submitValidator(hookData)
//
//         //Отобразить ошибку если дополнительный валидатор контрола не пройден
//         if (hasError) isControlBeforeSubmitValidationSuccess = false
//
//         //Записать данные ошибки для парсинга
//         if (errorData) errorDataForControl = errorData
//     }
//
//     //Пропустить контрол после валидации через дополнительный валидатор
//     if (typeof additionalSubmitValidator === "function") {
//         const {hasError = false, errorData = null} = additionalSubmitValidator(hookData)
//
//         //Отобразить ошибку если дополнительный валидатор контрола не пройден
//         if (hasError) isControlBeforeSubmitValidationSuccess = false
//
//         //Записать ошибку для парсинга
//         if (errorData) errorDataForControl = errorData
//     }
//
//     //Вывести ошибку если была
//     if (errorDataForControl) {
//         const {message = null, limit = null} = errorDataForControl,
//             errorMessage = messageParser(message, control.label, control.value, limit)
//
//         control.error = errorMessage
//
//         if (formIndex !== null) {
//             form.formParams.errorList[formIndex] = {...form.formParams.errorList[formIndex], [controlName]: errorMessage}
//         } else {
//
//             if (Array.isArray(form.formParams.errorList) && controlName) {
//                 // @ts-ignore
//                 form.formParams.errorList.push({[controlName]: errorMessage})
//             }
//
//         }
//
//
//     }
//
//     //Включить тригер ошибки
//     if (!isControlBeforeSubmitValidationSuccess) {
//
//         //Хук перед всплытием ошибки
//         if (typeof beforeError === "function") {
//             beforeError(hookData)
//         }
//
//         control.hasError = true
//
//         //Хук после всплытием ошибки
//         if (typeof afterError === "function") {
//             afterError(hookData)
//         }
//     }
//
//     //Хук после валидации
//     if (typeof afterSubmitValidator === "function") {
//         afterSubmitValidator(hookData)
//     }
//
//
//     return isControlBeforeSubmitValidationSuccess === true
// }
