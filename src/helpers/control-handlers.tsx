import VMasker from 'vanilla-masker';

import {validateWritedData, validateClickedData} from "./validate-entered-data";
import {maskWriteValue} from "./mask-write-value";
import {messageParser} from "./parse-error-message";
import {getControlFromForm} from './get-control-from-form'

import {ControlHandler, HookProps, SetFormProps, ValidatorErrorProps} from "../types";

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

//Выключить таймер ошибок для контрола
const clearErrorVisibleHandlerTimeout = (hooksData: HookProps, timerName:string ):void => {

    const {controlIndex, formIndex, controlName} = hooksData,
        hiderTimerName = `${timerName}_${formIndex || ''}${controlIndex || ''}${controlName}`.trim()

    clearTimeout(window[hiderTimerName])
}

//Обработчик текстовых контролов
export const  controlHandler: ControlHandler = (currentControl, form, hooksData, eventType, setForm) => {

    const {type} = currentControl,
          textControlTypes = ['phone', 'number', 'text', 'password', 'date'],
          isTextControl = textControlTypes.includes(type)



    const defaultValidateFunction = isTextControl ? validateWritedData : validateClickedData,
          liveValidator = currentControl.customLiveValidator || form.formSettings.customLiveValidator || defaultValidateFunction,
          additionalLiveValidator = currentControl.additionalLiveValidator || form.formSettings.additionalLiveValidator || null,
          inputMask = currentControl.inputMask || null,
          customMask = currentControl.customMask,
          newValue = hooksData.newValue,
          isFormTriedSubmit = form.formParams.triedSubmit


        let  writeToControlValue = newValue,
         errorDataForControl:ValidatorErrorProps = null

    let hasSomeError: boolean = false,
        isWriteInputEnable: boolean = true,
        debounceTimeout = 0

    // Кастомная маска
    if (typeof customMask === 'function') {
        customMask(VMasker, hooksData)
        //Дефолтные маск
    } else if (inputMask && !Array.isArray(newValue)) {
        maskWriteValue(inputMask, currentControl, newValue, eventType)
        //Валидаторы ввода
    } else {

        //Живой валидатор
        if (typeof liveValidator === "function") {
            const {shouldLockInput = false, hasError = false, modifiedValueToWrite = null, errorData = null} = liveValidator(hooksData) || {}
            
            if (shouldLockInput) isWriteInputEnable = false
            if (hasError) hasSomeError = true

            //Если передали модифицированное значение для записи, записать его
            if (modifiedValueToWrite) writeToControlValue = modifiedValueToWrite

            //Отобразить ошибку валидатора
            if (errorData) {errorDataForControl = errorData}
        }

        //Дополнительный живой валидатор
        if (typeof additionalLiveValidator === "function") {
            const {shouldLockInput = false, hasError = false, modifiedValueToWrite = null, errorData = null} = additionalLiveValidator(hooksData) || {}

            if (shouldLockInput) isWriteInputEnable = false
            if (hasError) hasSomeError = true

            //Если передали модифицированное значение для записи, записать его
            if (modifiedValueToWrite) writeToControlValue = modifiedValueToWrite

            //Отобразить ошибку дополнительного валидатора
            if (errorData) {errorDataForControl = errorData}
        }

        const {showLiveErrorAfterFirstSubmit = false, showErrorTimeout = 0} = errorDataForControl || {}

        debounceTimeout = showErrorTimeout ? showErrorTimeout : 0

        //Записать новое значение, если инпут нигде не был заблокирован
        if (isWriteInputEnable) {
            currentControl.value = writeToControlValue
        }

        //Скрыть ошибку если все чисто
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