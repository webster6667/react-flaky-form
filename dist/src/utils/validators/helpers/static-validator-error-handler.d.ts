import { StaticErrorDataHandler } from "./types";
/**
 * @description
 * Функция записывает данные ошибки статического валидатора, и определяет нужно ли блокировать форму отправки
 *
 * @param {ValidatorErrorProps} commonErrorData - объект с данными ошибки
 * @param {ValidatorErrorProps} propsToUpdate - Слой новых свойств которые будут накладыватся
 *
 */
export declare const StaticValidatorErrorHandler: StaticErrorDataHandler;
