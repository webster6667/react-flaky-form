import { StaticValidator, HookProps } from './../../../../../../types';
import { SetLockSubmitBtnValidatorResult } from './types';

/**
 * @description
 * Записывает результат валидаора на блокировку кнопки отправки
 *
 * @param {StaticValidator} validator - Валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {boolean} shouldLockSubmitBtn - Объект в котором хранятся свойство блокировать или не блокировать кнопку
 * @param {boolean} shouldCheckValidatorSettings - Проверять необходимость блокировать ли кнопку отправки, по дополнительному полю shouldLockSubmitBtnWhenControlInvalid в настройкам rules
 *
 * @returns {void}
 */
export const setLockSubmitBtnValidatorResult: SetLockSubmitBtnValidatorResult =
  (
    validator,
    hookData,
    // shouldLockSubmitBtn,
    //shouldCheckValidatorSettings = false,
  ) => {
    const {
      hasError = false,
      shouldLockSubmitBtn: isControlLockSubmitBtn = false,
    } = validator(hookData);

    // if (hasError) {
    //   // if (shouldCheckValidatorSettings && shouldLockSubmitBtn) {
    //   //   errorData.shouldLockSubmitBtn = true;
    //   // } else if (shouldCheckValidatorSettings !== true) {
    //   //   errorData.shouldLockSubmitBtn = true;
    //   // }
    // }
  };
