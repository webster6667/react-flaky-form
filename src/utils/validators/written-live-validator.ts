import {LiveValidator, ValidatorsSettingListInsideHandler} from "@common-types";
import {
    isGreaterThanLimit,
    isLessThanLimit, isLongerThanLimit, isMailInvalid,
    isNumberValid,
    isShorterThanLimit,
    isWrittenValueEmpty
} from "simple-input-validators";

import {isLiveValidatorEnable} from './helpers/is-live-validator-enable'

//@ts-ignore
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