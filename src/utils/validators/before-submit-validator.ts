import {SubmitValidatorProps, ValidatorErrorProps} from "@src/types";
import {inputNumberValidator} from "@src/helpers/input-number-validator";

export const defaultAfterSubmitValidator:SubmitValidatorProps = (hooksData) => {

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