import {
    SingleControl,
    ControlsProps,
    FormProps,
    SetFormProps,
    ControlsCycle,
    FormCycle,
    ControlsCycleHandler
} from "../types";


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
export const controlsCycle: ControlsCycle = (controlsCycleHandler, formControls, form, formIndex = null, setForm = null) => {

    let isAllControlsReturnTrue: boolean = true

    /**
     * Перебор контролов одной формы
     */
    Object.keys(formControls).forEach((controlName) => {
        let control: SingleControl = formControls[controlName]

        /**
         * Вложенный контрол
         */
        if (Array.isArray(control)) {

            control.forEach((controlItem, controlIndex) => {
                const isControlReturnTrue = controlsCycleHandler(controlItem, controlName, form, formIndex, controlIndex, setForm)

                if (isControlReturnTrue !== true) isAllControlsReturnTrue = false
            })

        /**
         * Одиночный контрол
         */
        } else {
            const isControlReturnTrue = controlsCycleHandler(control, controlName, form, formIndex, null, setForm)


            if (isControlReturnTrue !== true) isAllControlsReturnTrue = false
        }

    })

    return isAllControlsReturnTrue
}

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
export const formCycle: FormCycle = (form, controlsCycleHandler, setForm) => {
        const controls = form.controls

        let isAllFormReturnTrue: boolean = true

        /**
         * Обработка мульти формы
         */
        if (Array.isArray(controls)) {

            controls.forEach((controls: ControlsProps, formIndex) => {
                const isSingleFormValid = controlsCycle(controlsCycleHandler, controls, form, formIndex, setForm)

                if (isSingleFormValid === false) isAllFormReturnTrue = false
            })

        /**
         * Обработка обычной формы
         */
        } else {
            const isSingleFormValid = controlsCycle(controlsCycleHandler, controls, form, null, setForm)

            if (isSingleFormValid === false) isAllFormReturnTrue = false
        }

    return isAllFormReturnTrue
}