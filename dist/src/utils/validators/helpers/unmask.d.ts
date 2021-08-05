import { Unmask } from "./types";
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
export declare const unmask: Unmask;
