import {
    ControlProps,
    ValidatorsSettingList,
    FormProps
} from "@common-types"

import {AddValidatorsRuleLayer, AddValidatorsRulesLayerToSingleControl, CombineValidatorsSettingsLayers} from "./types"

/**
 * @description
 * Функция накладывающая слой настроек валидатора на контрол, из переданного ей объекта config
 *
 * @param {ControlProps} control - Контрол на который переданный слой настроек валидатора
 * @param {ValidatorsSettingList} validatorsSettingsList - Слой настроек валидатора
 *
 * @returns {void}
 *
 */
export const addValidatorsSettingsLayer: AddValidatorsRuleLayer = (control, validatorsSettingsList) => {
    
    /**
     * Слой настроек валидатора лежащий самом контроле(если он есть)
     */
    let controlValidatorsSetting = control.validatorsSetting


    /**
     * Перебрать переданный слой настроек валидатора, и наложить на слой самого контрола
     */
    Object.keys(validatorsSettingsList).forEach((validatorName) => {

        /**
         * 1.Текущие настройки перебираемого валидатора у контрола(нужны для склейки с передаваемым слоем)
         * 2.Настройки перебираемого валидатора из переданного слоя(нужны для склейки с сущесвтвующими настройками валидатора контрола)
         * 3.Проверка типа перебираемого валидатора
         * (isObject ? добавить настройки объекта к валидатору : isBoolean ? ) : null
         */
        let controlValidatorSettings = controlValidatorsSetting[validatorName],
            newValidatorSettingsLayer = validatorsSettingsList[validatorName],
            isObject = typeof newValidatorSettingsLayer === 'object',
            isBoolean = typeof newValidatorSettingsLayer === "boolean"


        /**
         * Если передали объект, наложить его свойсва на текущие настройки валидатора контрола
         */
        if (isObject) {
            controlValidatorsSetting[validatorName] = {...controlValidatorSettings, ...newValidatorSettingsLayer}
        } else if(isBoolean) {
        /**
         * Если boolean, добавить к текущим настройкам валидатора контрола только включение режима живой валидации
         */
            controlValidatorsSetting[validatorName] = {...controlValidatorSettings, liveEnable: newValidatorSettingsLayer}
        } else {
            throw new Error('invalid params type, need boolean or object')
        }

    })

}


/**
 * @description
 * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
 *
 * @param {ControlProps} control - Контрол на который накладывают слои валидатора
 * @param {string} controlName - Имя контрола(username or password)
 * @param {ValidatorsSettingList} formValidatorsSetting - Список валидаторов
 * @param {FormProps} form - главный объект формы
 *
 * @returns {void}
 *
 */
export const addValidatorsSettingsLayerToSingleControl:AddValidatorsRulesLayerToSingleControl = (control, controlName, formValidatorsSetting, form) => {

    /**
     * Настройки валидатора для отдельного контрола(могут быть пустыми)
     */
    const controlValidatorsSetting = control.validatorsSetting || {}

    /**
     * Наложить слой настроек валидатора, описанный в глобальном объекте для всех форм проекта
     */
    control.validatorsSetting = form.formSettings.formValidatorsSetting

    /**
     * Наложить слой настроек валидатора, описанных именно для этой формы
     */
    addValidatorsSettingsLayer(control, formValidatorsSetting)


    /**
     * Наложить слой настроек валидатора, описанных именно для этого контрола
     */
    addValidatorsSettingsLayer(control, controlValidatorsSetting)
}

/**
 * @description
 * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
 *
 * @param {ControlProps} control - Контрол на который накладывают слои валидатора
 * @param {string} controlName - Имя контрола(username or password)
 * @param {ValidatorsSettingList} formValidatorsSetting - Список валидаторов
 * @param {FormProps} form - главный объект формы
 *
 * @returns {void}
 *
 */

export const combineValidatorsSettingsLayers:CombineValidatorsSettingsLayers = (bottomLayer, upperLayer) => {

    const combineLayer = {...bottomLayer}

    Object.keys(combineLayer).forEach(validatorName => {

        const validator = bottomLayer[validatorName],
              newValidatorLayer = upperLayer[validatorName]

        combineLayer[validatorName] = {...validator, ...newValidatorLayer}
    })

    return combineLayer
}