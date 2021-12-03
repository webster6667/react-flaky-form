import { SetLiveValidatorResult } from './types';

import {
  LiveValidator,
  HookProps,
  ControlOutputDataProps,
} from './../../../../../types';

/**
 * @description
 * Записывает результат живого валидатора, в объект вывода данных контрола
 *
 * @param {LiveValidator} validator - Живой валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {ControlOutputDataProps} controlOutputData - Объект в котором хранятся данные вывода контрола
 *
 * @returns {void}
 */
export const setLiveValidatorResult: SetLiveValidatorResult = (
  validator,
  hookProps,
  controlOutputData,
) => {
  const { errorData = null, modifiedValueToWrite = null } =
      validator(hookProps),
    { shouldLockNotValidWrite = false, hasError = false } = errorData || {};

  if (shouldLockNotValidWrite) controlOutputData.isWriteInputEnable = false;

  /**
   * Отметить флаг что в контроле была хоть одна ошибка
   */
  if (hasError) controlOutputData.hasAnyError = true;

  /**
   * Если в валидаторе модифицировали вводимое значение, и вернули, записать в объект вывода
   */
  if (modifiedValueToWrite)
    controlOutputData.writeToControlValue = modifiedValueToWrite;

  /**
   * Записать настройки вывода ошибки в главный объект вывода
   */
  if (errorData) controlOutputData.errorDataForControl = errorData;
};
