import {AxiosResponse} from "axios";

import {formCycle} from "@control-utils/controls-cycle"
import {addControlSetting} from '@utils/add-control-setting'
import {validateControlBeforeSubmit} from './../helpers/vaidate-control-before-submit'

import {
    FormConfigProps, FormControls,
    FormParamsProps,
    FormProps,
    SetFormProps
} from "./../types"
import axios from "axios";

export const submitForm = (setForm:SetFormProps) => {

    setForm( (form) => {
        form.formParams.errorList = []
        form.formParams.triedSubmit = true

        //Провалидировать перед отправкой
        let isAllControlsValid = formCycle(form, validateControlBeforeSubmit)

        if (isAllControlsValid) {
            
            const {action = null, afterSuccessSubmit = null, afterErrorSubmit = null, afterSubmit = null} = form.formSettings,
                   initAction = action ? typeof action === 'object' && action.toSubmit ? action.toSubmit : String(action) : null
                
                if (initAction) {
                    axios.post(initAction).then((data) => {
                        const {status} = data

                        //Хук успешной отправки
                        if (status === 200 && typeof afterSuccessSubmit === "function") {
                            afterSuccessSubmit(data)
                        }

                        //Хук не успешной отправки
                        if (status === 500 && typeof afterErrorSubmit === "function") {
                            afterErrorSubmit(data)
                        }

                        if (typeof afterSubmit === "function") {
                            afterSubmit(data)
                        }

                    }).catch((data) => {
                        const {status} = data

                        //Хук не успешной отправки
                        if (status === 500 && typeof afterErrorSubmit === "function") {
                            afterErrorSubmit(data)
                        }

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
export const initActiveForm = (form: FormProps, apiResponse: AxiosResponse, formConfig: FormConfigProps, formParams: FormParamsProps, setForm: SetFormProps): void => {
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