import {
  isWrittenValueEmpty,
  isLessThanLimit,
  isGreaterThanLimit,
  isShorterThanLimit,
  isLongerThanLimit,
  errorDataHandler,
} from 'simple-input-validators';
import getArraySum from 'get-array-sum';
import { isLiveValidatorEnable } from './../helpers/is-live-validator-enable';

import {
  LiveValidator,
  ValidatorErrorProps
} from '@common-types';

/**
 * @description
 * Живой валидатор кликабельных инпутов
 *
 * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
 *
 * @returns {{ValidatorErrorProps}}
 *
 */
export const validateClickedData: LiveValidator = hooksData => {
  const { currentControl, newValue } = hooksData,
    controlValidatorsRules = currentControl.validateRules || {},
    {
      required: requiredRules,
      minValue: minValueRules,
      maxValue: maxValueRules,
      minLength: minLengthRules,
      maxLength: maxLengthRules,
    } = controlValidatorsRules,
    errorData: ValidatorErrorProps = {
      hasError: false,
      hasErrorLockingSubmitBtn: false,
      shouldLockNotValidWrite: false,
      message: null,
      limit: null,
      showLiveErrorAfterFirstSubmit: null,
      hideErrorTimeout: null,
      showErrorTimeout: null,
    },
    newValueArraySum = Array.isArray(newValue) ? getArraySum(newValue) : null,
    shouldValidateArraySumValue = !isNaN(newValueArraySum),
    hasError = true;

  /**
   * Обязательное поле
   */
  if (
    requiredRules &&
    isWrittenValueEmpty(newValue) &&
    isLiveValidatorEnable(requiredRules)
  ) {
    const hasErrorLockingSubmitBtn = requiredRules.shouldLockSubmitBtnWhenControlInvalid

    errorDataHandler(errorData, {
      ...requiredRules,
      hasError,
      hasErrorLockingSubmitBtn
    });
  }

  /**
   * Минимальная сумма элементов
   */
  if (
    minValueRules &&
    shouldValidateArraySumValue &&
    isLessThanLimit(newValueArraySum, minValueRules) &&
    isLiveValidatorEnable(minValueRules)
  ) {

    const hasErrorLockingSubmitBtn = minValueRules.shouldLockSubmitBtnWhenControlInvalid

    errorDataHandler(errorData, {
      ...minValueRules,
      hasError,
      hasErrorLockingSubmitBtn
    });
  }

  /**
   * Максимальная сумма элементов
   */
  if (
    maxValueRules &&
    shouldValidateArraySumValue &&
    isGreaterThanLimit(newValueArraySum, maxValueRules) &&
    isLiveValidatorEnable(maxValueRules)
  ) {
    const hasErrorLockingSubmitBtn = maxValueRules.shouldLockSubmitBtnWhenControlInvalid


    errorDataHandler(errorData, {
      ...maxValueRules,
      hasError,
      hasErrorLockingSubmitBtn
    });
  }

  /**
   * Минимальное кол-во элементов
   */
  if (
    minLengthRules &&
    isShorterThanLimit(newValue, minLengthRules) &&
    isLiveValidatorEnable(minLengthRules)
  ) {
    const hasErrorLockingSubmitBtn = minLengthRules.shouldLockSubmitBtnWhenControlInvalid

    errorDataHandler(errorData, {
      ...minLengthRules,
      hasError,
      hasErrorLockingSubmitBtn
    });
  }

  /**
   * Максимальное кол-во элементов
   */
  if (
    maxLengthRules &&
    isLongerThanLimit(newValue, maxLengthRules) &&
    isLiveValidatorEnable(maxLengthRules)
  ) {
    const hasErrorLockingSubmitBtn = maxLengthRules.shouldLockSubmitBtnWhenControlInvalid


    errorDataHandler(errorData, {
      ...maxLengthRules,
      hasError,
      hasErrorLockingSubmitBtn
    });
  }

  return { errorData };
};
