import { AddValidatorsRuleLayer, AddValidatorsRulesLayerToSingleControl, CombineValidatorsSettingsLayers } from "./types";
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
export declare const addValidatorsSettingsLayer: AddValidatorsRuleLayer;
/**
 * @description
 * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
 *
 * @param {ControlProps} control - Контрол на который накладывают слои валидатора
 * @param {ValidatorsSettingList} formValidatorsSetting - Список валидаторов
 * @param {FormProps} form - главный объект формы
 *
 * @returns {void}
 *
 */
export declare const addValidatorsSettingsLayerToSingleControl: AddValidatorsRulesLayerToSingleControl;
/**
 * @description
 * Функция накладывает на слой валидатора, свойства из нового слоя, возвращая комбинированный слой валидаторов
 *
 * @param {ValidatorsSettingList} bottomLayer - Основной слой валидаторов
 * @param {ValidatorsSettingList} upperLayer - Слой который накладывается сверху
 *
 * @returns {ValidatorsSettingList}
 *
 */
export declare const combineValidatorsSettingsLayers: CombineValidatorsSettingsLayers;
