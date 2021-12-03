import { ControlProps, FormProps, ValidatorsSettingList } from './../../types';


export type CombineValidatorsSettingsLayers = (
  bottomLayer: ValidatorsSettingList,
  upperLayer: ValidatorsSettingList,
) => ValidatorsSettingList;
