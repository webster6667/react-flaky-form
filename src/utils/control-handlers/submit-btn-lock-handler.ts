import {ShouldLockSubmitBtnByControl} from "./types"

import {CurrentControlData, HookProps} from "@common-types"


/**
 * @description
 * Функция проходит через данные контрола, и на их основании определяет блокировать ли кнопку ввода
 *
 * @param {CurrentControlData} currentControlData - Все данные по переданному контролу
 * @param {FormProps} form - главный объект формы
 *
 * @returns {boolean}
 *
 */
export const shouldLockSubmitBtnByControl:ShouldLockSubmitBtnByControl = (currentControlData, form) => {

    //Определить тип блокирования кнопки
    let lockSubmitBtnEvent = form.formSettings.lockSubmitBtnEvent,
        shouldLockSubmitBtn = false,
        {currentControl} = currentControlData

    //дополнительный валидатор кнопки
    const additionalLockSubmitBtnValidator = currentControl.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null


    //Данные для хуков
    const hookData: HookProps = {...currentControlData, newValue: currentControl.value, selectedValue: null, form}

    //Валидатор на обязательные поля
    if (lockSubmitBtnEvent === 'required-empty') {


        if (control.validateRules && control.validateRules.required) {

            if(control.value === '' || Array.isArray(control.value) && control.value.length === 0) {
                shouldLockSubmitBtn = true
            }

        }

    }

    //Валидатор блокирующий по функциям
    if (lockSubmitBtnEvent === 'lock-validator-has-error') {
        //Взять любой из слоев валидатора кнопки
        const lockSubmitValidator = control.customLockSubmitBtnValidator || form.formSettings.customLockSubmitBtnValidator || defaultLockSubmitBtnValidator

        //Если контрол не проходит функциональный валидатор - блокируем кнопку
        if (typeof lockSubmitValidator === 'function') {
            // shouldLockSubmitBtn = true
            shouldLockSubmitBtn = lockSubmitValidator(hookData)
        }

    }

    //Блокировать кнопку, если не прошли дополнительные условия
    if (typeof additionalLockSubmitBtnValidator === "function") {
        shouldLockSubmitBtn = additionalLockSubmitBtnValidator(hookData)
    }

    return shouldLockSubmitBtn
}

/**
 * @description
 * Функция проходит через данные всех контролов, и на их основании определяет нужно ли блокировать кнопку
 *
 * @param {ControlProps} control - Контрол которому добавляют настройки
 * @param {string} controlName - Имя контрола(username or password)
 * @param {FormProps} form - главный объект формы
 * @param {number} formIndex - Индекс формы
 * @param {number} controlIndex - Индекс вложенного контрола
 *
 * @returns {boolean}
 *
 */
export const shouldLockSubmitBtnByForm = (form: FormProps) => {

    //Пройтись циклам по всем контролам, чтоб узнать есть ли в одном из них ошибка
    const shouldLockSubmitBtn = formCycle(form, shouldLockSubmitBtnByControl)

    return shouldLockSubmitBtn
}
