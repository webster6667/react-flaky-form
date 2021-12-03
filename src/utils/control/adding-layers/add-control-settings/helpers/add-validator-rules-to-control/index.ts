import {AddValidatorRulesToControl} from "./types"

/**
 * @description
 * Функция накладывающая слой настроек валидатора на контрол, из переданного ей объекта config, объединяя с слоем валидатора из формы
 *
 * @param {ControlProps} control - Контрол на который переданный слой настроек валидатора
 * @param {ValidatorsSettingList} validatorsSettingsList - Слой настроек валидатора
 *
 * @returns {void}
 *
 */
export const addValidatorRulesToControl: AddValidatorRulesToControl = (control, validatorsRulesList) => {

    /**
     * Слой настроек валидатора лежащий самом контроле(если он есть)
     */
    let controlValidatorRulesList = control.validateRules || {}


    /**
     * Перебрать переданный слой настроек валидатора, и наложить на слой самого контрола
     */
    Object.keys(validatorsRulesList).forEach((validatorName) => {

        /**
         * 1.Текущие настройки перебираемого валидатора у контрола(нужны для склейки с передаваемым слоем)
         * 2.Настройки перебираемого валидатора из переданного слоя(нужны для склейки с сущесвтвующими настройками валидатора контрола)
         * 3.Проверка типа перебираемого валидатора
         * (isObject ? добавить настройки объекта к валидатору : isBoolean ? ) : null
         */
        let controlValidatorRules = controlValidatorRulesList[validatorName],
            formValidatorRulesLayer = validatorsRulesList[validatorName],
            isObject = typeof controlValidatorRules === 'object',
            isBoolean = typeof controlValidatorRules === "boolean"


        /**
         * Если передали объект, наложить его свойсва на текущие настройки валидатора контрола
         */
        if (isObject) {
            controlValidatorRulesList[validatorName] = {...formValidatorRulesLayer, ...controlValidatorRules}
        } else if(isBoolean) {
            /**
             * Если boolean, добавить к текущим настройкам валидатора контрола только включение режима живой валидации
             */
            controlValidatorRulesList[validatorName] = {...formValidatorRulesLayer}
        }

    })

}