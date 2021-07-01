import {ControlProps, FormProps, HookProps, inputEvents, SetFormProps} from "@common-types";

/**
 * @description
 * Обработчик всех видов входных данных при вводе
 */
export type LiveInputHandler = (currentControl: ControlProps, form: FormProps, hooksData: HookProps, eventType: typeof inputEvents, setForm:SetFormProps) => void
