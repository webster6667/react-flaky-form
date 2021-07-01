import {ControlProps, FormProps, SetFormProps, inputEvents} from "@common-types";

export type AddControlSetting = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null, controlIndex: number | null, setForm: SetFormProps) => boolean

export type AddControlHandler = (newValue: string | number, controlName: string, controlIndex: number | null, formIndex: number | null, setForm: SetFormProps, eventType: typeof inputEvents, selectedValue: string | number | null) => void