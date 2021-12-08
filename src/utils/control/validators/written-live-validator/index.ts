import {
  isGreaterThanLimit,
  isLessThanLimit,
  isLongerThanLimit,
  isMailInvalid,
  isNumberValid,
  isShorterThanLimit,
  isWrittenValueEmpty,
  errorDataHandler,
} from 'simple-input-validators';

import {
  LiveValidator,
  ValidatorErrorProps,
  HookProps,
  ValidatorsRulesListInsideValidator
} from '@common-types';

import { isLiveValidatorEnable } from '@validators/helpers/is-live-validator-enable';

/**
 * @description
 * Живой валидатор введенных данных в интуп
 *
 * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
 *
 * @returns {{ValidatorErrorProps}}
 *
 */
export const validateWrittenData: LiveValidator = hooksData => {
  /**
   * 1.Получить данные для работы (контрол через который будут проходить данные, вводимое значение, всю форму)
   * 2.Получить правила валидации(все валидаторы)
   * 3.Получить настройки валидаторов
   */
  const { currentControl, newValue } = hooksData,
    controlValidatorsRules = currentControl.validateRules as ValidatorsRulesListInsideValidator || {},
    {
      minValue: minValueRules,
      maxValue: maxValueRules,
      minLength: minLengthRules,
      maxLength: maxLengthRules,
      required: requiredRules,
      number: numberRules,
      email: emailRules,
    } = controlValidatorsRules,
    errorData: ValidatorErrorProps = {
      hasError: false,
      hasErrorLockingSubmitBtn: false,
      shouldLockNotValidWrite: false,
      message: null,
      limit: null,
      showLiveErrorAfterFirstSubmit: false,
      hideErrorTimeout: null,
      showErrorTimeout: null,
    };


  /**
   * @description
   * Если новое значение подходит по типу
   */
  if (typeof newValue === 'string' || typeof newValue === 'number') {
    
    
    
    const {dot = false, negative = false} = numberRules || {},
          isInputNumberValid = isNumberValid(newValue, {shouldLockFloatNumber: true, shouldLockNegativeNumber: false}),
          isInputNumberInvalid = !isInputNumberValid,
          isWrittenValueNotEmpty = !isWrittenValueEmpty(newValue),
          hasError = true;
    
    /**
     * @description
     * Enable live validators only for filled input
     */
    if (isWrittenValueNotEmpty) {
      /**
       * Live validator for less value limit
       */
      if (
        isInputNumberValid &&
        isLessThanLimit(newValue, minValueRules) &&
        isLiveValidatorEnable(minValueRules)
      ) {
        const hasErrorLockingSubmitBtn = minValueRules.shouldLockSubmitBtnWhenControlInvalid

        errorDataHandler(errorData, {
          ...minValueRules,
          hasErrorLockingSubmitBtn,
          hasError,
        });
      }

      /**
       * Live validator for greater limit
       */
      if (
        isInputNumberValid &&
        isGreaterThanLimit(newValue, maxValueRules) &&
        isLiveValidatorEnable(maxValueRules)
      ) {
        const hasErrorLockingSubmitBtn = maxValueRules.shouldLockSubmitBtnWhenControlInvalid

        errorDataHandler(errorData, {
          ...maxValueRules,
          hasErrorLockingSubmitBtn,
          hasError,
        });
      }

      /**
       * Live validator for shorter limit
       */
      if (
        isShorterThanLimit(newValue, minLengthRules) &&
        isLiveValidatorEnable(minLengthRules)
      ) {
        const hasErrorLockingSubmitBtn = minLengthRules.shouldLockSubmitBtnWhenControlInvalid

        errorDataHandler(errorData, {
          ...minLengthRules,
          hasErrorLockingSubmitBtn,
          hasError,
        });
      }

      /**
       * Live validator for longer limit
       */
      if (
        isLongerThanLimit(newValue, maxLengthRules) &&
        isLiveValidatorEnable(maxLengthRules)
      ) {
        const hasErrorLockingSubmitBtn = maxLengthRules.shouldLockSubmitBtnWhenControlInvalid

        errorDataHandler(errorData, {
          ...maxLengthRules,
          hasErrorLockingSubmitBtn,
          hasError,
        });
      }

      /**
       * Live validator for valid email
       */
      if (
        emailRules &&
        isMailInvalid(newValue) &&
        isLiveValidatorEnable(emailRules)
      ) {
        const hasErrorLockingSubmitBtn = emailRules.shouldLockSubmitBtnWhenControlInvalid

        errorDataHandler(errorData, {
          ...emailRules,
          hasErrorLockingSubmitBtn,
          hasError,
        });
      }
    }

    /**
     * Live validator for required field
     */
    if (
      requiredRules &&
      isWrittenValueEmpty(newValue) &&
      isLiveValidatorEnable(requiredRules)
    ) {
      const hasErrorLockingSubmitBtn = requiredRules.shouldLockSubmitBtnWhenControlInvalid

      errorDataHandler(errorData, {
        ...requiredRules,
        hasErrorLockingSubmitBtn,
        hasError,
      });
    }

    /**
     * Live validator for valid number
     */
    if (numberRules && isInputNumberInvalid) {
      const hasErrorLockingSubmitBtn = numberRules.shouldLockSubmitBtnWhenControlInvalid

      errorDataHandler(errorData, {
        ...numberRules,
        hasErrorLockingSubmitBtn,
        hasError,
      });
    }
  }


  return { errorData };
};
