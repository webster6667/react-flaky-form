import { AddFormExample, RemoveFormByIndex } from "./types";
/**
 * @description
 * Добавить экземпляр формы
 *
 * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
 *
 */
export declare const addFormExample: AddFormExample;
/**
 * @description
 * Удалить экземпляр формы по индексу
 *
 * @param {number | null} formIndex - Индекс формы
 * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
 *
 */
export declare const removeFormByIndex: RemoveFormByIndex;
export declare const addControlExample: (setForm: any, controlName: string, formIndex?: null | number) => void;
export declare const removeControlFromListByIndex: (setForm: any, controlName: string, formIndex: number | null, controlIndex: number) => void;
