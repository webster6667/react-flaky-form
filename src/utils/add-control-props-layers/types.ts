import {ControlProps, ControlsProps, FormProps, ValidatorsSettingList} from "@common-types";

export type AddControlExample = (controlsExampleList: ControlsProps, controlName: string, control: ControlProps, controlIndex: number) => void

export type AddRequireFields = (control: ControlProps, controlName: string, formName: string) => void

export type AddValidatorsRuleLayer = (control: ControlProps, config: ValidatorsSettingList) => void

export type AddValidatorsRulesLayerToSingleControl = (control: ControlProps, controlName: string, formValidatorsSetting: ValidatorsSettingList, form: FormProps) => void

export type CombineValidatorsSettingsLayers = (bottomLayer: ValidatorsSettingList, upperLayer: ValidatorsSettingList) => ValidatorsSettingList
