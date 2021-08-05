import { GetControlFromForm } from "./types";
/**
 * @description
 * Получить контрол из глобального обьекта формы, по переданным парраметрам
 *
 * @param {FormProps} form - Глобальный объект формы
 * @param {number | null} formIndex - Индекс формы (Если это мультиформа)
 * @param {number | null} controlIndex - Индекс контрола (Если это вложенный контрол)
 * @param {string | number | null} controlName - Имя контрола (username or password)
 *
 * @returns {ControlProps} - вернет контрол
 *
 */
export declare const getControlFromForm: GetControlFromForm;
