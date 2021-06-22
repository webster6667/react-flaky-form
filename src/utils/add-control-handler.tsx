// import {toggleSubmitBtnLockRelativeLockValidatorError} from './lock-submit-btn-validator'
import {getControlFromForm} from './get-control-from-form'
import {controlHandler} from './control-handlers'

import {
    HookProps,
    inputEvents,
    SetFormProps
} from "./../types"


/**
 * @description
 * Функция добавить обработку входных данных, для всех типов контролов,
 * Обработчики работают для всех типов контролов, даже если их типы меняются динамически
 *
 * @param {string | number} newValue - Новое значение которое выбирают или вводят
 * @param {string} controlName - Имя контрола (username or password)
 * @param {number | null} controlIndex - Индекс элемента вложенного контрола(если это вложенный контрол)
 * @param {number | null} formIndex - Индекс формы(если это мульти форма)
 * @param {SetForm} SetFormProps - Функция изменяющая главный объект формы
 * @param {typeof inputEvents} eventType - Тип события который произошел на контроле
 * @param {string | number} selectedValue - Выбранное значение если это кликабильный контрол
 *
 * @returns {void}
 */
export const addControlHandler = (newValue: string | number,
                                  controlName: string,
                                  controlIndex: number | null = null,
                                  formIndex: number | null = null,
                                  setForm: SetFormProps,
                                  eventType: typeof inputEvents = null,
                                  selectedValue: string | number | null
                                  ):void => {

        setForm((form) => {

            /**
             * 1.Получить контрол на который будет повешен обработчик
             * 2.Собрать все данные для хуков обработчика
             */
            const currentControl = getControlFromForm(form, formIndex, controlIndex, controlName),
                  hookData: HookProps = {currentControl, controlIndex, formIndex, controlName, newValue, form, selectedValue}

            /**
             * Получить хуки контрола
             */
            const beforeChange = currentControl.beforeChange || form.formSettings.beforeChange || null,
                  afterChange = currentControl.afterChange || form.formSettings.afterChange || null

            /**
             * @description
             * Хук срабатывающий до изменения значения инпута
             * В нем можно менять весь объект формы, но исходящие данные из инпута и ошибки
             * Будут перезатерты после изменения значения инпута
             */
            if (typeof beforeChange === "function") {
                beforeChange(hookData)
            }

            /**
             * @description
             * Функция изменения значения(валидация, запись ошибок, запись значения, блокировка записи)
             */
            controlHandler(currentControl, form, hookData, eventType, setForm)


            /**
             * @description
             * Хук срабатывающий после изменения значения инпута
             * В нем можно менять весь объект формы, а так же введенные значения и ошибки
             */
            if (typeof afterChange === "function") {
                afterChange(hookData)
            }

            //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
            // toggleSubmitBtnLockRelativeLockValidatorError(form)
        })

}