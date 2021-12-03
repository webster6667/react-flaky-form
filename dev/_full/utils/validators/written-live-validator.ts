import {LiveValidator, ValidatorsSettingListInsideHandler, ValidatorErrorProps, HookProps} from "@common-types";
import {
    isGreaterThanLimit,
    isLessThanLimit,
    isLongerThanLimit,
    isMailInvalid,
    isNumberValid,
    isShorterThanLimit,
    isWrittenValueEmpty,
    errorDataHandler
} from "simple-input-validators";

import {isLiveValidatorEnable} from './helpers/is-live-validator-enable'

/**
 * @description
 * Живой валидатор введенных данных в интуп
 *
 * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
 *
 * @returns {{ValidatorErrorProps}}
 *
 */
export const validateWrittenData:LiveValidator = (hooksData) => {

    /**
     * 1.Получить данные для работы (контрол через который будут проходить данные, вводимое значение, всю форму)
     * 2.Получить правила валидации(все валидаторы)
     * 3.Получить настройки валидаторов
     */
    const {currentControl, newValue} = hooksData,
          controlValidatorsRules = currentControl.validateRules || {},
          controlValidatorsSetting = currentControl.validatorsSetting || {},
          {minValue: minValueRules, maxValue: maxValueRules, minLength: minLengthRules, maxLength: maxLengthRules, required: requiredRules, number: numberRules, email: emailRules} = controlValidatorsRules,
          {minValue: minValueSetting, maxValue: maxValueSetting, minLength: minLengthSetting, maxLength: maxLengthSetting, required: requiredSetting, number: numberSetting, email: emailSetting} = controlValidatorsSetting as ValidatorsSettingListInsideHandler,
          errorData: ValidatorErrorProps  = {
              hasError: false,
              shouldLockNotValidWrite: false,
              message: null,
              limit: null,
              showLiveErrorAfterFirstSubmit: false,
              hideErrorTimeout: null,
              showErrorTimeout: null,
          }

    /**
     * @description
     * Если новое значение подходит по типу
     */
    if (typeof newValue === "string" || typeof newValue === "number") {

        const isInputNumberValid = isNumberValid(newValue, numberRules),
              isInputNumberInvalid = !isInputNumberValid,
              isWrittenValueNotEmpty = !isWrittenValueEmpty(newValue),
              hasError = true

        /**
         * @description
         * Enable live validators only for filled input
         */
        if (isWrittenValueNotEmpty) {

            /**
             * Live validator for less value limit
             */
            if (isInputNumberValid && isLessThanLimit(newValue, minValueRules) && isLiveValidatorEnable(minValueSetting)) {
                errorDataHandler(errorData, {...minValueRules, ...minValueSetting, hasError})
            }

            /**
             * Live validator for greater limit
             */
            if (isInputNumberValid && isGreaterThanLimit(newValue, maxValueRules) && isLiveValidatorEnable(maxValueSetting)) {
                errorDataHandler(errorData, {...maxValueRules, ...maxValueSetting, hasError})
            }

            /**
             * Live validator for shorter limit
             */
            if (isShorterThanLimit(newValue, minLengthRules) && isLiveValidatorEnable(minLengthSetting)) {
                errorDataHandler(errorData, {...minLengthRules, ...minLengthSetting, hasError})
            }

            /**
             * Live validator for longer limit
             */
            if (isLongerThanLimit(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthSetting)) {
                errorDataHandler(errorData, {...maxLengthRules, ...maxLengthSetting, hasError})
            }

            /**
             * Live validator for valid email
             */
            if (emailRules && isMailInvalid(newValue) && isLiveValidatorEnable(emailSetting)) {
                errorDataHandler(errorData, {...emailRules, ...emailSetting, hasError})
            }

        }

        /**
         * Live validator for required field
         */
        if (requiredRules && isWrittenValueEmpty(newValue) && isLiveValidatorEnable(requiredSetting)) {
            errorDataHandler(errorData, {...requiredRules, ...requiredSetting, hasError})
        }


        /**
         * Live validator for valid number
         */
        if (numberRules && isInputNumberInvalid) {
            errorDataHandler(errorData, {...numberRules, ...numberSetting, hasError})
        }

    }

    return {errorData}

}