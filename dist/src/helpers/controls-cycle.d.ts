import { ControlProps, ControlsProps, FormProps, SetFormProps } from "../types";
export declare const controlsCycle: (controlsCycleFunction: (control: ControlProps, controlName: string, form: FormProps, formIndex?: number | null, controlIndex?: number | null, setForm?: SetFormProps) => boolean, formControls: ControlsProps | ControlsProps[], form: FormProps, formIndex?: number | null, setForm?: SetFormProps) => boolean;
export declare const formCycle: (form: FormProps, controlsCycleFunction: any, setForm?: SetFormProps) => boolean;
