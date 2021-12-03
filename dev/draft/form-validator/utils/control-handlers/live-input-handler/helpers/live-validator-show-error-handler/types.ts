import {
  ValidatorErrorProps,
  HookProps,
  FormProps,
  SetFormProps,
} from './../../../../../types';

/**
 * @description
 * Обработчик живых ошибок, отвечающий за выбор функции обработчика и контроль дебаунса
 */
export type LiveValidatorShowErrorHandler = (
  errorDataForControl: ValidatorErrorProps,
  hooksData: HookProps,
  form: FormProps,
  setForm: SetFormProps,
  prevShowErrorTimeoutId: null | ReturnType<typeof setTimeout>,
  ms: number,
) => null | ReturnType<typeof setTimeout>;
