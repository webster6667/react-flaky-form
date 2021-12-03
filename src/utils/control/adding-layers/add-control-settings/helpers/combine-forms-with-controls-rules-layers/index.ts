import {combineRulesLayers} from '@control-utils/adding-layers/combine-rules-layers'
import {CombineFormsWithControlsRulesLayers} from "./types"

/**
 * @description
 * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
 *
 * @param {ControlProps} control - Контрол на который накладывают слои валидатора
 * @param {FormProps} form - главный объект формы
 *
 * @returns {void}
 *
 */
export const combineFormsWithControlsRulesLayers: CombineFormsWithControlsRulesLayers =
    (control, form) => {
        /**
         * Настройки валидатора для отдельного контрола(могут быть пустыми)
         */
        const controlValidatorsSetting = control.validateRules || {},
              formValidatorsSetting = form.formSettings.formValidatorsRules || {},
              combinedRules = combineRulesLayers(formValidatorsSetting, controlValidatorsSetting);

        /**
         * Наложить комбинированные слои
         */
        control.validateRules = combinedRules
    };