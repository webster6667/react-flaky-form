import React, {useEffect} from 'react';

import axios from 'axios'
import {useImmer} from 'use-immer';

import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "@const";

import {combineValidatorsSettingsLayers} from '@add-control-props-layers/add-validators-settings-layers'

import {initActiveForm, submitForm} from './action/form'
import {addControlExample, removeControlFromListByIndex, addFormExample, removeFormByIndex} from './action/dynamic-form'

import {
    FormConfigProps,
    FormParamsProps,
    ControlsProps,
    ActiveFormProps,
    FormProps,
    UseFlukyForm,
} from "./types"

import './style.less'


/**
 * @description
 * Хук инициализации формы
 *
 * @param {ControlsProps | ControlsProps[]} controls - массив контролы формы
 * @param {FormConfigProps} customFormConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @returns {[FormProps, any]} контролы с нужными настройками, функцию для изменения состояния формы
 *
 * @example
 * const customFormConfig = {
 *      lockSubmitBtnEvent: false,
 *      action: '/api/multi-form',
 *      formName: 'SingleForm',
 *      afterErrorSubmit: (data) => {
 *          console.log('хук после отправки ошибки',data)
 *      }
 * }
 *
 * let [myForm, setMyForm] = useFlukyForm({
 *  username: {
 *       type: "text",
 *       label: 'Имя пользователя',
 *       beforeSubmitValidatorError: () => {
 *         console.log('До ошибки')
 *       },
 *       validateRules: {
 *           maxLength: {limit: 8, message: 'максимум {limit} [символ, символа, символов]'},
 *           minLength: {limit: 2, message: 'минимум {limit} [символ, символа, символов]'},
 *           required: {message: '{label} обязательное поле'}
 *       }
 *  }
 * }, customFormConfig)
 */
export const useFlukyForm: UseFlukyForm = (controls, customFormConfig) => {

    const formParams: FormParamsProps = {
            loaded: false,
            triedSubmit: false,
            isSubmitBtnLocked: false,
            errorList: [],
            commonError: ''
          },
          formValidatorsSetting = combineValidatorsSettingsLayers(DEFAULT_FORM_SETTINGS.formValidatorsSetting, customFormConfig.formValidatorsSetting),
          [flukyForm, setForm] = useImmer<FormProps<typeof controls>>({
              controls,
              formParams,
              formSettings: {
                  ...DEFAULT_FORM_SETTINGS,
                  formName: FORM_NAME,
                  ...customFormConfig,
                  formValidatorsSetting
              },
              controlsExample: {}
          })


        useEffect(() => {

            (async function asyncFunction() {


                const {action = null} = customFormConfig,
                      initAction = action ? typeof action === 'object' && action.toInit ? action.toInit : String(action) : null,
                      apiResponse = initAction ? await axios.post(initAction) : null


                setForm((form) => {
                    initActiveForm(form, apiResponse, customFormConfig, formParams, setForm)
                })

            })();


        }, [])

    return [flukyForm, setForm]

}

export function ActiveForm({
                                       children,
                                       className = 'form',
                                       id = null,
                                       action = null,
                                       formState,
                                       setForm
                                   }:ActiveFormProps) {

       const {loaded} = formState.formParams,
             {formName: currentFormName} = formState.formSettings,
             submitHandler = (e) => {
                e.preventDefault()
                 submitForm(setForm)
             }

    return (<form
        id={String(currentFormName)}
        className={className}
        onSubmit={submitHandler}
    >
        {children}
        <input data-element={'hidden-submit-trigger'}
               type={'submit'}
               style={{opacity: 0, width: 0, height: 0, position: 'absolute', zIndex: -1}}
        />
    </form>)
}


interface AddControlButtonProps {
    setForm: any,
    controlName: string,
    formIndex?: null | number,
}

interface AddFormButtonProps {
    setForm: any,
    value?: string,
    children?: any
}

interface RemoveFormButtonProps {
    setForm: any,
    formIndex: number,
    value?: string,
    children?: any
}

export function AddFormExample({setForm, value = 'Добавить форму', children}:AddFormButtonProps) {

    const clickHandler = (e) => {

        //Добавить экземпляр формы
        addFormExample(setForm)

        // setForm((form:FormProps) => {
        //
        //     //Добавить собственно сгенерируемую форму
        //     // let newFormControls: ControlsProps = {password: {
        //     //             type:  'password',
        //     //             label: 'Мароль',
        //     //             validateRules: {
        //     //                 minLength: {value: 2, message: 'Мало'}
        //     //             }
        //     // }}
        //     //
        //     // addNewForm(form, setForm, newFormControls)
        //
        // })

    }

    return <div className={'add-form-clone'} onClick={clickHandler} >
        {value ? value : children}
    </div>
}

export function RemoveForm({setForm, formIndex, value, children}:RemoveFormButtonProps) {

    const clickHandler = (e) => {
        removeFormByIndex(formIndex, setForm)
    }

    return <div className={'remove-form-clone'} onClick={clickHandler} >
        {value ? value : children}
    </div>

}

export function AddControlExample({setForm, controlName, formIndex = null}:AddControlButtonProps) {


    const clickHandler = (e) => {

        // //Новый контрол в список
        // const newControlToList: ControlProps = {
        //     type: "text",
        //     label: 'бузер',
        //     validateRules: {
        //         maxLength: {value: 5, message: 'Многовато'},
        //         required: {message: 'обязательно'}
        //     }
        // }

        // addNewControlToControlList(setForm, controlName, formIndex, newControlToList)

        //Экземпляр контрола в список
        addControlExample(setForm, controlName, formIndex)
        

        //Новый контрол в форму (нужно как-то во вью вывести)
        // addNewControlToForm(setForm, 'newCont', {
        //     type: "text",
        //     label: 'Юзер',
        //     validateRules: {
        //         maxLength: {value: 2, message: 'Многовато'},
        //         required: {message: 'обязательно'}
        //     },
        // }, 0)
    }

    return <div className={'add-form-clone'} onClick={clickHandler} >
        + c
    </div>

}

export function RemoveControl({setForm, controlName, controlIndex, formIndex = null}) {

    const clickHandler = (e) => {
        removeControlFromListByIndex(setForm, controlName, formIndex, controlIndex)
    }

    return <div className={'remove-control'} onClick={clickHandler} >
        - c
    </div>

}


