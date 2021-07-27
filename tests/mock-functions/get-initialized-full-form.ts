import {FormControls, FormProps} from "@common-types";
import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "@const";

import {getRequireFormParams} from './get-require-form-params'

import {GetInitFormDataSingleControl, GetInitFormDataDynamicControls} from "./types"

/**
 * Полностью инициализированная форма, с одним контролом
 */
export const getInitFormDataSingleControl:GetInitFormDataSingleControl = (currentControl, controlName = 'myControl') => {

    const controls: FormControls = {
            [controlName]: currentControl
          },
          formParams = getRequireFormParams(),
          initFormData: FormProps = {
              controls,
              formParams,
              formSettings: {
                  ...DEFAULT_FORM_SETTINGS,
                  formName: FORM_NAME
              },
              controlsExample: {}
          }

    return {controlName, initFormData}
}

/**
 * Полностью инициализированная форма, с динамически добавленными контролами
 */
export const getInitFormDataDynamicControls:GetInitFormDataDynamicControls = (controls) => {

    const  formParams = getRequireFormParams(),
           initFormData: FormProps<typeof controls> = {
                controls,
                formParams,
                formSettings: {
                ...DEFAULT_FORM_SETTINGS,
                formName: FORM_NAME
            },
            controlsExample: {}
        }

    return initFormData
}