import {messageParser} from "./parse-error-message"
import {inputNumberValidator} from "./input-number-validator"

import {ControlProps, FormProps, HookProps, SubmitValidatorProps, ValidatorErrorProps} from "./../types"

export const defaultBeforeSubmitValidator:SubmitValidatorProps = (hooksData) => {

    let {currentControl: control} = hooksData,
        {value: controlValue = '', hasError = false, validateRules = {}, inputMask = null, customMask = null} = control,
        currentControlLength = String(controlValue).length,
        isControlValueNumber = typeof Number(controlValue) === 'number',
        {number: numberRules = {}} = validateRules,
        isInputNumberValid = inputNumberValidator(controlValue, numberRules),
        isControlValid = true,
        errorData:ValidatorErrorProps = null,
        hasControlValidateRules = Object.keys(validateRules).length > 0

    const {
        minLength = null,
        maxLength = null,
        minValue = null,
        maxValue = null,
        required: isRequiredControl = null,
        number: onlyNumberControl = null,
        email: isEmailControl = null
    } = validateRules

    //Обработчик ошибок
    //1.Проставляет тригер валидности
    //2.Пишит данные для парсинга ошибок
    //3.Пушит ошибку в общую группу
    const errorHandler = (errorHandlerProps:ValidatorErrorProps):void => {
        const {message, limit = null} = errorHandlerProps

        isControlValid = false

        errorData = {message, limit}
    }

    //Валидатор на соблюдение маски
    if (inputMask || customMask) {
        //Отметить ошибку если контрол не соответстувет маске
        isControlValid = !hasError

        //Если прописана ошибка при несовпадении с маской - показать
        if (inputMask && inputMask.message && hasError) {
            errorHandler(inputMask)
        }

        //Если поле с маской обязательно к заполнению и пустое - показать ошибку
        if (isRequiredControl && controlValue === '') {
            errorHandler(isRequiredControl)
        }


    } else if (hasControlValidateRules) {


        if (minValue && isControlValueNumber && controlValue < minValue.limit) {
            errorHandler(minValue)
        }

        if (maxValue && isControlValueNumber && controlValue > maxValue.limit) {
            errorHandler(maxValue)
        }

        if (minLength && currentControlLength < minLength.limit) {
            errorHandler(minLength)
        }

        if (maxLength && currentControlLength > maxLength.limit) {
            errorHandler(maxLength)
        }


        if (onlyNumberControl && !isInputNumberValid) {
            errorHandler(onlyNumberControl)
        }

        //Валидатор емаила
        if (isEmailControl) {
            let isMailInvalid = controlValue === '' ? false : !/.+@.+\..+/i.test(String(controlValue))


            if (isMailInvalid) {
                errorHandler(isEmailControl)
            }

        }

        if (isRequiredControl) {

            if (Array.isArray(controlValue) && controlValue.length === 0 || controlValue === '') {
                errorHandler(isRequiredControl)
            }
        }

    }

    return {hasError: !isControlValid, errorData}
}

//Провалидировать контрол, перед отправкой на сервер, и вывести ошибки
export const validateControlBeforeSubmit = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null) => {

    //Данные для хуков
    let isControlBeforeSubmitValidationSuccess: boolean = true,
        hookData: HookProps = {currentControl: control, controlIndex, formIndex, controlName, newValue: control.value, form},
        submitValidator = control.customSubmitValidator || form.formSettings.customSubmitValidator || defaultBeforeSubmitValidator,
        additionalSubmitValidator = control.additionalSubmitValidator || form.formSettings.additionalSubmitValidator || null,
        beforeSubmitValidator = control.beforeSubmitValidator || form.formSettings.beforeSubmitValidator || null,
        afterSubmitValidator = control.afterSubmitValidator || form.formSettings.afterSubmitValidator || null,
        errorDataForControl:ValidatorErrorProps = null,
        beforeError = control.beforeSubmitValidatorError || form.formSettings.beforeSubmitValidatorError || null,
        afterError = control.afterSubmitValidatorError || form.formSettings.afterSubmitValidatorError || null

    //Хук перед валидацией
    if (typeof beforeSubmitValidator === "function") {
        beforeSubmitValidator(hookData)
    }


    //Если контрол не проходит функциональный валидатор - блокируем кнопку
    if (typeof submitValidator === 'function') {
        const {hasError = false, errorData = null} = submitValidator(hookData)
        
        //Отобразить ошибку если дополнительный валидатор контрола не пройден
        if (hasError) isControlBeforeSubmitValidationSuccess = false

        //Записать данные ошибки для парсинга
        if (errorData) errorDataForControl = errorData
    }

    //Пропустить контрол после валидации через дополнительный валидатор
    if (typeof additionalSubmitValidator === "function") {
        const {hasError = false, errorData = null} = additionalSubmitValidator(hookData)

        //Отобразить ошибку если дополнительный валидатор контрола не пройден
        if (hasError) isControlBeforeSubmitValidationSuccess = false

        //Записать ошибку для парсинга
        if (errorData) errorDataForControl = errorData
    }

    //Вывести ошибку если была
    if (errorDataForControl) {
        const {message = null, limit = null} = errorDataForControl,
              errorMessage = messageParser(message, control.label, control.value, limit)

        control.error = errorMessage

        if (formIndex !== null) {
            form.formParams.errorList[formIndex] = {...form.formParams.errorList[formIndex], [controlName]: errorMessage}
        } else {

            if (Array.isArray(form.formParams.errorList) && controlName) {
                // @ts-ignore
                form.formParams.errorList.push({[controlName]: errorMessage})
            }

        }


    }

    //Включить тригер ошибки
    if (!isControlBeforeSubmitValidationSuccess) {

        //Хук перед всплытием ошибки
        if (typeof beforeError === "function") {
            beforeError(hookData)
        }

        control.hasError = true

        //Хук после всплытием ошибки
        if (typeof afterError === "function") {
            afterError(hookData)
        }
    }

    //Хук после валидации
    if (typeof afterSubmitValidator === "function") {
        afterSubmitValidator(hookData)
    }


    return isControlBeforeSubmitValidationSuccess === true
}
