import { FormProps, FormConfigProps, SetForm } from '@common-types';

export type InitForm = (
  form: FormProps,
  formConfig: FormConfigProps,
  setForm: SetForm,
) => void;
