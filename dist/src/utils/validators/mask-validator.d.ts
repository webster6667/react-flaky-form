import { MaskWriteValue } from "./types";
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
export declare const maskWriteValue: MaskWriteValue;
