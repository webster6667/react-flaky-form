import {NumberValidatorRulesProps} from "./../types";

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