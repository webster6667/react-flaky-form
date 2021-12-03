import { inputEvents, SetFormProps } from './../../../../../types';

export type AddControlHandler = (
  newValue: string | number,
  controlName: string,
  setForm: SetFormProps,
  eventType: typeof inputEvents,
  selectedValue: string | number | null,
) => void;
