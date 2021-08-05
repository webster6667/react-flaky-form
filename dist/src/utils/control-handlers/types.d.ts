import { ControlProps, CurrentControlData, FormProps, HookProps, inputEvents, SetFormProps, ValidatorErrorProps } from "@common-types";
/**
 * @description
 * Обработчик всех видов входных данных при вводе
 */
export declare type LiveInputHandler = (currentControl: ControlProps, form: FormProps, hooksData: HookProps, eventType: typeof inputEvents, setForm: SetFormProps) => void;
/**
 * @description
 * Обработчик живых ошибок, отвечающий за выбор функции обработчика и контроль дебаунса
 */
export declare type LiveValidatorShowErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, form: FormProps, setForm: SetFormProps, prevShowErrorTimeoutId: null | ReturnType<typeof setTimeout>, ms: number) => null | ReturnType<typeof setTimeout>;
/**
 * @description
 * Обработчик всех контролов перед отправкой на сервер
 */
export declare type ControlsHandlerBeforeSubmit = (currentControlData: CurrentControlData, form: FormProps) => boolean;
export declare type ShouldLockSubmitBtnByControl = (currentControlData: CurrentControlData, form: FormProps) => boolean;
export declare type ShouldLockSubmitBtnByForm = (form: FormProps) => boolean;
export declare type LockSubmitBtnErrorData = {
    shouldLockSubmitBtn: boolean;
};
export declare type BeforeSubmitErrorData = {
    isControlBeforeSubmitValidationSuccess: boolean;
    errorDataForControl: ValidatorErrorProps;
    hasControlError: boolean;
};
