import {ValidatorRulesProps} from "@common-types";

import {IsLiveValidatorEnable} from "./types"

/**
 * @description
 * Функция проверяет и возвращает, включен ли живой валидатор в переданных настройках валидатора
 *
 * @param {ValidatorRulesProps} controlValidatorsRules - обьект настройки валидатора
 *
 * @returns {boolean}
 */
 export const isLiveValidatorEnable: IsLiveValidatorEnable = (controlValidatorsRules) => {
    return controlValidatorsRules.liveEnable === true
}