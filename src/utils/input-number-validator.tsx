import {NumberValidatorRulesProps} from "./../types";

/**
 * @description
 * Валидирует числа по указанным правилам
 * 1. Отрицательные значения
 * 2. Точки
 * 3. Допустимые символы
 *
 * @param {} param - paramDesc
 *
 * @returns {}
 *
 * @example
 * function() // => true
 */
export const inputNumberValidator = (writeValue, numberRules: NumberValidatorRulesProps = {}):boolean => {

    //Управление символами
    let isNumberInputValid: boolean = true,
        {negative = true, dot = true} = numberRules || {}

    if (writeValue) {

        let regExp = /^[-]?([\d]+)?[.]?([\d]+)?$/

        if (negative === false) {
            regExp = dot ? /^([\d]+)?[.]?([\d]+)?$/ : /^\d+$/
        }

        if (dot === false) {
            regExp = negative ? /^[-]?([\d]+)?$/ : /^\d+$/
        }

        isNumberInputValid = regExp.test(String(writeValue))

        if (writeValue === '-.') {
            isNumberInputValid = false
        }
    }

    return isNumberInputValid
}