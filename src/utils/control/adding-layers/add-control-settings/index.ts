import { FormProps, SetForm, CurrentControlData } from '@common-types';
import { AddControlSetting } from './types';

import {shouldLockingSubmitBtn} from '@control-handlers/should-locking-submit-btn'
import { addRequireControlFields } from './helpers/add-required-control-fields';

import { addControlHandler } from './helpers/add-control-handler';

// import { isControlLockSubmit } from './../submit-locking/is-control-lock-submit';

import { combineFormsWithControlsRulesLayers } from './helpers/combine-forms-with-controls-rules-layers';
import {addValidatorRulesToControl} from './helpers/add-validator-rules-to-control'


// import { maskWriteValue } from '@validators/mask-validator';

/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {CurrentControlData} currentControlData - Все данные по перебираемому контролу
 * @param {FormProps} form - главный объект формы
 * @param {SetForm} setForm - функция изменяющая главный объект формы
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
    addRequireControlFields(currentControlData);


    /**
     * Наложить все слои настроек валидатора для контрола
     */
    addValidatorRulesToControl(currentControl, form.formSettings.formValidatorsRules)
    // combineFormsWithControlsRulesLayers(currentControl, form);

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
    

     
    
    /**
     * Проверить при инициализации контрола, блокировать ли кнопку
     */
    const shouldLockSubmitBtn = shouldLockingSubmitBtn(currentControlData, form)

    
    currentControl.hasErrorLockingSubmitBtn = shouldLockSubmitBtn

    /**
     * Заблокировать кнопку если хоть один контрол блокирует
     */
    if (form.formState.isSubmitBtnLocked === false && shouldLockSubmitBtn) {
      form.formState.isSubmitBtnLocked = true
    }


    // form.formState.isSubmitBtnLocked = isControlLockSubmit(
    //   currentControlData,
    //   form,
    // );
  }

  return true;
};
