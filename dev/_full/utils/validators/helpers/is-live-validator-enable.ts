import {ValidatorSettingProps} from "@common-types";

import {IsLiveValidatorEnable} from "./types"

/**
 * @description
 * Функция проверяет и возвращает, включен ли живой валидатор в переданных настройках валидатора
 *
 * @param {ValidatorSettingProps} controlValidatorsSetting - обьект настройки валидатора
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 */
 export const isLiveValidatorEnable: IsLiveValidatorEnable = (controlValidatorsSetting) => {
    return controlValidatorsSetting.liveEnable === true
}