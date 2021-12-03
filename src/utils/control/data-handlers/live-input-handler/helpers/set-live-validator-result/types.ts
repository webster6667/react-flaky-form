import {
  HookProps,
  ControlOutputDataProps,
  LiveValidator,
} from '@common-types';

export type SetLiveValidatorResult = (
  validator: LiveValidator,
  hooksData: HookProps,
  controlOutputDataProps: ControlOutputDataProps,
) => void;
