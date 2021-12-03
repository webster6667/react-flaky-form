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
    controlValidatorsRules = currentControl.validateRules || {},
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
          isInputNumberValid = isNumberValid(newValue, {shouldLockFloatNumber: !dot, shouldLockNegativeNumber: !negative}),
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
        errorDataHandler(errorData, {
          ...minValueRules,
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
        errorDataHandler(errorData, {
          ...maxValueRules,
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
        errorDataHandler(errorData, {
          ...minLengthRules,
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
        errorDataHandler(errorData, {
          ...maxLengthRules,
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
        errorDataHandler(errorData, {
          ...emailRules,
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
      errorDataHandler(errorData, {
        ...requiredRules,
        ...requiredRules,
        hasError,
      });
    }

    /**
     * Live validator for valid number
     */
    if (numberRules && isInputNumberInvalid) {
      errorDataHandler(errorData, {
        ...numberRules,
        ...numberRules,
        hasError,
      });
    }
  }

  return { errorData };
};
