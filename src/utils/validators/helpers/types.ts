import {ValidatorSettingProps} from '@common-types';

export type IsLiveValidatorEnable = (controlValidatorsSetting: ValidatorSettingProps) => boolean

export type Unmask = (maskPattern: string, textCoveredMask: string | number, placeholder?: string | null) => string
