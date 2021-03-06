import {
    FormProps,
    SetFormProps,
    CurrentControlData
} from "@common-types"
import {AddControlSetting} from "./types"

import {addRequireFields} from '@add-control-props-layers/add-required-field'
import {addControlExample} from '@add-control-props-layers/add-control-example'
import {addValidatorsSettingsLayerToSingleControl} from "@add-control-props-layers/add-validators-settings-layers"

import {addControlHandler} from "@utils/add-control-handler"
import {shouldLockSubmitBtnByControl} from '@control-handlers/submit-btn-lock-handler'
import {maskWriteValue} from "@validators/mask-validator";

/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {CurrentControlData} currentControlData - Все данные по перебираемому контролу
 * @param {FormProps} form - главный объект формы
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean}
 */
export const addControlSetting: AddControlSetting = (currentControlData, form, setForm) => {

    const {currentControl, controlName} = currentControlData,
          inputMask = currentControl.maskSetting || null,
          hasMask = inputMask,
          {type = null, value} = currentControl,
          controlsExampleList = form.controlsExample


    if (!type) {
        console.error(`type is require control prop`);
    } else {

        /**
         * Добавить обязательные поля
         */
        addRequireFields(currentControlData)

        /**
         * Наложить все слои настроек валидатора для контрола
         */
        addValidatorsSettingsLayerToSingleControl(currentControl, form)

        /**
         * Обработчик входных данных
         */
        currentControl.setValue = (
            newValue,
            controlIndex,
            formIndex,
            eventType = null,
            selectedValue = null
        ) => addControlHandler(newValue, controlName, controlIndex, formIndex, setForm, eventType, selectedValue)

        /**
         * Поставить маску на инпут изначально, если маска должна быть всегда видима
         */
        if (hasMask && !Array.isArray(value)) {
            const shouldShowInputMaskAlways = inputMask.eventWhenPlaceholderVisible === "always"
            if (shouldShowInputMaskAlways) maskWriteValue(inputMask, currentControl, value, 'focus')
        }


        /**
         * Записать экземпляр контрола
         */
        addControlExample(controlsExampleList, currentControlData)

        /**
         * Проверить при инициализации контрола, блокировать ли кнопку
         */
        form.formParams.isSubmitBtnLocked = shouldLockSubmitBtnByControl(currentControlData, form)
    }


    return true
}