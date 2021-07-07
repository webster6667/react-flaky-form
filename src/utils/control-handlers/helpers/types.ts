import {LiveValidator, HookProps, ControlOutputDataProps} from "@common-types"

export type GetValidatorResult = (validator: LiveValidator, hooksData: HookProps, controlOutputDataProps: ControlOutputDataProps) => void