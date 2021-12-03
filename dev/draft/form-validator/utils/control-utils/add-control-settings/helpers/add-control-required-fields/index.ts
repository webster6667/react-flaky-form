import { CurrentControlData } from './../../../../../types';
import { AddRequireFields } from './types';

/**
 * @description
 * Добавить обязательные поля для функционирования контролов
 *
 * @param {CurrentControlData} singleControlData - Все данные переданного контрола
 *
 * @returns {void}
 */
export const addRequireFields: AddRequireFields = singleControlData => {
  const { currentControl: control, controlName, formName } = singleControlData,
    isSelectInput = control.type === 'select';

  control.error = '';
  control.hasError = false;

  control.controlName = controlName;
  control.inputName = `${formName}[${controlName}]`;

  /**
   * Добавить поле value если оно было пустым
   */
  if (!control.value) control.value = '';

  /**
   * Обязательные поля селект инпутов
   */
  // if (isSelectInput) {
  //
  //     /**
  //      * Обязательное isMultiply
  //      */
  //     control.isMultiple = control.isMultiple === true
  //
  //     let {options, value, selectPlaceholder} = control,
  //         hasSelectedValue = Array.isArray(value) ? value.length > 0: Boolean(value),
  //         isSingletonSelectHasEmptyActiveItem = options.length && !selectPlaceholder && control.isMultiple === false && !hasSelectedValue
  //
  //     /**
  //      * Если не определенно активное поле или плейсхолдер, сделать активным первое значение по дефолту
  //      */
  //     if (isSingletonSelectHasEmptyActiveItem) {
  //         control.value = options[0].value
  //     }
  //
  // }
};
