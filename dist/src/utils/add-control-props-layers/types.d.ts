import { ControlProps, ControlsProps, FormProps, ValidatorsSettingList, CurrentControlData } from "@common-types";
export declare type AddControlExample = (controlsExampleList: ControlsProps, singleControlData: CurrentControlData) => void;
export declare type AddRequireFields = (singleControlData: CurrentControlData) => void;
export declare type AddValidatorsRuleLayer = (control: ControlProps, config: ValidatorsSettingList) => void;
export declare type AddValidatorsRulesLayerToSingleControl = (control: ControlProps, form: FormProps) => void;
export declare type CombineValidatorsSettingsLayers = (bottomLayer: ValidatorsSettingList, upperLayer: ValidatorsSettingList) => ValidatorsSettingList;
