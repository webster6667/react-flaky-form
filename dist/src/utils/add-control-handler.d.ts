import { AddControlHandler } from "./types";
/**
 * @description
 * Функция добавить обработку входных данных, для всех типов контролов,
 * Обработчики работают для всех типов контролов, даже если их типы меняются динамически
 *
 * @param {string | number} newValue - Новое значение которое выбирают или вводят
 * @param {string} controlName - Имя контрола (username or password)
 * @param {number | null} controlIndex - Индекс элемента вложенного контрола(если это вложенный контрол)
 * @param {number | null} formIndex - Индекс формы(если это мульти форма)
 * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
 * @param {typeof inputEvents} eventType - Тип события который произошел на контроле
 * @param {string | number} selectedValue - Выбранное значение если это кликабильный контрол
 *
 * @returns {void}
 */
export declare const addControlHandler: AddControlHandler;
