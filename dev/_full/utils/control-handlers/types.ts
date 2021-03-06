import {
    ControlProps,
    CurrentControlData,
    FormProps,
    HookProps,
    inputEvents,
    SetFormProps,
    ValidatorErrorProps
} from "@common-types";

/**
 * @description
 * Обработчик всех видов входных данных при вводе
 */
export type LiveInputHandler = (currentControl: ControlProps, form: FormProps, hooksData: HookProps, eventType: typeof inputEvents, setForm:SetFormProps) => void

/**
 * @description
 * Обработчик живых ошибок, отвечающий за выбор функции обработчика и контроль дебаунса
 */
export type LiveValidatorShowErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, form: FormProps, setForm: SetFormProps, prevShowErrorTimeoutId: null | ReturnType<typeof setTimeout>, ms: number) => null | ReturnType<typeof setTimeout>

/**
 * @description
 * Обработчик всех контролов перед отправкой на сервер
 */
export type ControlsHandlerBeforeSubmit = (currentControlData: CurrentControlData, form: FormProps) => boolean

export type ShouldLockSubmitBtnByControl = (currentControlData: CurrentControlData, form: FormProps) => boolean

export type ShouldLockSubmitBtnByForm = (form: FormProps) => boolean

export type LockSubmitBtnErrorData = {shouldLockSubmitBtn: boolean}

export type BeforeSubmitErrorData = {
    isControlBeforeSubmitValidationSuccess: boolean,
    errorDataForControl: ValidatorErrorProps,
    hasControlError: boolean
}