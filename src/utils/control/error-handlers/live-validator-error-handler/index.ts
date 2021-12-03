import { hideError } from '@error-handlers/helpers/hide-error';
import { replaceLayoutSymbols } from '@error-handlers/helpers/replace-layout-symbols';

import { HookProps, SetForm, FormProps } from '@common-types';
import { DefaultLiveErrorHandler } from './types';

/**
 * @description
 * Дефолтный обработчик живых ошибок(парсинг, отображение, скрытие)
 *
 * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
 * @param {HookProps} hooksData - Данные хука
 * @param {FormProps} form - Глобальный объект формы
 * @param {SetForm} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 *
 */
export const defaultLiveErrorHandler: DefaultLiveErrorHandler = (
  errorDataForControl,
  hooksData,
  form,
  setForm,
) => {
  const { controlName, newValue: writeToControlValue } = hooksData,
    currentControl = form.controls[controlName],
    { label: controlLabel } = currentControl,
    {
      message = null,
      limit = null,
      hideErrorTimeout = null,
    } = errorDataForControl || {},
    beforeError =
      currentControl.beforeLiveValidatorError ||
      form.formSettings.beforeLiveValidatorError ||
      null,
    afterError =
      currentControl.afterLiveValidatorError ||
      form.formSettings.afterLiveValidatorError ||
      null;

  /**
   * Хук перед всплытием ошибки
   */
  if (typeof beforeError === 'function') {
    beforeError(hooksData);
  }

  /**
   * Заменить шаблонные слова в тексте ошибки, на значения
   */
  if (errorDataForControl) {
    currentControl.error = replaceLayoutSymbols(message, {
      limit,
      controlLabel,
      writeToControlValue,
    });
  }

  /**
   * Отобразить ошибку
   */
  currentControl.hasError = true;

  /**
   * Скрыть ошибку через таймаут если его указали
   */
  if (hideErrorTimeout) {
    const hideErrorTimeoutId = hideError(
      hooksData,
      setForm,
      hideErrorTimeout,
    );

    currentControl._hideErrorTimeoutId = hideErrorTimeoutId;
  }

  /**
   * Хук после всплытием ошибки
   */
  if (typeof afterError === 'function') {
    afterError(hooksData);
  }
};
