import * as VMasker from "vanilla-masker";
import {maskWriteValue} from '@validators/mask-validator'
import {validateWrittenData} from '@validators/written-live-validator'
import {validateClickedData} from '@validators/clicked-live-validator'


import {getControlFromForm} from "@control-utils/get-control-from-form";

import {HookProps, SetFormProps, ValidatorErrorProps, ControlOutputDataProps} from "@common-types";
import {LiveInputHandler} from "./types"

import {setLiveValidatorResult} from './helpers/set-live-validator-result'

/**
 * @description
 * Обработчик всех видов входных данных при вводе
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {FormProps} form - Глобальный объект формы
 * @param {HookProps} hooksData - Данные для хуков
 * @param {typeof inputEvents} eventType - Тип сработающего события
 * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
 *
 * @returns {void}
 */
export const liveInputHandler: LiveInputHandler = (currentControl, form, hooksData, eventType, setForm) => {

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
    const defaultValidateFunction = isTextControl ? validateWrittenData : validateClickedData,
        liveValidator = currentControl.customLiveValidator || form.formSettings.customLiveValidator || defaultValidateFunction,
        additionalLiveValidator = currentControl.additionalLiveValidator || form.formSettings.additionalLiveValidator || null,
        inputMask = currentControl.maskSetting || null,
        customMask = currentControl.customMask,
        newValue = hooksData.newValue,
        isFormTriedSubmit = form.formParams.triedSubmit

    /**
     * Проверка наличия всех валидаторов
     */
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
    const controlOutputData: ControlOutputDataProps<typeof newValue> = {
        writeToControlValue: newValue,
        errorDataForControl: null,
        hasError: false,
        isWriteInputEnable: true,
        debounceTimeout: 0
    }


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

        /**
         * Записать результаты живого валидатора в объект вывода
         */
        if (hasLiveValidator) setLiveValidatorResult(liveValidator, hooksData, controlOutputData)


        /**
         * Записать результаты дополнительного живого валидатора в объект вывода
         */
        if (hasAdditionalLiveValidator) setLiveValidatorResult(additionalLiveValidator, hooksData, controlOutputData)

        const {
            errorDataForControl,
            hasError,
            writeToControlValue,
            isWriteInputEnable,
            debounceTimeout
        } = controlOutputData

        /**
         * Настройки вывода ошибок(?)
         */
        const {showLiveErrorAfterFirstSubmit = false, showErrorTimeout = 0} = errorDataForControl || {}

        /**
         * Настройки таймаута вывода ошибок
         */
        // debounceTimeout = showErrorTimeout ? showErrorTimeout : 0

        /**
         * Записать новое значение, если инпут нигде не был заблокирован
         */
        if (isWriteInputEnable) {
            currentControl.value = writeToControlValue
        }

        /**
         * Выключить флаг наличия ошибки у контрола
         */
        if (!hasError) {
            currentControl.hasError = false

            //Очистить таймауты скрытия??
            // clearErrorVisibleHandlerTimeout(hooksData, 'hideError')
        }

        // //Функция отображения ошибки с задержкой
        // const showError = errorVisibleHandler((errorDataForControl: ValidatorErrorProps, controlLabel: string, writeToControlValue: string | number, hooksData: HookProps, setForm: SetFormProps) => {
        //
        //
        //     setForm((form) => {
        //         const {controlIndex, formIndex, controlName} = hooksData,
        //             currentControl = getControlFromForm(form, formIndex, controlIndex, controlName),
        //             {message = null, limit = null, hideErrorTimeout = null} = errorDataForControl || {},
        //             beforeError = currentControl.beforeLiveValidatorError || form.formSettings.beforeLiveValidatorError || null,
        //             afterError = currentControl.afterLiveValidatorError || form.formSettings.afterLiveValidatorError || null
        //
        //         //Хук перед всплытием ошибки
        //         if (typeof beforeError === "function") {
        //             beforeError(hooksData)
        //         }
        //
        //         //Распарсить ошибку
        //         if (errorDataForControl) {
        //             currentControl.error = messageParser(message, controlLabel, writeToControlValue, limit)
        //         }
        //
        //         //Отобразить ошибку
        //         currentControl.hasError = true
        //
        //         //Скрыть ошибку через указанное время
        //         const hideError = errorVisibleHandler((hooksData: HookProps, setForm: SetFormProps) => {
        //
        //             setForm((form) => {
        //                 const {controlIndex, formIndex, controlName} = hooksData,
        //                     currentControl = getControlFromForm(form, formIndex, controlIndex, controlName)
        //
        //                 currentControl.hasError = false
        //             })
        //
        //         }, hideErrorTimeout, true, hooksData, 'hideError')
        //
        //
        //         //Прятать ошибку через таймаут, если его указали
        //         if (hideErrorTimeout) {
        //             hideError(hooksData, setForm)
        //         }
        //
        //         //Хук после всплытием ошибки
        //         if (typeof afterError === "function") {
        //             afterError(hooksData)
        //         }
        //
        //     })
        //
        // }, debounceTimeout, hasSomeError, hooksData, 'showError')
        //
        //
        // //Если отображать нужно отображать ошибку только после первой отправки
        // if (showLiveErrorAfterFirstSubmit && isFormTriedSubmit) {
        //     showError(errorDataForControl, currentControl.label, writeToControlValue, hooksData, setForm)
        // } else if(showLiveErrorAfterFirstSubmit === false) {
        //     showError(errorDataForControl, currentControl.label, writeToControlValue, hooksData, setForm)
        // }

    }

}