import React from "react";

import {ControlsList, FormConfigProps, FormStateProps} from "@common-types";

/**
 * @description
 * Главный объект формы
 */
export interface FormProps<T = ControlsList> {
    controls: T;
    formState: FormStateProps;
    formSettings?: FormConfigProps;
}

export type SetForm = (setFormFunc: (form: FormProps) => any) => any;

/**
 * Параметры компонента формы
 */
type FlakyFormProps = {
    className?: string,
    children: any,
    id?: string,
    action?: string,
    formState: FormProps,
    setForm: SetForm
}


export type FlakyFormI = (flakyFormProps:FlakyFormProps) => React.ReactElement