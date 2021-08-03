import {ValidatorSettingProps, ValidatorErrorProps} from '@common-types';

export type IsLiveValidatorEnable = (controlValidatorsSetting: ValidatorSettingProps) => boolean

export type Unmask = (maskPattern: string, textCoveredMask: string | number, placeholder?: string | null) => string

export type StaticErrorDataHandler = <T extends ValidatorErrorProps>(commonErrorData: T, propsToUpdate: Partial<T>) => void
