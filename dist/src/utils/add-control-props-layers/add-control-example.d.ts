import { AddControlExample } from "./types";
/**
 * @description
 * Функция добавляющая экземпляр контрола(одиночного или вложенного),
 * Для того что бы можно было добавлять новые формы или контролы во вью
 *
 * @param {ControlsProps} controlsExampleList - Список контролов формы, с которых клонируют структуру
 * @param {string} controlName - Имя контрола(username or password)
 * @param {ControlProps} control - Сам контрол который клонируют, со всеми свойствами
 * @param {number} controlIndex - Индекс вложенного контрола
 *
 * @returns {void}
 */
export declare const addControlExample: AddControlExample;
