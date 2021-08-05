import { FormParamsProps, ControlProps, FormProps, HookProps, ControlsProps } from "@common-types";
export declare type GetRequireFormParams = (formParamsProps?: Partial<FormParamsProps>) => FormParamsProps;
export declare type GetInitFormDataSingleControl = (currentControl: ControlProps, controlName?: string) => {
    controlName: string;
    initFormData: FormProps;
};
export declare type GetInitFormDataDynamicControls = <T extends ControlsProps[] | ControlsProps>(controls: T) => FormProps<T>;
export declare type GetHookData = ({ controlName, currentControl, newValue, form, controlIndex, formIndex, selectedValue }: Partial<HookProps>) => HookProps;
