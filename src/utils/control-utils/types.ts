import {ControlProps, FormProps, HookProps} from "@src/types";

export type ControlIdsProps = {
    controlIndex: number | null,
    formIndex: number | null,
    controlName: string | number | null,
    [key: string]: any
}

export type GetControlFromForm = (form: FormProps, controlName: string | number, formIndex: number | null, controlIndex: number | null) => ControlProps

export type GetControlTimerName = (controlIdsProps: ControlIdsProps, timerActionName: string) => string

export type IsMulti = (index: number | null) => boolean