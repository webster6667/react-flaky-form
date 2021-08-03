import {LiveValidator, HookProps, ControlOutputDataProps, LockSubmitValidator} from "@common-types"

import {LockSubmitBtnErrorData} from "./../types"

export type SetLiveValidatorResult = (validator: LiveValidator, hooksData: HookProps, controlOutputDataProps: ControlOutputDataProps) => void

export type SetSubmitBtnValidatorResult = (validator: LockSubmitValidator, hooksData: HookProps, errorData: LockSubmitBtnErrorData, shouldCheckValidatorSettings?: boolean) => void
