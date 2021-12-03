import debounce from 'debounce-wrapper';

import { HookProps, SetForm } from '@common-types';
import { HideLiveErrorAfterTimeout } from './types';




/**
 * @description
 * Функция скрывающая ошибку у контрола
 *
 * @param {HookProps} hooksData - Данные хука
 * @param {SetForm} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 */
const hideLiveErrorHandler = (setForm: SetForm, hooksData: HookProps) => {
  setForm(form => {
    const { controlName } = hooksData,
      currentControl = form.controls[controlName];

    currentControl.hasError = false;
  });
};

export const hideError: HideLiveErrorAfterTimeout = (
    hooksData,
    setForm,
    ms,
) => {
  const callHideError = debounce(hideLiveErrorHandler, ms),
      timeoutId = callHideError(setForm, hooksData);

  return timeoutId;
};

//
// /**
//  * @description
//  * Функция вызывающая скрытие ошибки через таймаут
//  *
//  * @param {HookProps} hooksData - Данные хука
//  * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
//  * @param {number} ms - время через которое нужно скрыть ошибку
//  *
//  * @returns {void}
//  *
//  */
// export const hideLiveErrorAfterTimeout: HideLiveErrorAfterTimeout = (
//   hooksData,
//   setForm,
//   ms,
// ) => {
//   const callHideError = debounce(hideLiveErrorHandler, ms),
//     timeoutId = callHideError(setForm, hooksData);
//
//   return timeoutId;
// };
