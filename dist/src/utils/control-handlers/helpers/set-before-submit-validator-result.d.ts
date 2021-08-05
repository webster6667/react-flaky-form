import { SetBeforeSubmitValidatorResult } from "./types";
/**
 * @description
 * Записывает результат статического валидатора перед отправкой данный на сервер
 *
 * @param {LiveValidator} validator - Валидатор, результат которого будет записыватся
 * @param {HookProps} hookProps - Данные для работы валидатора
 * @param {ControlOutputDataProps} beforeSubmitErrorData - Объект в котором хранятся результаты валидации
 *
 * @returns {void}
 */
export declare const setBeforeSubmitValidatorResult: SetBeforeSubmitValidatorResult;
