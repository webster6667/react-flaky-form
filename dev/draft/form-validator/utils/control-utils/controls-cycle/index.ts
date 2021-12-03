import {
  ControlsList,
  FormProps,
  SetFormProps,
  ControlsCycleHandler,
  CurrentControlData,
} from './../../../types';

import { ControlsCycle } from './types';

/**
 * @description
 * Функция проходящая циклом по всем контролам, применяя к ним переданную функцию
 *
 * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
 * Внутри функция можно получить доступ к каждому контролу
 * И изменить там что либо, или использовать как валидатор возвращая булевое значение
 * @param {ControlsList} formControls - Список контролов по которым пройдется функция
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 *
 */
export const controlsCycle: ControlsCycle = (
  form,
  controlsCycleHandler,
  setForm,
) => {
  const formControls = form.controls;

  let isAllControlsReturnTrue = true;

  /**
   * Перебор контролов одной формы
   */
  Object.keys(formControls).forEach(controlName => {
    const control = formControls[controlName];

    const currentControlData: CurrentControlData = {
        currentControl: control,
        controlName,
        formName: form.formSettings?.formName || '',
      },
      isControlReturnTrue = controlsCycleHandler(
        currentControlData,
        form,
        setForm,
      );

    if (isControlReturnTrue !== true) isAllControlsReturnTrue = false;
  });

  return isAllControlsReturnTrue;
};
