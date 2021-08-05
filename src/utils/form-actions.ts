import axios, {AxiosResponse} from "axios";

import {formCycle} from "@control-utils/controls-cycle"
import {addControlSetting} from '@utils/add-control-setting'
import {controlsHandlerBeforeSubmit} from '@control-handlers/before-submit-handler'
import {shouldLockSubmitBtnByForm} from "@control-handlers/submit-btn-lock-handler";

import {
    FormConfigProps,
    FormParamsProps,
    FormProps,
    SetFormProps
} from "@common-types"

import {
    InitFlukyForm,
    SubmitFlukyFormHandler,
    ToggleSubmitBtnLockRelativeLockValidatorError
} from "./types"

/**
 * @description
 * Функция обрабатывающая отправку формы на сервер
 *
 * @param {SetFormProps} setForm - Функция обрабрабатывающая глобальный объект формы
 */
export const submitFlukyFormHandler:SubmitFlukyFormHandler = (setForm) => {

    setForm( (form) => {
        form.formParams.errorList = []
        form.formParams.isFormTriedSubmit = true

        /**
         * Про валидироват все контролы перед отправкой
         */
        let isAllControlsValid = formCycle(form, controlsHandlerBeforeSubmit)

        if (isAllControlsValid) {
            
            const {action = null, afterSuccessSubmit = null, afterErrorSubmit = null, afterSubmit = null} = form.formSettings,
                   initAction = action ? typeof action === 'object' && action.toSubmit ? action.toSubmit : String(action) : null
                
                if (initAction) {
                    axios.post(initAction).then((data) => {
                        const {status} = data

                        /**
                         * Хук успешной отправки
                         */
                        if (status === 200 && typeof afterSuccessSubmit === "function") {
                            afterSuccessSubmit(data)
                        }

                        /**
                         * Хук не успешной отправки
                         */
                        if (status === 500 && typeof afterErrorSubmit === "function") {
                            afterErrorSubmit(data)
                        }

                        /**
                         * Хук после любой отправки
                         */
                        if (typeof afterSubmit === "function") {
                            afterSubmit(data)
                        }

                    }).catch((data) => {
                        const {status} = data

                        /**
                         * Хук не успешной отправки
                         */
                        if (status === 500 && typeof afterErrorSubmit === "function") {
                            afterErrorSubmit(data)
                        }

                        /**
                         * Хук после любой отправки
                         */
                        if (typeof afterSubmit === "function") {
                            afterSubmit(data)
                        }

                    })
                } 
                

        }

    })

}

/**
 * @description
 * 1.Подгрузка данных с бекенда(валидаторы, данные)
 * 2.Применение описанных конфигов ко всем контролам
 *
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {AxiosResponse} apiResponse - Ответ от API(валидаторы, данные)
 * @param {FormConfigProps} formConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @param {FormParamsProps} formParams - объект с внутренним состоянием формы(загрузилась ли, была ли попытка отправить)
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 */
export const initFlukyForm:InitFlukyForm = (form, apiResponse, formConfig, formParams, setForm) => {
    //Добавить значения и валидаторы с бека
    // initActiveValues(apiResponse, form.controls)

    /**
     * @description
     * Заинитить настройки для каждого контрола
     *
     * @param {FormProps} form - Главная форма содержащая все контролы
     * @param {SetFormProps} addControlSetting - функция принимающая данный, функция которая добирается до каждого контрола
     * @param {SetFormProps} setForm - функция изменяющая главный объект формы
     */
    formCycle(form, addControlSetting, setForm)
}

/**
 * @description
 * Запускает валидатор на блокирование кнопки отправления, и при необходимости блокирует или открывает кнопку отправления
 *
 * @param {FormProps} form - Главный объект формы
 */
export const toggleSubmitBtnLockRelativeLockValidatorError:ToggleSubmitBtnLockRelativeLockValidatorError = (form) => {
    form.formParams.isSubmitBtnLocked = shouldLockSubmitBtnByForm(form)
}