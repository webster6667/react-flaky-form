import { LiveValidatorShowErrorHandler } from "./types";
/**
 * @description
 * Функция которая выбирает обработчик ошибки, и обрабатывает его вместе с дебаунсом
 *
 * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
 * @param {HookProps} hooksData - Данные хука
 * @param {FormProps} form - Глобальный объект формы
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 * @param {NodeJS.Timeout | null} prevShowErrorTimeoutId - id предыдущего дебаунса для очистки
 * @param {number} ms - через сколько должен сработать обработчик
 *
 * @returns {void}
 *
 */
export declare const liveValidatorShowErrorHandler: LiveValidatorShowErrorHandler;
