import { ShouldLockSubmitBtnByControl, ShouldLockSubmitBtnByForm } from "./types";
/**
 * @description
 * Функция проходит через данные контрола, и на их основании определяет блокировать ли кнопку ввода
 *
 * @param {CurrentControlData} currentControlData - Все данные по переданному контролу
 * @param {FormProps} form - главный объект формы
 *
 * @returns {boolean}
 *
 */
export declare const shouldLockSubmitBtnByControl: ShouldLockSubmitBtnByControl;
/**
 * @description
 * Функция проходит через данные всех контролов, и на их основании определяет нужно ли блокировать кнопку
 *
 * @param {FormProps} form - главный объект формы, содержащий все контролы
 *
 * @returns {boolean}
 */
export declare const shouldLockSubmitBtnByForm: ShouldLockSubmitBtnByForm;
