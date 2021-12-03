import { CurrentControlData, FormProps, SetFormProps } from './../../../types';

export type AddControlSetting = (
  currentControlData: CurrentControlData,
  form: FormProps,
  setForm: SetFormProps,
) => boolean;
