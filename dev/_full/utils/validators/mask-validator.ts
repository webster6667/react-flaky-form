import {mask} from "./helpers/mask";
import {unmask} from "./helpers/unmask";


import {MaskSettingProps, ControlProps} from "@common-types";

import {MaskWriteValue} from "./types"

/**
 * @description
 * Валидатор вписывает введенное значение в контрол по маске
 *
 * @param {MaskSettingProps} maskSetting - Объект описывающий правила маски
 * @param {ControlProps} currentControl - Контрол с которым работает валидатор
 * @param {string | number} writeValue - Чистое значение, которое должно быть покрыто маской
 * @param {string} eventType - Событие по которому попали в валидатор
 *
 * @returns {void} результатом работы функции будет введенное значение в контрол по маске, а так же toggle флага ошибки контрола
 */
export const maskWriteValue:MaskWriteValue = (maskSetting, currentControl, writeValue, eventType) => {

    /**
     * 1.Получить паттерн маски, прежде чем наложить ее
     * 2.Получить событие при котором инпут покрывается маской
     * 3.Получить плейсхолдер не заполненных значений маски
     * 4.Получить чистое значение, без маски
     * 5.Лежит ли на инпуте вся маска с плейсхолдером(+7(___)-___-__-__)
     * 6.Было ли переданно значение плейсхолдера
     * 7.Покрывается ли текст маской только после ввода и без плейсхолдера
     */
    let {
            maskPattern: pattern,
            eventWhenPlaceholderVisible,
            maskPlaceholder: placeholder = undefined
          } = maskSetting,
          clearValue = unmask(pattern, writeValue, placeholder),
          hasInputFullMaskWithPlaceholder = eventWhenPlaceholderVisible !== 'write',
          isWrittenTextMaskedAfterInputWithoutPlaceholder = eventWhenPlaceholderVisible === 'write',
          isPatternPlaceholderEmpty = !placeholder,
          hasControlMaskWithPlaceholderInSettings = !currentControl.maskSetting._maskWithPlaceholder

    
    /**
     * Записать значение плейсхолдера по умолчанию, если маска с плейсхолдером должна сразу быть на инпуте
     */
    if (hasInputFullMaskWithPlaceholder && isPatternPlaceholderEmpty) placeholder = '_'

    /**
     * Убрать значения плейсхолдера для маски которая ложится во время ввода, без плейсхолдера
     */
    if (isWrittenTextMaskedAfterInputWithoutPlaceholder) placeholder = undefined


    /**
     * Записать само значение маски с уже наложенным плейсхолдером
     * 1.Для того что бы скинуть введенное значение, и оставить только пустую маску
     * 2.Для сравнения введенного значения с длинной маски
     */
    if (hasControlMaskWithPlaceholderInSettings) {
        currentControl.maskSetting._maskWithPlaceholder = mask('', {pattern, placeholder: placeholder || '_'})
    }


    /**
     * Записать чистое значение без маски, в свойтсва контрола
     */
    currentControl.maskSetting.clearValue = clearValue


    /**
     * 1.Значение после обработки маской
     * 2.Есть ли в маске ошибка
     * 3.Маска с натянутым плейсхолдером(+7(___)-___-__-__))
     * 4.Длинна значения с натянутой масской
     * 5.Равно ли значения инпута маске(valueAfterMask === +7(___)-___-__-__))
     */
    let valueAfterMask = mask(clearValue, {pattern, placeholder}),
        hasError = false,
        maskWithPlaceholder = currentControl.maskSetting._maskWithPlaceholder,
        isInputValueEqualMaskWithPlaceholder = valueAfterMask === maskWithPlaceholder,
        hasValueAfterMaskPlaceholderSymbols = valueAfterMask.includes(placeholder)
    
    /**
     * Если на инпут натянута вся маска с плейсхолдером(input.value === +7(___)-___-__-__)), и происходит покидания не заполненного инпута с натянутой маской(input.value === +7(___)-___-__-__))
     * Скинуть значение инпута до пустого
     */
    if (hasInputFullMaskWithPlaceholder && ['mouseleave', 'blur'].includes(eventType) && isInputValueEqualMaskWithPlaceholder) {
        valueAfterMask = ''
    }

    /**
     * Если текст покрывается маской без плейсхолдера по мере ввода
     * Выдавать ошибку если длинна маски с плейсхолдером не совпадает с длинной значения покрытого маской
     */
    if (isWrittenTextMaskedAfterInputWithoutPlaceholder) {
        const maskedValueLength = valueAfterMask.length,
              maskWithPlaceholderLength = maskWithPlaceholder.length,
              isMaskedValueWithMaskWithPlaceholderHasNotEqualLength = maskedValueLength !== maskWithPlaceholderLength

        
        if (isMaskedValueWithMaskWithPlaceholderHasNotEqualLength) hasError = true

    /**
     * Если на инпут уже натянута маска, и в ней содержатся элементы плейсхолдера(+7(123)-456-78-__)
     * Выдать ошибку
     */    
    } else if (hasValueAfterMaskPlaceholderSymbols) {
        hasError = true
    }


    /**
     * Вывести результаты валидатора
     */
    currentControl.hasError = hasError
    currentControl.value = valueAfterMask
}