import {FormParamsProps, ControlProps, FormControls, FormProps, HookProps} from "@common-types";

export type GetRequireFormParams = (formParams?: FormParamsProps) => FormParamsProps

export type GetInitFormDataSingleControl = (currentControl: ControlProps, controlName: string) => {controlName: string, initFormData: FormProps}

export type GetInitFormDataDynamicControls = (controls: FormControls) => FormProps

export type getHookData = ({controlName, currentControl, newValue, form, controlIndex, formIndex, selectedValue}:HookProps) => HookProps