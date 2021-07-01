import {FormConfigProps} from "@common-types"


const globalObject:any = global,
    activeFormEnvConfig:FormConfigProps = globalObject.activeForm ? globalObject.activeForm : {},
    {formValidatorsSetting = {}} = activeFormEnvConfig

//Дефолтное имя формы
export const FORM_NAME: string = 'form'

//Слои настроек формы (из библиотеки + из global проекта)
export let DEFAULT_FORM_SETTINGS:FormConfigProps = {
    action: null,
    lockSubmitBtnEvent: false,
    formName: FORM_NAME,
    ...activeFormEnvConfig,
    formValidatorsSetting: {
        minLength: {
            liveEnable: true,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: false,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        maxLength: {
            liveEnable: true,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: true,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        minValue: {
            liveEnable: true,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: false,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        maxValue: {
            liveEnable: true,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: false,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        required: {
            liveEnable: true,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: false,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        number: {
            liveEnable: true,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: true,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        email: {
            liveEnable: false,
            showLiveErrorAfterFirstSubmit: false,
            shouldLockNotValidWrite: false,
            showErrorTimeout: 0,
            hideErrorTimeout: null
        },
        ...formValidatorsSetting
    }
}
