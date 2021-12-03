import { IsControlLockSubmit } from './types';

import { setLockSubmitBtnValidatorResult } from './heplers/set-lock-submit-validator-result';

/**
 * @description
 * Функция проходит через данные контрола, и на их основании определяет блокировать ли кнопку ввода
 *
 * @param {CurrentControlData} currentControlData - Все данные по переданному контролу
 * @param {FormProps} form - главный объект формы
 *
 * @returns {boolean}
 *
 */
export const isControlLockSubmit: IsControlLockSubmit = (
  currentControlData,
  form,
) => {
  const { currentControl } = currentControlData,
    hookData = {
      ...currentControlData,
      newValue: currentControl.value,
      selectedValue: null,
      form,
    },
    lockSubmitValidator = currentControl.customLockSubmitBtnValidator,
    additionalLockSubmitBtnValidator =
      currentControl.additionalLockSubmitBtnValidator,
    hasLockSubmitBtnValidator = typeof lockSubmitValidator === 'function',
    hasAdditionalLockSubmitBtnValidator =
      typeof additionalLockSubmitBtnValidator === 'function';

  let shouldLockSubmitBtn = false;

  /**
   * Запуск валидатора по правилам
   */
  if (
    hasLockSubmitBtnValidator &&
    lockSubmitValidator(hookData).hasError === true
  ) {
    shouldLockSubmitBtn = true;
    // setLockSubmitBtnValidatorResult(lockSubmitValidator, hookData);
  }

  /**
   * Запуск дополнительного валидатора
   */
  if (
    hasAdditionalLockSubmitBtnValidator &&
    additionalLockSubmitBtnValidator(hookData).hasError === true
  ) {
    shouldLockSubmitBtn = true;
    // setLockSubmitBtnValidatorResult(additionalLockSubmitBtnValidator, hookData);
  }

  return shouldLockSubmitBtn;
};
