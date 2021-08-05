import { ControlProps, FormProps, SubmitValidatorProps } from "./../types";
export declare const defaultBeforeSubmitValidator: SubmitValidatorProps;
export declare const validateControlBeforeSubmit: (control: ControlProps, controlName: string, form: FormProps, formIndex?: number | null, controlIndex?: number | null) => boolean;
