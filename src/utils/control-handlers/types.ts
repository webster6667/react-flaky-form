import {ControlProps, FormProps, HookProps, inputEvents, SetFormProps, ValidatorErrorProps} from "@common-types";

/**
 * @description
 * Обработчик всех видов входных данных при вводе
 */
export type LiveInputHandler = (currentControl: ControlProps, form: FormProps, hooksData: HookProps, eventType: typeof inputEvents, setForm:SetFormProps) => void

/**
 * @description
 * Обработчик живых ошибок, отвечающий за выбор функции обработчика и контроль дебаунса
 */
export type LiveValidatorShowErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, form: FormProps, setForm: SetFormProps, timer: number, ms: number) => void