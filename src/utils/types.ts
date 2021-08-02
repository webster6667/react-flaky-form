import {CurrentControlData, FormProps, SetFormProps, inputEvents} from "@common-types";

export type AddControlSetting = (currentControlData: CurrentControlData, form: FormProps, setForm: SetFormProps) => boolean

export type AddControlHandler = (newValue: string | number, controlName: string, controlIndex: number | null, formIndex: number | null, setForm: SetFormProps, eventType: typeof inputEvents, selectedValue: string | number | null) => void