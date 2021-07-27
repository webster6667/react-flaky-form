import * as VMasker from "vanilla-masker";
import {maskWriteValue} from '@validators/mask-validator'
import {validateWrittenData} from '@validators/written-live-validator'
import {validateClickedData} from '@validators/clicked-live-validator'

import {liveValidatorShowErrorHandler} from './live-validator-show-error-handler'
import {setLiveValidatorResult} from './helpers/set-live-validator-result'


import {HookProps, SetFormProps, ControlOutputDataProps} from "@common-types";
import {LiveInputHandler} from "./types"


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
     * Получить таймаут id ошибок
     * Определить тип контрола(текстовый или кликабильный)
     */
    const {
           type,
           _hideErrorTimeoutId: hasControlHideErrorTimeout = null,
           _showErrorTimeoutId: showErrorTimeoutId,
          } = currentControl,
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
        hasAnyError: false,
        isWriteInputEnable: true
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
            hasAnyError,
            writeToControlValue,
            isWriteInputEnable
        } = controlOutputData

        /**
         * Настройки вывода ошибок
         */
        const {showLiveErrorAfterFirstSubmit = false, showErrorTimeout = 0} = errorDataForControl || {},
               showLiveErrorAlways = !showLiveErrorAfterFirstSubmit

        /**
         * Настройки таймаута вывода ошибок ?
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
        if (!hasAnyError) {
            currentControl.hasError = false

            /**
             * После того как была отображенна ошибка, был создан таймер через сколько она должна скрытся
             * Если ошибка исчезает до отработки таймера, нужно отчистить таймер, для того что бы они не начали срабатывать в ненужный момент
             */
            if (hasControlHideErrorTimeout) clearTimeout(currentControl._hideErrorTimeoutId)
        }


        /**
         * Отобразить ошибки в живом времени, только после первой попытки отправки формы
         */
        if (showLiveErrorAfterFirstSubmit && isFormTriedSubmit) {
            currentControl._showErrorTimeoutId = liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, showErrorTimeoutId, showErrorTimeout)
        } else if(showLiveErrorAlways) {
            currentControl._showErrorTimeoutId = liveValidatorShowErrorHandler(errorDataForControl, hooksData, form, setForm, showErrorTimeoutId, showErrorTimeout)
        }

    }

}