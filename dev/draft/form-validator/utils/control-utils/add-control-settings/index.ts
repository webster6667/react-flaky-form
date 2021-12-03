import { FormProps, SetFormProps, CurrentControlData } from './../../../types';
import { AddControlSetting } from './types';

import { addRequireFields } from './helpers/add-control-required-fields';

import { addControlHandler } from './helpers/add-control-handler';

import { isControlLockSubmit } from './../submit-locking/is-control-lock-submit';

import { addValidatorsSettingsLayerToSingleControl } from './../../add-validators-settings-layers';

// import { maskWriteValue } from '@validators/mask-validator';

/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {CurrentControlData} currentControlData - Все данные по перебираемому контролу
 * @param {FormProps} form - главный объект формы
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean}
 */
export const addControlSetting: AddControlSetting = (
  currentControlData,
  form,
  setForm,
) => {
  const { currentControl, controlName } = currentControlData,
    // inputMask = currentControl.maskSetting || null,
    // hasMask = inputMask,
    { type = null, value } = currentControl;

  if (!type) {
    console.error(`type is require control prop`);
  } else {
    /**
     * Добавить обязательные поля
     */
    addRequireFields(currentControlData);

    /**
     * Наложить все слои настроек валидатора для контрола
     */
    addValidatorsSettingsLayerToSingleControl(currentControl, form);

    /**
     * Обработчик входных данных
     */
    currentControl.setValue = (
      newValue = '',
      eventType = null,
      selectedValue = null,
    ) =>
      addControlHandler(
        newValue,
        controlName,
        setForm,
        eventType,
        selectedValue,
      );

    console.log('блок', isControlLockSubmit(currentControlData, form));

    /**
     * Проверить при инициализации контрола, блокировать ли кнопку
     */
    form.formState.isSubmitBtnLocked = isControlLockSubmit(
      currentControlData,
      form,
    );
  }

  return true;
};
