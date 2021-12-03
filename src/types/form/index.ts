import {ControlsList, FormConfigProps, FormStateProps} from "@src/types";

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
