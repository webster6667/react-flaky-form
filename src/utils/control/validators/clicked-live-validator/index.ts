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
    errorDataHandler(errorData, {
      ...requiredRules,
      ...requiredRules,
      hasError,
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
    errorDataHandler(errorData, {
      ...minValueRules,
      ...minValueRules,
      hasError,
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
    errorDataHandler(errorData, {
      ...maxValueRules,
      ...maxValueRules,
      hasError,
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
    errorDataHandler(errorData, {
      ...minLengthRules,
      ...minLengthRules,
      hasError,
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
    errorDataHandler(errorData, {
      ...maxLengthRules,
      ...maxLengthRules,
      hasError,
    });
  }

  return { errorData };
};
