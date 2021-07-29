import {
    isWrittenValueEmpty,
    isLessThanLimit,
    isGreaterThanLimit,
    isShorterThanLimit,
    isLongerThanLimit,
    errorDataHandler
} from "simple-input-validators";
import getArraySum from 'get-array-sum';
import {isLiveValidatorEnable} from './helpers/is-live-validator-enable'


import {
    LiveValidator,
    ValidatorErrorProps,
    ValidatorsSettingListInsideHandler
} from "@src/types";

/**
 * @description
 * Живой валидатор кликабельных инпутов
 *
 * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
 *
 * @returns {{ValidatorErrorProps}}
 *
 */
export const validateClickedData:LiveValidator = (hooksData) => {
    const {currentControl, newValue} = hooksData,
          controlValidatorsSetting = currentControl.validatorsSetting || {},
          controlValidatorsRules = currentControl.validateRules || {},
          {required: requiredRules, minValue: minValueRules, maxValue: maxValueRules, minLength: minLengthRules, maxLength: maxLengthRules} = controlValidatorsRules,
          {required: requiredSetting, minValue: minValueSetting, maxValue: maxValueSetting, minLength: minLengthSetting, maxLength: maxLengthSetting} = controlValidatorsSetting as ValidatorsSettingListInsideHandler,
          errorData: ValidatorErrorProps  = {
              hasError: false,
              shouldLockNotValidWrite: false,
              message: null,
              limit: null,
              showLiveErrorAfterFirstSubmit: null,
              hideErrorTimeout: null,
              showErrorTimeout: null,
          },
          newValueArraySum = Array.isArray(newValue) ? getArraySum(newValue) : null,
          shouldValidateArraySumValue = !isNaN(newValueArraySum),
          hasError = true

    /**
     * Обязательное поле
     */
    if (requiredRules && isWrittenValueEmpty(newValue) && isLiveValidatorEnable(requiredSetting)) {
        errorDataHandler(errorData, {...requiredRules, ...requiredSetting, hasError})
    }


    /**
     * Минимальная сумма элементов
     */
    if (minValueRules && shouldValidateArraySumValue && isLessThanLimit(newValueArraySum, minValueRules) && isLiveValidatorEnable(minValueSetting)) {
        errorDataHandler(errorData, {...minValueRules, ...minValueSetting, hasError})
    }

    /**
     * Максимальная сумма элементов
     */
    if (maxValueRules && shouldValidateArraySumValue && isGreaterThanLimit(newValueArraySum, maxValueRules) && isLiveValidatorEnable(maxValueSetting)) {
        errorDataHandler(errorData, {...maxValueRules, ...maxValueSetting, hasError})
    }

    /**
     * Минимальное кол-во элементов
     */
    if (minLengthRules && isShorterThanLimit(newValue, minLengthRules) && isLiveValidatorEnable(minLengthSetting)) {
        errorDataHandler(errorData, {...minLengthRules, ...minLengthSetting, hasError})
    }

    /**
     * Максимальное кол-во элементов
     */
    if (maxLengthRules && isLongerThanLimit(newValue, maxLengthRules) && isLiveValidatorEnable(maxLengthSetting)) {
        errorDataHandler(errorData, {...maxLengthRules, ...maxLengthSetting, hasError})
    }

    return {errorData}
}