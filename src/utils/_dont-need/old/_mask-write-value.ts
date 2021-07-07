import VMasker from 'vanilla-masker';

import {InputMaskProps, ControlProps} from "@common-types"

//Снять маску
export function unmask(pattern: string, placeholder, textAfterMask: string | number) {
    let patternElements = pattern.replace(/[9|A]/ig, '').split(''),
        valueToClear = String(textAfterMask)

    if (placeholder) {
        patternElements.push(placeholder)
    }

    patternElements.forEach((item) => {
        valueToClear = valueToClear.replace(new RegExp(`[${item}]`, 'g'), '')
    })

    return valueToClear
}

//Работа с маской
export function maskWriteValue(inputMask: InputMaskProps, currentControl: ControlProps, writeValue: string | number, eventType: string) {

    const {pattern, placeholder} = inputMask,
          clearValue = unmask(pattern, placeholder, writeValue)

    //Записать саму маску(без значений)
    if (!currentControl.inputMask._maskValue) {
        currentControl.inputMask._maskValue = VMasker.toPattern('', {pattern, placeholder})
    }


    //введенное значение, без маски
    currentControl.inputMask.clearValue = clearValue


    //Значение после обработки маской
    let valueAfterMask = VMasker.toPattern(clearValue, {pattern, placeholder}),
        hasError = false

    //Если значение маски натянуто на инпут
    if (currentControl.inputMask.placeholderVisible !== 'write') {

        //При покидании инпута, скинуть маску если вней было пусто
        if (eventType === 'mouseleave' || eventType === 'blur') {

            if (valueAfterMask === currentControl.inputMask._maskValue) {
                valueAfterMask = ''
            }

        }

    }

    if (currentControl.inputMask.placeholderVisible === 'write') {
        
        //Если введенные данные не соответствуют длине маски
        if (valueAfterMask.length != currentControl.inputMask._maskValue.length) {
            hasError = true
        }

    } else {

        //Если в натянутой маске, содержатся элементы плейсхолдера, не пропускаем ее
        if (valueAfterMask) {

            if (valueAfterMask.includes(placeholder)) {
                hasError = true
            }

        } else {
            hasError = true
        }

    }
    
    
    //Поставить ошибку если не соответстую патерну
    currentControl.hasError = hasError
    currentControl.value = valueAfterMask

}