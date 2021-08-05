import { ControlProps, FormProps, HookProps } from "../types";
export declare const defaultLockSubmitBtnValidator: (hookData: HookProps) => boolean;
export declare const isControlBtnSubmitValidationSuccess: (control: ControlProps, controlName: string, form: FormProps, formIndex?: number | null, controlIndex?: number | null) => boolean;
export declare const toggleSubmitBtnLockRelativeLockValidatorError: (form: FormProps) => void;
