import {LiveValidator, HookProps, ControlOutputDataProps, StaticValidator} from "@common-types"

import {LockSubmitBtnErrorData, BeforeSubmitErrorData} from "./../types"

export type SetLiveValidatorResult = (validator: LiveValidator, hooksData: HookProps, controlOutputDataProps: ControlOutputDataProps) => void

export type SetLockSubmitBtnValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: LockSubmitBtnErrorData, shouldCheckValidatorSettings?: boolean) => void

export type SetBeforeSubmitValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: BeforeSubmitErrorData) => void
