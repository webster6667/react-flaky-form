import {FormParamsProps, ControlProps, FormProps, HookProps, ControlsProps} from "@common-types";

export type GetRequireFormParams = (formParamsProps?: Partial<FormParamsProps>) => FormParamsProps

export type GetInitFormDataSingleControl = (currentControl: ControlProps, controlName?: string) => {controlName: string, initFormData: FormProps}

export type GetInitFormDataDynamicControls = <T extends ControlsProps[] | ControlsProps>(controls: T) => FormProps<T>

export type GetHookData = ({controlName, currentControl, newValue, form, controlIndex, formIndex, selectedValue}:Partial<HookProps>) => HookProps