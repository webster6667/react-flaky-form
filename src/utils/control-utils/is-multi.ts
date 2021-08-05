import {IsMulti} from "./types"

/**
 * @description
 * Функция проверяет по индексу, является ли контрол мульти
 *
 * @param {number | null} controlIndex - Индекс контрола
 *
 * @returns {boolean}
 */
export const isMultiControl:IsMulti = (controlIndex) => {
    return controlIndex !== null
}

/**
 * @description
 * Функция проверяет по индексу, является ли контрол одиночкой
 *
 * @param {number | null} controlIndex - Индекс контрола
 *
 * @returns {boolean}
 */
export const isSingletonControl:IsMulti = (controlIndex) => {
    return controlIndex === null
}

/**
 * @description
 * Функция проверяет по индексу, является ли форма мульти
 *
 * @param {number | null} formIndex - Индекс формы
 *
 * @returns {boolean}
 */
export const isMultiForm:IsMulti = (formIndex) => {
    return formIndex !== null
}