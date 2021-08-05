import { FormProps, HookProps, SetFormProps } from "@common-types";
export declare type HideLiveErrorAfterTimeout = (hooksData: HookProps, setForm: SetFormProps, ms: number) => ReturnType<typeof setTimeout>;
export declare type LayoutSymbolsValues = {
    limit: number;
    controlLabel: string;
    writeToControlValue: string | number | any[];
};
export declare type ReplaceLayoutSymbols = (message: string, layoutSymbolsValues: LayoutSymbolsValues) => string;
export declare type SetControlErrorToFormErrorList = (message: string, form: FormProps, hooksData: HookProps) => void;
