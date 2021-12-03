import { inputEvents, SetForm } from '@common-types';

export type AddControlHandler = (
  newValue: string | number,
  controlName: string,
  setForm: SetForm,
  eventType: typeof inputEvents,
  selectedValue: string | number | null,
) => void;
