import {inputNumberValidator} from "./../helpers/input-number-validator";
import {formCycle} from "./../helpers/controls-cycle";


import {
    ControlProps,
    FormProps,
    HookProps
} from "../types";

//Дефолтный валидатор блокировки кнопки
// export const defaultLockSubmitBtnValidator = (hookData: HookProps):boolean => {
//     let {form, currentControl: control} = hookData,
//         {value: controlValue = '', validateRules = {}, validatorsSetting = {}} = control,
//         currentControlLength = String(controlValue).length,
//         isControlValid = true,
//         {email: emailSetting} = validatorsSetting,
//         {number: numberRules = {}} = validateRules,
//         isInputNumberValid = inputNumberValidator(controlValue, numberRules),
//         additionalLockSubmitBtnValidator = control.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null
//
//     //Если поле с маской
//     if (control.inputMask || control.customMask) {
//
//         let requiredRules = validateRules.required
//
//         //Выдать ошибку если поле с маской пустое
//         if (requiredRules && controlValue === '') {
//             isControlValid = false
//         }
//
//         //Выдать ошибку если обязательное поле не заполнено по маске
//         if (requiredRules && control.hasError) {
//             isControlValid = !control.hasError
//         }
//
//
//     } else if (validateRules) {
//
//         let minValueRules = validateRules.minValue,
//             maxValueRules = validateRules.maxValue,
//             minLengthRules = validateRules.minLength,
//             maxLengthRules = validateRules.maxLength,
//             validNumberRules = validateRules.number,
//             requiredRules = validateRules.required,
//             emailRules = validateRules.email
//
//
//         //Меньше лимита
//         if (minValueRules && typeof Number(controlValue) === 'number' && controlValue < minValueRules.limit) {
//             isControlValid = false
//         }
//
//         //Больше лимита
//         if (maxValueRules && typeof Number(controlValue) === 'number' && controlValue > maxValueRules.limit) {
//             isControlValid = false
//         }
//
//         //Короче лимита
//         if (minLengthRules && currentControlLength < minLengthRules.limit) {
//             isControlValid = false
//         }
//
//         //Длиннее лимита
//         if (maxLengthRules && currentControlLength > maxLengthRules.limit) {
//             isControlValid = false
//         }
//
//         //Не валидные цифры
//         if (validNumberRules && !isInputNumberValid) {
//             isControlValid = false
//         }
//
//         //Валидатор емаила
//         if (emailRules) {
//             let isMailInvalid = controlValue === '' ? false : !/.+@.+\..+/i.test(String(controlValue))
//
//
//             //Не валидный емаил
//             if (isMailInvalid) {
//                 isControlValid = false
//             }
//
//         }
//
//         //Обязательное поле пусто
//         if (requiredRules) {
//
//             if (control.value === '' || Array.isArray(control.value) && control.value.length === 0) {
//                 isControlValid = false
//             }
//
//         }
//
//     }
//
//     //Дополнительный валидатор
//     if (typeof additionalLockSubmitBtnValidator === 'function') {
//         const isAdditionalValidatorSuccess = additionalLockSubmitBtnValidator(hookData)
//
//         if (!isAdditionalValidatorSuccess) {
//             isControlValid = false
//         }
//
//     }
//
//     //Валидный контрол или нет
//     return isControlValid
// }


//Экшен определяющий валидатор на блокировку кнопки
export const isControlBtnSubmitValidationSuccess = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null) => {

    //Определить тип блокирования кнопки
    let lockSubmitBtnEvent = form.formSettings.lockSubmitBtnEvent,
        isControlBtnSubmitValidationSuccess = true

    //дополнительный валидатор кнопки
    const additionalLockSubmitBtnValidator = control.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null


    //Данные для хуков
    const hookData: HookProps = {currentControl: control, controlIndex, formIndex, controlName, newValue: control.value, form}

    //Валидатор на обязательные поля
    if (lockSubmitBtnEvent === 'required-empty') {

        
        if (control.validateRules && control.validateRules.required) {

            if(control.value === '' || Array.isArray(control.value) && control.value.length === 0) {
                isControlBtnSubmitValidationSuccess = false
            }

        }
        
    }

    //Валидатор блокирующий по функциям
    if (lockSubmitBtnEvent === 'lock-validator-has-error') {
        //Взять любой из слоев валидатора кнопки
        const lockSubmitValidator = control.customLockSubmitBtnValidator || form.formSettings.customLockSubmitBtnValidator || defaultLockSubmitBtnValidator

        //Если контрол не проходит функциональный валидатор - блокируем кнопку
        if (typeof lockSubmitValidator === 'function') {
            isControlBtnSubmitValidationSuccess = lockSubmitValidator(hookData)
        }

    }

    //Блокировать кнопку, если не прошли дополнительные условия
    if (typeof additionalLockSubmitBtnValidator === "function") {
        isControlBtnSubmitValidationSuccess = additionalLockSubmitBtnValidator(hookData)
    }

    return isControlBtnSubmitValidationSuccess
}

//Функция блокирующая или включающая кнопку отправить
export const toggleSubmitBtnLockRelativeLockValidatorError = (form: FormProps) => {

    //Пройтись циклам по всем контролам, чтоб узнать есть ли в одном из них ошибка
    const shouldLockSubmitBtn = !formCycle(form, isControlBtnSubmitValidationSuccess)

    //Заблокировать кнопку если где-то была ошибка, разблокировать если все чисто
    form.formParams.isSubmitBtnLocked = shouldLockSubmitBtn
}

