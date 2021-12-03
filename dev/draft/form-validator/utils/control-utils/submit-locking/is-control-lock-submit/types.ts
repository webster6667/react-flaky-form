import { CurrentControlData, FormProps } from './../../../../types';

export type IsControlLockSubmit = (
  currentControlData: CurrentControlData,
  form: FormProps,
) => boolean;
