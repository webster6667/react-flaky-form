import { HideLiveErrorAfterTimeout } from "./types";
/**
 * @description
 * Функция вызывающая скрытие ошибки через таймаут
 *
 * @param {HookProps} hooksData - Данные хука
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 * @param {number} ms - время через которое нужно скрыть ошибку
 *
 * @returns {void}
 *
 */
export declare const hideLiveErrorAfterTimeout: HideLiveErrorAfterTimeout;
