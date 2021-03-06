import { liveInputHandler } from '@control-handlers/live-input-handler';
// import { shouldLockingSubmitBtn } from '@control-handlers/should-locking-submit-btn';

import {HookProps, inputEvents, SetForm, FormProps, CurrentControlData} from '@common-types';

import { AddControlHandler } from './types';
import {controlsCycle} from "@control-utils/controls-cycle";
import {addControlSetting} from "@control-utils/adding-layers/add-control-settings";

/**
 * @description
 * Функция добавить обработку входных данных, для всех типов контролов,
 * Обработчики работают для всех типов контролов, даже если их типы меняются динамически
 *
 * @param {string | number} newValue - Новое значение которое выбирают или вводят
 * @param {string} controlName - Имя контрола (username or password)
 * @param {SetForm} setForm - Функция изменяющая главный объект формы
 * @param {typeof inputEvents} eventType - Тип события который произошел на контроле
 * @param {string | number} selectedValue - Выбранное значение если это кликабильный контрол
 *
 * @returns {void}
 */
export const addControlHandler: AddControlHandler = (
  newValue,
  controlName,
  setForm,
  eventType = null,
  selectedValue,
) => {
  //@todo: async/await хуки, добавить снаружи от setForm, и все сделать async

  setForm(prevForm => {
    const form = {...prevForm};

    /**
     * 1.Получить контрол на который будет повешен обработчик
     * 2.Собрать все данные для хуков обработчика
     */
    const currentControl = form.controls[controlName],
          hookData = {
            currentControl,
            controlName,
            newValue,
            form,
            selectedValue,
          };
    
    
    /**
     * Получить хуки контрола
     */
    const beforeChange = currentControl.beforeChange || null,
          afterChange = currentControl.afterChange || null;

    /**
     * @description
     * Хук срабатывающий до изменения значения инпута
     * В нем можно менять весь объект формы, но исходящие данные из инпута и ошибки
     * Будут перезатерты после изменения значения инпута
     */
    if (typeof beforeChange === 'function') {
      beforeChange(hookData);
    }


    /**
     * @description
     * Функция изменения значения(валидация, запись ошибок, запись значения, блокировка записи)
     */
    liveInputHandler(currentControl, form, hookData, eventType, setForm);
    
    /**
     * @description
     * Хук срабатывающий после изменения значения инпута
     * В нем можно менять весь объект формы, а так же введенные значения и ошибки
     */
    if (typeof afterChange === 'function') {
      afterChange(hookData);
    }


    
    /**
     * После каждого ввода проверять по всем контролам формы(так как текущий контрол может влиять на другие)
     * Блокировать ли кнопку отправки
     */
    let shouldLockSubmitBtn = false,
        formControls = form.controls

      /**
       * Перебор контролов
       */
      Object.keys(formControls).forEach(controlName => {
          const control = formControls[controlName];


          if (control.hasErrorLockingSubmitBtn) shouldLockSubmitBtn = true;
      });

    form.formState.isSubmitBtnLocked = shouldLockSubmitBtn;


    return form;
  });
};
