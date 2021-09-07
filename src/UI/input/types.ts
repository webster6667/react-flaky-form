import {inputTypes, MaskSettingProps} from "@common-types";
import {BemComponent, InputElementsClassNameProps} from "../types";

export interface FlakyInputProps extends BemComponent {
    elementsClassName?: InputElementsClassNameProps,
    type?: typeof inputTypes,
    havePasswordVisibleSwitch?: boolean,
    label?: string,
    error?: string,
    placeholder?: string | null,
    hasError?: boolean,
    inputName?: string | null,
    value?: string | number | null | any[],
    setValue?: any,
    togglePasswordVisibility?: any,
    labelProps?: {[key: string]: string}
    errorProps?: {[key: string]: string},
    inputProps?: {[key: string]: string},
    style?: {[key: string]: string},
    index?: null | number,
    formIndex?: null | number,
    inputMask?: null | MaskSettingProps,
    customMask?: any,
    [key: string]: any
}

export type FlakyInputComponent = (props:FlakyInputProps) => any

