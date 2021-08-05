import { ControlProps, ControlsProps } from "./../types";
export declare const addFormExample: (setForm: any) => void;
export declare const removeFormByIndex: (formIndex: number | null, setForm: any) => void;
export declare const addControlExample: (setForm: any, controlName: string, formIndex?: null | number) => void;
export declare const removeControlFromListByIndex: (setForm: any, controlName: string, formIndex: number | null, controlIndex: number) => void;
export declare const addNewControlToControlList: (setForm: any, controlName: string, formIndex: null | number, newControlLayout: ControlProps) => void;
export declare const addNewControlToForm: (setForm: any, controlName: string, newFormControl: ControlProps | ControlProps[], formIndex?: null | number) => void;
export declare const removeControlFromForm: (setForm: any, controlName: string, formIndex?: number | null) => void;
export declare const addNewForm: (setForm: any, addedNewForm: ControlsProps) => void;
