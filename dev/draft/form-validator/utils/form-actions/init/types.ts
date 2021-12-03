import { FormProps, FormConfigProps, SetFormProps } from './../../../types';

export type InitForm = (
  form: FormProps,
  formConfig: FormConfigProps,
  setForm: SetFormProps,
) => void;
