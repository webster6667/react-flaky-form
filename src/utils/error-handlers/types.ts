import {ValidatorErrorProps, HookProps, SetFormProps} from "@common-types"

/**
 * @description
 * Дефолтный обработчик живых ошибок
 */
export type DefaultLiveErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, setForm: SetFormProps) => void