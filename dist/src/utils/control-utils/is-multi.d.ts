import { IsMulti } from "./types";
/**
 * @description
 * Функция проверяет по индексу, является ли контрол мульти
 *
 * @param {number | null} controlIndex - Индекс контрола
 *
 * @returns {boolean}
 */
export declare const isMultiControl: IsMulti;
/**
 * @description
 * Функция проверяет по индексу, является ли контрол одиночкой
 *
 * @param {number | null} controlIndex - Индекс контрола
 *
 * @returns {boolean}
 */
export declare const isSingletonControl: IsMulti;
/**
 * @description
 * Функция проверяет по индексу, является ли форма мульти
 *
 * @param {number | null} formIndex - Индекс формы
 *
 * @returns {boolean}
 */
export declare const isMultiForm: IsMulti;
