import axios, { AxiosResponse } from 'axios';

import { controlsCycle } from '@control-utils/controls-cycle';
import { addControlSetting } from '@control-utils/adding-layers/add-control-settings';

import { FormConfigProps, FormProps, SetForm } from '@common-types';

import { InitForm } from './types';
import { AddControlSetting } from '@control-utils/adding-layers/add-control-settings/types';


/**
 * @description
 * 1.Подгрузка данных с бекенда(валидаторы, данные)
 * 2.Применение описанных конфигов ко всем контролам
 *
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {AxiosResponse} apiResponse - Ответ от API(валидаторы, данные)
 * @param {FormConfigProps} formConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @param {SetForm} setForm - функция изменяющая главный объект формы
 */
export const initForm: InitForm = (form, formConfig, setForm) => {
  //Добавить значения и валидаторы с бека
  // initActiveValues(apiResponse, form.controls)

  /**
   * @description
   * Заинитить настройки для каждого контрола
   *
   * @param {FormProps} form - Главная форма содержащая все контролы
   * @param {AddControlSetting} addControlSetting - функция принимающая данный, функция которая добирается до каждого контрола
   * @param {SetForm} setForm - функция изменяющая главный объект формы
   */
  controlsCycle(form, addControlSetting, setForm);
};
