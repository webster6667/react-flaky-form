import { ValidatorSettingProps, ValidatorErrorProps } from '@common-types';
export declare type IsLiveValidatorEnable = (controlValidatorsSetting: ValidatorSettingProps) => boolean;
export declare type Unmask = (maskPattern: string, textCoveredMask: string | number, placeholder?: string | null) => string;
export declare type StaticErrorDataHandler = <T extends ValidatorErrorProps>(commonErrorData: T, propsToUpdate: Partial<T>) => void;
