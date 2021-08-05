import { ControlsCycle, FormCycle } from "@common-types";
/**
 * @description
 * Функция проходящая циклом по всем контролам, применяя к ним переданную функцию
 *
 * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
 * Внутри функция можно получить доступ к каждому контролу
 * И изменить там что либо, или использовать как валидатор возвращая булевое значение
 * @param {ControlsProps | ControlsProps[]} formControls - Список контролов по которым пройдется функция
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {number} formIndex - Индекс формы, если это мультиформа
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 *
 * @example
 * const isAllControlsValid = controlsCycle((control, controlName, form, formIndex, controlIndex, setForm) => return formIndex ? true : false, controls, form, formIndex, setForm) // => true
 * const isAllControlsValid = controlsCycle((control, controlName, form, formIndex, controlIndex, setForm) => return formIndex ? true : false, controls, form, null, setForm) // => false
 */
export declare const controlsCycle: ControlsCycle;
/**
 * @description
 * Функция проходящая циклом по всем контролам всех форм, применяя к ним переданную функцию
 * Работает как для мульти формы, так и для одиночной
 *
 * @param {FormProps} form - Главная форма содержащая все контролы
 * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
 * Внутри функция можно получить доступ к каждому контролу
 * И изменить там что либо, или использовать как валидатор возвращая булевое значение
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
 *
 * @example
 *
 * const form = {
 *      controls: {
 *          username: {
 *              type: "text",
 *              label: 'Имя пользователя'
 *          }
 *      }
 * }
 *
 * const isControlsValid = controlsCycle(form, (control, controlName, form, formIndex, controlIndex, setForm) => return controlName === 'username' ? true : false, setForm) // => true
 * const isControlsValid = controlsCycle(form, (control, controlName, form, formIndex, controlIndex, setForm) => return controlName === 'password' : false, setForm) // => false
 */
export declare const formCycle: FormCycle;
