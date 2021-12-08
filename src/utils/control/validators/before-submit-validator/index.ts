import {
    isGreaterThanLimit,
    isLessThanLimit,
    isLongerThanLimit,
    isMailInvalid,
    isNumberValid,
    isShorterThanLimit,
    isWrittenValueEmpty,
} from "simple-input-validators";

import {StaticValidatorErrorHandler as errorDataHandler} from './helpers/static-validator-error-handler'

import {StaticValidator, ValidatorErrorProps, ValidatorsSettingListInsideHandler} from "@common-types";


export const defaultBeforeSubmitValidator:StaticValidator = (hooksData) => {

    /**
     * 1.Получить данные для работы (контрол через который будут проходить данные, вводимое значение, всю форму)
     * 2.Получить правила валидации(все валидаторы)
     * 3.Получить настройки валидаторов
     */
    const {currentControl} = hooksData,
          {value} = currentControl,
          controlValidatorsRules = currentControl.validateRules || {},
          controlValidatorsSetting = currentControl.validatorsSetting || {},
          {minValue: minValueRules, maxValue: maxValueRules, minLength: minLengthRules, maxLength: maxLengthRules, required: requiredRules, number: numberRules, email: emailRules} = controlValidatorsRules,
          {minValue: minValueSetting, maxValue: maxValueSetting, minLength: minLengthSetting, maxLength: maxLengthSetting, required: requiredSetting, number: numberSetting, email: emailSetting} = controlValidatorsSetting as ValidatorsSettingListInsideHandler,
          errorData: ValidatorErrorProps = {
              hasError: false,
              shouldLockNotValidWrite: false,
              message: null,
              limit: null,
              showLiveErrorAfterFirstSubmit: false,
              hideErrorTimeout: null,
              shouldLockSubmitBtnWhenControlInvalid: false,
              shouldLockSubmitBtn: false,
          }

    /**
     * @description
     * Если новое значение подходит по типу
     */
    if (typeof value === "string" || typeof value === "number") {

        const isInputNumberValid = isNumberValid(value, numberRules),
              isInputNumberInvalid = !isInputNumberValid,
              isWrittenValueNotEmpty = !isWrittenValueEmpty(value)

        /**
         * @description
         * Enable validators only for filled input
         */
        if (isWrittenValueNotEmpty) {

            /**
             * Validator for less value limit
             */
            if (isInputNumberValid && isLessThanLimit(value, minValueRules)) {
                errorDataHandler(errorData, {...minValueRules, ...minValueSetting})
            }

            /**
             * Validator for greater limit
             */
            if (isInputNumberValid && isGreaterThanLimit(value, maxValueRules)) {
                errorDataHandler(errorData, {...maxValueRules, ...maxValueSetting})
            }

            /**
             *Validator for shorter limit
             */
            if (isShorterThanLimit(value, minLengthRules)) {
                errorDataHandler(errorData, {...minLengthRules, ...minLengthSetting})
            }

            /**
             * Validator for longer limit
             */
            if (isLongerThanLimit(value, maxLengthRules)) {
                errorDataHandler(errorData, {...maxLengthRules, ...maxLengthSetting})
            }

            /**
             * Validator for valid email
             */
            if (emailRules && isMailInvalid(value)) {
                errorDataHandler(errorData, {...emailRules, ...emailSetting})
            }

        }

        /**
         * Validator for required field
         */
        if (requiredRules && isWrittenValueEmpty(value)) {
            errorDataHandler(errorData, {...requiredRules, ...requiredSetting})
        }


        /**
         * Validator for valid number
         */
        if (numberRules && isInputNumberInvalid) {
            errorDataHandler(errorData, {...numberRules, ...numberSetting})
        }

    }

    return errorData
}