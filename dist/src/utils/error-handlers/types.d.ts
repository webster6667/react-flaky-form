import { ValidatorErrorProps, HookProps, SetFormProps } from "@common-types";
/**
 * @description
 * Дефолтный обработчик живых ошибок
 */
export declare type DefaultLiveErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, setForm: SetFormProps) => void;
/**
 * @description
 * Дефолтный обработчик ошибок после валидации перед отправкой данных на сервер
 */
export declare type DefaultBeforeSubmitValidatorErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps) => void;
