import {
  FormProps,
  SetForm,
  CurrentControlData
} from '@common-types';

/**
 * Функция обработчик для каждого отдельного контрола
 */
export type ControlsCycleHandler = (

    /**
     * Данные текущего контрола
     */
    currentControlData: CurrentControlData,

    /**
     * Глобальный объект форм
     */
    form: FormProps,

    /**
     * Функция изменеия глобальныого объекта форм
     */
    setForm?: SetForm
) => boolean

export type ControlsCycle = (
  /**
   * Глобальный объект форм со всеми контролами
   */
  form: FormProps,

  /**
   * Функция которая будет запущена для каждого контрола
   */
  controlsCycleFunction: ControlsCycleHandler,

  /**
   * Функция изменеия глобальныого объекта форм
   */
  setForm: SetForm,
) => boolean;
