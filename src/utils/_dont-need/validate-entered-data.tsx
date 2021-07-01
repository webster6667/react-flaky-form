import {LiveValidatorProps, ValidatorErrorProps, ValidatorSettingProps, ValidatorsSettingListInsideHandler} from '@common-types'

import {
    isShorterThanLimit,
    isLongerThanLimit,
    isGreaterThanLimit,
    isLessThanLimit,
    isWrittenValueEmpty,
    isMailInvalid,
    isNumberValid
} from 'simple-input-validators';

const isLiveValidatorEnable = (controlValidatorsSetting: ValidatorSettingProps):boolean => {
    return controlValidatorsSetting.liveEnable === true
}

//Записывает данные ошибок для дальнейшего отображения
const errorHandler = (commonErrorData: any, controlErrorSetting: any):void => {
    commonErrorData = {
        ...commonErrorData,
        ...controlErrorSetting
    }
}

//@ts-ignore
const validateWrittenData:LiveValidatorProps = (hooksData) => {

    /**
     * 1.Получить данные для работы (контрол через который будут проходить данные, вводимое значение, всю форму)
     * 2.Получить правила валидации(все валидаторы)
     * 3.Получить настройки валидаторов
     */
    const {currentControl, newValue} = hooksData,
          controlValidatorsRules = currentControl.validateRules || {},
          controlValidatorsSetting = currentControl.validatorsSetting || {},
          {minValue: minValueRules, maxValue: maxValueRules, minLength: minLengthRules, maxLength: maxLengthRules, required: requiredRules, number: numberRules, email: emailRules} = controlValidatorsRules,
          {minValue: minValueSetting, maxValue: maxValueSetting, minLength: minLengthSetting, maxLength: maxLengthSetting, required: requiredSetting, number: numberSetting, email: emailSetting} = controlValidatorsSetting as ValidatorsSettingListInsideHandler

    /**
     * @description
     * Если новое значение подходит по типу
     */
    if (typeof newValue === "string" || typeof newValue === "number") {

        const isInputNumberValid = isNumberValid(newValue, numberRules),
              isInputNumberInvalid = !isInputNumberValid,
              isWrittenValueNotEmpty = !isWrittenValueEmpty(newValue),
              isInputTypeNumber = currentControl.type === 'number',
              errorData = {
                  message: null,
                  limit: null,
                  hideErrorTimeout: null,
                  showErrorTimeout: null,
                  showLiveErrorAfterFirstSubmit: null,
                  hasError: false,
                  shouldLockInput: false
              }

        /**
         * @description
         * Enable live validators only for filled input
         */
        if (isWrittenValueNotEmpty) {

            /**
             * Live validator for less value limit
             */
            if (isInputNumberValid && isLessThanLimit(newValue, minValueRules) && isLiveValidatorEnable(minValueSetting)) {
                errorHandler(errorData, {...minValueRules, ...minValueSetting})
            }

            /**
             * Live validator for greater limit
             */
            if (isInputNumberValid && isGreaterThanLimit(newValue, maxValueRules) && isLiveValidatorEnable(maxValueSetting)) {
                errorHandler(errorData, {...maxValueRules, ...maxValueSetting})
            }

            /**
             * Live validator for shorter limit
             */
            if (isShorterThanLimit(newValue, minLengthRules) && isLiveValidatorEnable(minLengthSetting)) {
                errorHandler(errorData, {...minLengthRules, ...minLengthSetting})
            }

            /**
             * Live validator for longer limit
             */
            if (isLongerThanLimit(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthSetting)) {
                errorHandler(errorData, {...maxLengthRules, ...maxLengthSetting})
            }

            /**
             * Live validator for valid email
             */
            if (emailRules && isMailInvalid(newValue) && isLiveValidatorEnable(emailSetting)) {
                errorHandler(errorData, {...emailRules, ...emailSetting})
            }

        }

        /**
         * Live validator for required field
         */
        if (requiredRules && isWrittenValueNotEmpty && isLiveValidatorEnable(requiredSetting)) {
            errorHandler(errorData, {...requiredRules, ...requiredSetting})
        }


        /**
         * Live validator for valid number
         */
        if (isInputTypeNumber && isInputNumberInvalid) {
            errorHandler(errorData, {...numberRules, ...numberSetting})
        }

    }

    // return {shouldLockInput, hasError, errorData}

}



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
          isInputNumberValid = true
              // inputNumberValidator(newValue, numberRules)
        ,
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