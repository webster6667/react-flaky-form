import {ValidatorErrorProps, HookProps, SetForm, FormProps} from "@common-types"

/**
 * @description
 * Дефолтный обработчик живых ошибок
 */
export type DefaultLiveErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, form: FormProps, setForm: SetForm) => void
