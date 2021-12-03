import {Unmask} from "./types"

/**
 * @description
 * Функция очищает значение от наложенной маски вместе с плейсхолдером
 *
 * @param {string} maskPattern - Строка маски(например: +7(999)-999-99-99 | AA-AAA)
 * @param {string | number} textCoveredMask - Значение покрытое маской
 * @param {string} maskPlaceholder - Символ заменяющий не заполненные символы маски
 *
 * @returns {string} возвращает текст без маски с плейсхолдером 
 */
export const unmask:Unmask = (maskPattern, textCoveredMask, maskPlaceholder = null) => {

    /**
     * 1.Получить все элементы паттерна, кроме стандартных (A|9)
     * 2.Маска для сравнения, с замененными (A|9), на спец символ
     * 3.Значение с наложенной маской и плейсхолдером
     * 4.Массив символов значения для очищения(нужен для перебора и сравнения)
     * 5.Является ли значение для очистки уже чистым(не покрытое маской)
     * 6.Переменная где должен остатся очищенный текст
     */
    let patternElements = maskPattern.replace(/[9|A]/ig, '').split(''),
        comparisonMask = maskPattern.replace(/[9|A]/ig, '⌀'),
        valueToClear = String(textCoveredMask),
        valueToClearArrayOfSymbols = valueToClear.split(''),
        isValueClear = valueToClear.length === 1,
        clearedValue = ''

    /**
     * Вернуть значение для отчистки, если оно не покрыто маской
     */
    if (isValueClear) {
        return valueToClear
        
    /**
     * Отчистить значение с маской
     */    
    } else {

        /**
         * Перебрать каждый символ значения для очищение, с наложенным плейсхолдером
         */
        valueToClearArrayOfSymbols.map((symbolFromValueToClear, symbolNumber) => {

            /**
             * 1.Получить символ маски для сравнения
             * 2.Равны ли сивол для очищения и символ маски
             * 3.Входит ли этот символ в текущий список символов паттерна
             * 4.Считается ли этот символ чистым
             */
            let symbolFromComparisonMask = comparisonMask[symbolNumber],
                areSymbolsEqual = symbolFromValueToClear === symbolFromComparisonMask,
                isSymbolIncludePatternElements = patternElements.includes(symbolFromValueToClear),
                isClearSymbol = !areSymbolsEqual

            /**
             * Если символ для очистки совпадает с символом маски, и входит в текущий список символов паттерна
             * Значит это символ паттера маски, нужно удалить его из списка символов паттерна(что бы не пропустить такой же символ, но из чистого значения)
             */
            if (areSymbolsEqual && isSymbolIncludePatternElements) {
                const patternElementIndex = patternElements.indexOf(symbolFromValueToClear)
                      patternElements.splice(patternElementIndex, 1)

            /**
             * Если символ для очистки не совпадает с символом маски, и не входит в текущий список символов паттерна
             * Считаем его чистым и добавляем к символам очищенным от маски
             */
            } else if(isClearSymbol) {
                clearedValue += symbolFromValueToClear
            }

        })


        /**
         * Отчистить чистое значение от неочищенных символов плейсхолдера
         */
        clearedValue = clearedValue.replace(new RegExp(maskPlaceholder, 'g'), '')
        
    }

    return clearedValue
}