import {
  ControlsCycleHandler,
  FormProps,
  SetFormProps,
} from '@packages/form-validator/types';

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
  setForm: SetFormProps,
) => boolean;
