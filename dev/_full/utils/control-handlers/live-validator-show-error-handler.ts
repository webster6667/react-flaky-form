import debounce from 'debounce-wrapper';

import {defaultLiveErrorHandler} from '@error-handlers/live-validator-error-handler'

import {ValidatorErrorProps, HookProps, SetFormProps, FormProps} from "@common-types"
import {LiveValidatorShowErrorHandler} from "./types"

/**
 * @description
 * Функция которая выбирает обработчик ошибки, и обрабатывает его вместе с дебаунсом
 *
 * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
 * @param {HookProps} hooksData - Данные хука
 * @param {FormProps} form - Глобальный объект формы
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 * @param {NodeJS.Timeout | null} prevShowErrorTimeoutId - id предыдущего дебаунса для очистки
 * @param {number} ms - через сколько должен сработать обработчик
 *
 * @returns {void}
 *
 */
export const liveValidatorShowErrorHandler:LiveValidatorShowErrorHandler = (errorDataForControl, hooksData, form, setForm, prevShowErrorTimeoutId, ms = 0) => {


    //@todo: Добавить кастомные обработчики живых ошибок form.customLiveErrorHandler || control.customLiveErrorHandler
    //@todo: Добавить additionalLiveErrorHandler

    const shouldUseDebounce = Boolean(ms),
          errorHandler = shouldUseDebounce
              ? () => setForm((prevForm) => {
                  form = {...prevForm}
                  defaultLiveErrorHandler(errorDataForControl, hooksData, form, setForm)
                  return form
              })
              : () => defaultLiveErrorHandler(errorDataForControl, hooksData, form, setForm),
          callShowError = debounce(errorHandler, ms),
          {hasError} = errorDataForControl

    let currentShowErrorTimeoutId = null



    /**
     * Обработать ошибку с дебаунсом или нет
     */
    if (shouldUseDebounce) {

        /**
         * Если ошибки нет, просто закрыть таймер отображения всех ошибок
         * Если есть ошибка, отобразить в дебаунсе, если нет, закрыть предыдущий таймер
         */
        if (hasError) {
            clearTimeout(prevShowErrorTimeoutId)
            currentShowErrorTimeoutId = callShowError()
        } else if(prevShowErrorTimeoutId) {
            clearTimeout(prevShowErrorTimeoutId)
        }

    } else {

        if (hasError) {
            errorHandler()
        }

    }

    return currentShowErrorTimeoutId
}