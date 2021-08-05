import { AxiosResponse } from "axios";
import { CurrentControlData, FormProps, SetFormProps, inputEvents, FormConfigProps, FormParamsProps } from "@common-types";
export declare type AddControlSetting = (currentControlData: CurrentControlData, form: FormProps, setForm: SetFormProps) => boolean;
export declare type AddControlHandler = (newValue: string | number, controlName: string, controlIndex: number | null, formIndex: number | null, setForm: SetFormProps, eventType: typeof inputEvents, selectedValue: string | number | null) => void;
/**
 * Инициализация формы
 */
export declare type InitFlukyForm = (form: FormProps, apiResponse: AxiosResponse, formConfig: FormConfigProps, formParams: FormParamsProps, setForm: SetFormProps) => void;
/**
 * Обработчик отправки формы на сервер
 */
export declare type SubmitFlukyFormHandler = (setForm: SetFormProps) => void;
export declare type ToggleSubmitBtnLockRelativeLockValidatorError = (form: FormProps) => void;
export declare type AddFormExample = (setForm: SetFormProps) => void;
export declare type RemoveFormByIndex = (formIndex: number | null, setForm: SetFormProps) => void;
