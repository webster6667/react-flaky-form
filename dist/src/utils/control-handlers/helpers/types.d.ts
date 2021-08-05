import { LiveValidator, HookProps, ControlOutputDataProps, StaticValidator } from "@common-types";
import { LockSubmitBtnErrorData, BeforeSubmitErrorData } from "./../types";
export declare type SetLiveValidatorResult = (validator: LiveValidator, hooksData: HookProps, controlOutputDataProps: ControlOutputDataProps) => void;
export declare type SetLockSubmitBtnValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: LockSubmitBtnErrorData, shouldCheckValidatorSettings?: boolean) => void;
export declare type SetBeforeSubmitValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: BeforeSubmitErrorData) => void;
