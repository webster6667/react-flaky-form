import {
    ControlProps,
    FormProps,
    SetFormProps
} from "@common-types"
import {AddControlSetting} from "./types"

import {addRequireFields} from '@add-control-props-layers/add-required-field'
import {addControlExample} from '@add-control-props-layers/add-control-example'
import {addValidatorsSettingsLayerToSingleControl} from "@add-control-props-layers/add-validators-settings-layers"

import {addControlHandler} from "@utils/add-control-handler"
// import {isControlBtnSubmitValidationSuccess} from './../../helpers/lock-submit-btn-validator'

/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {ControlProps} control - Контрол которому добавляют настройки
 * @param {string} controlName - Имя контрола(username or password)
 * @param {FormProps} form - главный объект формы
 * @param {number} formIndex - Индекс формы
 * @param {number} controlIndex - Индекс вложенного контрола
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean}
 */
export const addControlSetting: AddControlSetting = (control, controlName, form, formIndex = null, controlIndex = null, setForm) => {

    const {type = null} = control,
          {formName} = form.formSettings,
          controlsExampleList = form.controlsExample


    if (!type) {
        console.error(`type is require control prop`);
    } else {
        /**
         * Настройка валидатора, описанная для этой формы
         */
        let formValidatorsSetting = form.formSettings.formValidatorsSetting || {}

        /**
         * Добавить обязательные поля
         */
        addRequireFields(control, controlName, formName)

        /**
         * Наложить все слои настроек валидатора для контрола
         */
        addValidatorsSettingsLayerToSingleControl(control, controlName, formValidatorsSetting, form)


        /**
         * Обработчик входных данных
         */
        control.setValue = (
            newValue,
            controlIndex,
            formIndex,
            eventType = null,
            selectedValue = null
        ) => addControlHandler(newValue, controlName, controlIndex, formIndex, setForm, eventType, selectedValue)

        /**
         * Записать экземпляр контрола
         */
        addControlExample(controlsExampleList, controlName, control, controlIndex)

        //Проверить, проходит ли контрол валидатор блокирующий кнопку
        // const shouldLockSubmitBtn = !isControlBtnSubmitValidationSuccess(control, controlName, form, formIndex, controlIndex)

        // //Заблокировать кнопку если где-то была ошибка
        // if (shouldLockSubmitBtn) {
        //     form.formParams.isSubmitBtnLocked = true
        // }

    }


    return true
}