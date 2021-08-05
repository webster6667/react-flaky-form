import { ControlProps, FormProps } from "@src/types";
export declare type ControlIdsProps = {
    controlIndex: number | null;
    formIndex: number | null;
    controlName: string | number | null;
    [key: string]: any;
};
export declare type GetControlFromForm = (form: FormProps, controlName: string | number, formIndex: number | null, controlIndex: number | null) => ControlProps;
export declare type GetControlTimerName = (controlIdsProps: ControlIdsProps, timerActionName: string) => string;
export declare type IsMulti = (index: number | null) => boolean;
