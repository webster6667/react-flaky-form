import {FormProps, HookProps, SetFormProps} from "@common-types";

export type HideLiveErrorAfterTimeout = (hooksData: HookProps, setForm: SetFormProps, ms: number) => ReturnType<typeof setTimeout>

export type LayoutSymbolsValues = {
    limit: number,
    controlLabel: string,
    writeToControlValue: string | number | any[]
}

export type ReplaceLayoutSymbols = (message: string, layoutSymbolsValues: LayoutSymbolsValues) => string

export type SetControlErrorToFormErrorList = (message: string, form: FormProps, hooksData: HookProps) => void