import {CombineRulesLayers} from "./types";
import {ValidatorsRulesList} from "@common-types";


/**
 * @description
 * Функция накладывает на слой валидатора, свойства из нового слоя, возвращая комбинированный слой валидаторов
 *
 * @param {ValidatorsRulesList} bottomLayer - Основной слой валидаторов
 * @param {ValidatorsRulesList} upperLayer - Слой который накладывается сверху
 *
 * @returns {ValidatorsRulesList}
 *
 */
export const combineRulesLayers: CombineRulesLayers =
    (bottomLayer, upperLayer) => {
        const combineLayer = { ...bottomLayer };

        Object.keys(combineLayer).forEach(validatorName => {
            const validator = bottomLayer[validatorName],
                newValidatorLayer = upperLayer ? upperLayer[validatorName] : {};

            combineLayer[validatorName] = { ...validator, ...newValidatorLayer };
        });

        return combineLayer;
    };