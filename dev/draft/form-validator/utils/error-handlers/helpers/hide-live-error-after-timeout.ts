import debounce from 'debounce-wrapper';

import { HookProps, SetFormProps } from '@common-types';
import { HideLiveErrorAfterTimeout } from './types';

/**
 * @description
 * Функция скрывающая ошибку у контрола
 *
 * @param {HookProps} hooksData - Данные хука
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 */
const hideLiveErrorHandler = (setForm: SetFormProps, hooksData: HookProps) => {
  setForm(form => {
    const { controlName, formIndex, controlIndex } = hooksData,
      currentControl = form.controls[controlName];

    currentControl.hasError = false;
  });
};

/**
 * @description
 * Функция вызывающая скрытие ошибки через таймаут
 *
 * @param {HookProps} hooksData - Данные хука
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 * @param {number} ms - время через которое нужно скрыть ошибку
 *
 * @returns {void}
 *
 */
export const hideLiveErrorAfterTimeout: HideLiveErrorAfterTimeout = (
  hooksData,
  setForm,
  ms,
) => {
  const callHideError = debounce(hideLiveErrorHandler, ms),
    timeoutId = callHideError(setForm, hooksData);

  return timeoutId;
};
