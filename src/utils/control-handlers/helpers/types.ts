import {LiveValidator, HookProps, ControlOutputDataProps, StaticValidator} from "@common-types"

import {LockSubmitBtnErrorData} from "./../types"

export type SetLiveValidatorResult = (validator: LiveValidator, hooksData: HookProps, controlOutputDataProps: ControlOutputDataProps) => void

export type SetSubmitBtnValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: LockSubmitBtnErrorData, shouldCheckValidatorSettings?: boolean) => void
