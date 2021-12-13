import React from "react";

import {ControlsList, FormConfigProps, FormStateProps, SubmitRequestFn} from "@common-types";

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
    formStateProps: [FormProps, SetForm],
    submitRequestFn?: SubmitRequestFn,
    submitHandler?: (form: FormProps) => void
}


export type FlakyFormI = (flakyFormProps:FlakyFormProps) => React.ReactElement