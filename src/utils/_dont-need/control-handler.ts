import VMasker from 'vanilla-masker';

import {validateWritedData, validateClickedData} from "./validate-entered-data";
import {maskWriteValue} from "./mask-write-value";
import {messageParser} from "./parse-error-message";
import {getControlFromForm} from '@control-utils/get-control-from-form'

import {ControlHandler, FormProps, ControlProps, HookProps, inputEvents, SetFormProps, ValidatorErrorProps, ValidatorsSettingListInsideHandler} from "@common-types";

//@todo: убрать в хелпер
//Запускает ошибки через таймаут если они были
const errorVisibleHandler = (fn, ms: number, shouldFnCall: boolean, hooksData: HookProps, timerName:string = 'timer') => {
    const {controlIndex, formIndex, controlName} = hooksData

    //Имя по которому можно найти, таймер id
    timerName = `${timerName}_${formIndex || ''}${controlIndex || ''}${controlName}`.trim()

    return function (...args) {
        const fnCall = () => { fn.apply(this, args) }
        clearTimeout(window[timerName])

        //Запускать ли функцию после отчистки таймера
        if (shouldFnCall) {
            window[timerName] = setTimeout(fnCall, ms)
        }

    }

}

//@todo: убрать в хелпер
//Выключить таймер ошибок для контрола
const clearErrorVisibleHandlerTimeout = (hooksData: HookProps, timerName:string ):void => {

    const {controlIndex, formIndex, controlName} = hooksData,
        hiderTimerName = `${timerName}_${formIndex || ''}${controlIndex || ''}${controlName}`.trim()

    clearTimeout(window[hiderTimerName])
}


/**
 * @description
 * Обработчик всех видов входных данных
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {FormProps} form - Глобальный объект формы
 * @param {HookProps} hooksData - Данные для хуков
 * @param {typeof inputEvents} eventType - Тип сработающего события
 * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
 *
 * @returns {void}
 */
export const controlHandler: ControlHandler = (currentControl, form, hooksData, eventType, setForm):void => {

    /**
     * Определить тип контрола(текстовый или кликабильный)
     */
    const {type} = currentControl,
          textControlTypes = ['phone', 'number', 'text', 'password', 'date'],
          isTextControl = textControlTypes.includes(type)


    /**
     * 1.Определить какой из дефолтных валидаторов использовать(live валидаторов), текстовый или кликабильный
     * 2.Взять самый верхнего слой живого валидатора
     * 3.Взять дополнительный валидатор, с самого верхнего слоя, если есть
     * 4.Получить инпут маску если она есть
     * 5.Получить кастомную маску если она есть
     * 6.Получить введенное(выбранное) значение
     * 7.Проверить, была ли попытка отправить форму
     */
    const defaultValidateFunction = isTextControl ? validateWritedData : validateClickedData,
          liveValidator = currentControl.customLiveValidator || form.formSettings.customLiveValidator || defaultValidateFunction,
          additionalLiveValidator = currentControl.additionalLiveValidator || form.formSettings.additionalLiveValidator || null,
          inputMask = currentControl.inputMask || null,
          customMask = currentControl.customMask,
          newValue = hooksData.newValue,
          isFormTriedSubmit = form.formParams.triedSubmit

    const hasCustomMask = typeof customMask === 'function',
          hasMask = inputMask,
          hasLiveValidator = typeof liveValidator === "function",
          hasAdditionalLiveValidator = typeof additionalLiveValidator === "function"
        

    /**
     * 1.Введенное(нажатое) значение
     * 2.Настройки вывода ошибки
     * 3.Флаг - были ли ошибки при валидации
     * 4.Флаг - был ли заблокирован ввод в инпут(валидатором)
     * 5.Таймер - через который всплывает ошибка
     */
    let  writeToControlValue = newValue,
         errorDataForControl:ValidatorErrorProps = null,
         hasSomeError: boolean = false,
         isWriteInputEnable: boolean = true,
         debounceTimeout = 0

    //@todo объединить флаги в объект что-бы их можно было изменять внутри функции
    // let {isWriteInputEnable, hasSomeError, writeToControlValue, errorDataForControl} = {
    //         isWriteInputEnable: true,
    //         hasSomeError: false,
    //         writeToControlValue: newValue,
    //         errorDataForControl: null
    //     },
    //     debounceTimeout = 0

    /**
     * Инпут с кастомной маской
     */
    if (hasCustomMask) {
        customMask(VMasker, hooksData)
    } else if (hasMask && !Array.isArray(newValue)) {
    /**
     * Инпут с обычной маской
     */
        maskWriteValue(inputMask, currentControl, newValue, eventType)
    } else {

        //@todo объединить live и additional одной функцией
        /**
         * Живой валидатор
         */
        if (hasLiveValidator) {
            const {shouldLockInput = false, hasError = false, modifiedValueToWrite = null, errorData = null} = liveValidator(hooksData) || {}
            
            if (shouldLockInput) isWriteInputEnable = false
            if (hasError) hasSomeError = true

            //Если передали модифицированное значение для записи, записать его
            if (modifiedValueToWrite) writeToControlValue = modifiedValueToWrite

            //Отобразить ошибку валидатора
            if (errorData) {errorDataForControl = errorData}
        }

        //@todo объединить live и additional одной функцией
        /**
         * Дополнительный валидатор
         */
        if (hasAdditionalLiveValidator) {
            const {shouldLockInput = false, hasError = false, modifiedValueToWrite = null, errorData = null} = additionalLiveValidator(hooksData) || {}

            if (shouldLockInput) isWriteInputEnable = false
            if (hasError) hasSomeError = true

            //Если передали модифицированное значение для записи, записать его
            if (modifiedValueToWrite) writeToControlValue = modifiedValueToWrite

            //Отобразить ошибку дополнительного валидатора
            if (errorData) {errorDataForControl = errorData}
        }

        /**
         * Настройки вывода ошибок(?)
         */
        const {showLiveErrorAfterFirstSubmit = false, showErrorTimeout = 0} = errorDataForControl || {}

        /**
         * Настройки таймаута вывода ошибок
         */
        debounceTimeout = showErrorTimeout ? showErrorTimeout : 0

        /**
         * Записать новое значение, если инпут нигде не был заблокирован
         */
        if (isWriteInputEnable) {
            currentControl.value = writeToControlValue
        }

        /**
         * Выключить флаг наличия ошибки у контрола
         */
        if (hasSomeError === false) {
            currentControl.hasError = false

            //Очистить таймауты скрытия
            clearErrorVisibleHandlerTimeout(hooksData, 'hideError')
        }


        //Функция отображения ошибки с задержкой
        const showError = errorVisibleHandler((errorDataForControl: ValidatorErrorProps, controlLabel: string, writeToControlValue: string | number, hooksData: HookProps, setForm: SetFormProps) => {
            
            
                setForm((form) => {
                    const {controlIndex, formIndex, controlName} = hooksData,
                          currentControl = getControlFromForm(form, formIndex, controlIndex, controlName),
                          {message = null, limit = null, hideErrorTimeout = null} = errorDataForControl || {},
                          beforeError = currentControl.beforeLiveValidatorError || form.formSettings.beforeLiveValidatorError || null,
                          afterError = currentControl.afterLiveValidatorError || form.formSettings.afterLiveValidatorError || null

                    //Хук перед всплытием ошибки
                    if (typeof beforeError === "function") {
                        beforeError(hooksData)
                    }

                        //Распарсить ошибку
                    if (errorDataForControl) {
                        currentControl.error = messageParser(message, controlLabel, writeToControlValue, limit)
                    }

                    //Отобразить ошибку
                    currentControl.hasError = true

                    //Скрыть ошибку через указанное время
                    const hideError = errorVisibleHandler((hooksData: HookProps, setForm: SetFormProps) => {

                            setForm((form) => {
                                const {controlIndex, formIndex, controlName} = hooksData,
                                    currentControl = getControlFromForm(form, formIndex, controlIndex, controlName)

                                currentControl.hasError = false
                            })

                    }, hideErrorTimeout, true, hooksData, 'hideError')


                    //Прятать ошибку через таймаут, если его указали
                    if (hideErrorTimeout) {
                        hideError(hooksData, setForm)
                    }

                    //Хук после всплытием ошибки
                    if (typeof afterError === "function") {
                        afterError(hooksData)
                    }

                })

        }, debounceTimeout, hasSomeError, hooksData, 'showError')


        //Если отображать нужно отображать ошибку только после первой отправки
        if (showLiveErrorAfterFirstSubmit && isFormTriedSubmit) {
            showError(errorDataForControl, currentControl.label, writeToControlValue, hooksData, setForm)
        } else if(showLiveErrorAfterFirstSubmit === false) {
            showError(errorDataForControl, currentControl.label, writeToControlValue, hooksData, setForm)
        }

    }

}