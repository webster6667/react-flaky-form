import {
    FormControls,
    SingleControl,
    ControlProps,
    ControlsProps,
    FormProps, SetFormProps
} from "../types";

/**
 * Функция обработчик для каждого отдельного контрола
 */
type ControlsCycleFunction = (
    control: ControlProps,
    controlName: string,
    form: FormProps,
    formIndex?: number | null,
    controlIndex?: number | null,
    setForm?: SetFormProps
) => boolean

/**
 * @description
 * Функция проходящая циклом по всем контролам, применяя к ним переданную функцию
 *
 * @param {ControlsCycleFunction} controlsCycleFunction - Функция проходящая в цикле по всем контролам.
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
export const controlsCycle = (controlsCycleFunction: ControlsCycleFunction, formControls: FormControls, form: FormProps, formIndex: number | null = null, setForm: SetFormProps = null):boolean => {

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
                const isControlReturnTrue = controlsCycleFunction(controlItem, controlName, form, formIndex, controlIndex, setForm)

                if (isControlReturnTrue !== true) isAllControlsReturnTrue = false
            })

        /**
         * Одиночный контрол
         */
        } else {
            const isControlReturnTrue = controlsCycleFunction(control, controlName, form, formIndex, null, setForm)


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
 * @param {ControlsCycleFunction} controlsCycleFunction - Функция проходящая в цикле по всем контролам.
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
export const formCycle = (form: FormProps<FormControls>, controlsCycleFunction: ControlsCycleFunction, setForm?: SetFormProps):boolean => {
        const controls = form.controls


        let isAllFormReturnTrue: boolean = true

        /**
         * Обработка мульти формы
         */
        if (Array.isArray(controls)) {

            controls.forEach((controls: ControlsProps, formIndex) => {
                const isSingleFormValid = controlsCycle(controlsCycleFunction, controls, form, formIndex, setForm)

                if (isSingleFormValid === false) isAllFormReturnTrue = false
            })

        /**
         * Обработка обычной формы
         */
        } else {
            const isSingleFormValid = controlsCycle(controlsCycleFunction, controls, form, null, setForm)

            if (isSingleFormValid === false) isAllFormReturnTrue = false
        }

    return isAllFormReturnTrue
}