import { CurrentControlData, FormProps, SetForm } from '@common-types';

export type AddControlSetting = (
  currentControlData: CurrentControlData,
  form: FormProps,
  setForm: SetForm,
) => boolean;
