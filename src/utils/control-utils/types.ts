import {ControlProps, FormProps} from "@src/types";

export type GetControlFromForm = (form: FormProps, controlName: string | number, formIndex: number | null, controlIndex: number | null) => ControlProps
