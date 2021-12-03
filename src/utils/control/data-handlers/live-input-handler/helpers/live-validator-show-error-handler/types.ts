import {
  ValidatorErrorProps,
  HookProps,
  FormProps,
  SetForm,
} from '@common-types';

/**
 * @description
 * Обработчик живых ошибок, отвечающий за выбор функции обработчика и контроль дебаунса
 */
export type LiveValidatorShowErrorHandler = (
  errorDataForControl: ValidatorErrorProps,
  hooksData: HookProps,
  form: FormProps,
  setForm: SetForm,
  prevShowErrorTimeoutId: null | ReturnType<typeof setTimeout>,
  ms: number,
) => null | ReturnType<typeof setTimeout>;
