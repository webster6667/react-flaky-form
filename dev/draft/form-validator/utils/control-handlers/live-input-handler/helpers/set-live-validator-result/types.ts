import {
  HookProps,
  ControlOutputDataProps,
  LiveValidator,
} from './../../../../../types';

export type SetLiveValidatorResult = (
  validator: LiveValidator,
  hooksData: HookProps,
  controlOutputDataProps: ControlOutputDataProps,
) => void;
