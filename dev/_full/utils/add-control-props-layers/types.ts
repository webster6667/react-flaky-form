import {ControlProps, ControlsProps, FormProps, ValidatorsSettingList, CurrentControlData} from "@common-types";

export type AddControlExample = (controlsExampleList: ControlsProps, singleControlData: CurrentControlData) => void

export type AddRequireFields = (singleControlData: CurrentControlData) => void

export type AddValidatorsRuleLayer = (control: ControlProps, config: ValidatorsSettingList) => void

export type AddValidatorsRulesLayerToSingleControl = (control: ControlProps, form: FormProps) => void

export type CombineValidatorsSettingsLayers = (bottomLayer: ValidatorsSettingList, upperLayer: ValidatorsSettingList) => ValidatorsSettingList
