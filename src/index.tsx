import React, {useEffect} from 'react';

import axios from 'axios'
import {useImmer} from 'use-immer';

import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "@const";

import {combineValidatorsSettingsLayers} from '@add-control-props-layers/add-validators-settings-layers'

import {initFlukyForm, submitFlukyFormHandler} from '@utils/form-actions'
import {addControlExample, removeControlFromListByIndex, addFormExample, removeFormByIndex} from './action/dynamic-form'

import {
    FormConfigProps,
    FormParamsProps,
    ControlsProps,
    FormProps,
    UseFlukyForm,
    FlukyFormComponent,
    AddFormExampleComponent,
    RemoveFormComponent,
    AddControlComponent,
    RemoveControlComponent
} from "@common-types"

import './style.less'


/**
 * @description
 * Хук инициализации формы
 *
 * @param {ControlsProps | ControlsProps[]} controls - массив контролы формы
 * @param {FormConfigProps} customFormConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @returns {[FormProps, any]} контролы с нужными настройками, функцию для изменения состояния формы
 *
 */
export const useFlukyForm: UseFlukyForm = (controls, customFormConfig) => {

    const formParams: FormParamsProps = {
            loaded: false,
            isFormTriedSubmit: false,
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
                    initFlukyForm(form, apiResponse, customFormConfig, formParams, setForm)
                })

            })();


        }, [])

    return [flukyForm, setForm]

}

export const FlukyForm:FlukyFormComponent = ({
                                       children,
                                       className = 'form',
                                       id = null,
                                       action = null,
                                       formState,
                                       setForm
                                   }) => {

       const {loaded} = formState.formParams,
             {formName: currentFormName} = formState.formSettings,
             submitHandler = (e) => {
                e.preventDefault()
                submitFlukyFormHandler(setForm)
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


export const AddFormExample:AddFormExampleComponent = ({setForm, value = 'Добавить форму', children}) => {

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

export const RemoveForm:RemoveFormComponent = ({setForm, formIndex, value, children}) => {

    const clickHandler = (e) => {
        removeFormByIndex(formIndex, setForm)
    }

    return <div className={'remove-form-clone'} onClick={clickHandler} >
        {value ? value : children}
    </div>

}

export const AddControlExample:AddControlComponent = ({setForm, controlName, formIndex = null}) => {


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

export const RemoveControl:RemoveControlComponent = ({setForm, controlName, controlIndex, formIndex = null}) => {

    const clickHandler = (e) => {
        removeControlFromListByIndex(setForm, controlName, formIndex, controlIndex)
    }

    return <div className={'remove-control'} onClick={clickHandler} >
        - c
    </div>

}


