import {inputNumberValidator} from './input-number-validator'

import {LiveValidatorProps, ValidatorErrorProps, ValidatorSettingProps} from './../types'

export const validateWritedData:LiveValidatorProps = (hooksData) => {

    const {currentControl, newValue, form} = hooksData,
          controlValidatorsSetting = currentControl.validatorsSetting || {},
          controlValidatorsRules = currentControl.validateRules || {},
          {minValue: minValueRules, maxValue: maxValueRules, minLength: minLengthRules, maxLength: maxLengthRules, required: requiredRules, number: numberRules, email: emailRules} = controlValidatorsRules,
          defaultLiveFormValidatorSettings = form.formSettings.formValidatorsSetting,
          {
           minValue: minValueSetting = defaultLiveFormValidatorSettings.minValue,
           maxValue: maxValueSetting = defaultLiveFormValidatorSettings.maxValue,
           minLength: minLengthSetting = defaultLiveFormValidatorSettings.minLength,
           maxLength: maxLengthSetting = defaultLiveFormValidatorSettings.maxLength,
           required: requiredSetting = defaultLiveFormValidatorSettings.required,
           number: numberSetting = defaultLiveFormValidatorSettings.number,
           email: emailSetting = defaultLiveFormValidatorSettings.email
          } = controlValidatorsSetting,
          inputLength = String(newValue).length,
          isInputNumberValid = inputNumberValidator(newValue, numberRules),
          isControlValueNumber = typeof Number(newValue) === 'number'


        let hasError = false,
        shouldLockInput = false,
        errorData:ValidatorErrorProps = null

    //Записывает данные ошибок для дальнейшего отображения
    const errorHandler = (errorHandlerProps:ValidatorErrorProps, controlErrorSetting: ValidatorSettingProps):void => {
        const {message = null, limit = null} = errorHandlerProps,
              {showLiveErrorAfterFirstSubmit, hideErrorTimeout, showErrorTimeout} = controlErrorSetting

        hasError = true

        errorData = {message, limit, hideErrorTimeout, showErrorTimeout, showLiveErrorAfterFirstSubmit}
    }

    //Минимальное числовое значение
    if (minValueRules && isControlValueNumber && isInputNumberValid && +newValue < minValueRules.limit && minValueSetting.liveEnable === true && newValue != '') {
        errorHandler(minValueRules, minValueSetting)
        shouldLockInput = minValueSetting.shouldLockNotValidWrite
    }

    //Максимальное числовое значение
    if (maxValueRules && isControlValueNumber && isInputNumberValid && +newValue > maxValueRules.limit && maxValueSetting.liveEnable === true) {
        errorHandler(maxValueRules, maxValueSetting)
        shouldLockInput = maxValueSetting.shouldLockNotValidWrite
    }

    //Минимальная длина
    if (minLengthRules && inputLength < minLengthRules.limit && minLengthSetting.liveEnable === true && newValue != '') {
        errorHandler(minLengthRules, minLengthSetting)
        shouldLockInput = minLengthSetting.shouldLockNotValidWrite
    }

    //Максимальная длина
    if (maxLengthRules && inputLength > maxLengthRules.limit && maxLengthSetting.liveEnable === true) {
        errorHandler(maxLengthRules, maxLengthSetting)
        shouldLockInput = maxLengthSetting.shouldLockNotValidWrite
    }

    //Обязательное поле
    if (requiredRules && newValue === '' && requiredSetting.liveEnable === true) {
        errorHandler(requiredRules, requiredSetting)
        shouldLockInput = requiredSetting.shouldLockNotValidWrite
    }

    //Валидатор емаила
    if (emailRules && emailSetting.liveEnable === true) {
        let isMailInvalid = newValue === '' ? false : !/.+@.+\..+/i.test(String(newValue))

        if (isMailInvalid) {
            errorHandler(emailRules, emailSetting)
            shouldLockInput = emailSetting.shouldLockNotValidWrite
        }

    }

    //Если включен числовой валидатор, и ввели не число показать ошибку и заблокировать ввод
    if (currentControl.type === 'number' && !isInputNumberValid) {
        hasError = true

        //Показать ошибку цифрового валидатора если прописали
        if (numberRules && numberRules.message) {
            errorHandler(numberRules, numberSetting)
        }

        shouldLockInput = numberSetting.shouldLockNotValidWrite
    }

    return {shouldLockInput, hasError, errorData}
}

export const validateClickedData:LiveValidatorProps = (hooksData) => {
    const {currentControl, newValue, form} = hooksData,
        controlValidatorsSetting = currentControl.validatorsSetting || {},
        controlValidatorsRules = currentControl.validateRules || {},
        {required: requiredRules} = controlValidatorsRules,
        defaultLiveFormValidatorSettings = form.formSettings.formValidatorsSetting,
        {
            required: requiredSetting = defaultLiveFormValidatorSettings.required
        } = controlValidatorsSetting


    let hasError = false,
        shouldLockInput = false,
        errorData:ValidatorErrorProps = null

    //Записывает данные ошибок для дальнейшего отображения
    const errorHandler = (errorHandlerProps:ValidatorErrorProps, controlErrorSetting: ValidatorSettingProps):void => {
        const {message = null, limit = null} = errorHandlerProps,
            {showLiveErrorAfterFirstSubmit, hideErrorTimeout, showErrorTimeout} = controlErrorSetting

        hasError = true

        errorData = {message, limit, hideErrorTimeout, showErrorTimeout, showLiveErrorAfterFirstSubmit}
    }

    //Обязательное поле
    if (requiredRules && Array.isArray(newValue) && newValue.length === 0 && requiredSetting.liveEnable === true) {
        errorHandler(requiredRules, requiredSetting)
        shouldLockInput = false
    }

    return {shouldLockInput, hasError, errorData}
}