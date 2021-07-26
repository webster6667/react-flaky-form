import messageLayoutsReplacer from 'message-layouts-replacer';

import {getControlFromForm} from '@control-utils/get-control-from-form'

import {hideLiveErrorAfterTimeout} from './helpers/hide-live-error-after-timeout'

import {HookProps, SetFormProps} from "@common-types";
import {DefaultLiveErrorHandler} from "./types";

/**
 * @description
 * Дефолтный обработчик живых ошибок(парсинг, отображение, скрытие)
 *
 * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
 * @param {HookProps} hooksData - Данные хука
 * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
 *
 * @returns {void}
 *
 */
export const defaultLiveErrorHandler:DefaultLiveErrorHandler = (errorDataForControl, hooksData, setForm) => {


    setForm((form) => {

        
        const {controlName, formIndex, controlIndex, newValue: writeToControlValue} = hooksData,
              currentControl = getControlFromForm(form, controlName, formIndex, controlIndex),
              {label: controlLabel} = currentControl,
              {message = null, limit = null, hideErrorTimeout = null} = errorDataForControl || {},
              beforeError = currentControl.beforeLiveValidatorError || form.formSettings.beforeLiveValidatorError || null,
              afterError = currentControl.afterLiveValidatorError || form.formSettings.afterLiveValidatorError || null

        /**
         * Хук перед всплытием ошибки
         */
        if (typeof beforeError === "function") {
            beforeError(hooksData)
        }

        /**
         * Заменить шаблонные слова в тексте ошибки, на значения
         */
        if (errorDataForControl) {

            currentControl.error = messageLayoutsReplacer(message, [
                {
                    searchLayout: '{limit}',
                    valueToReplace: limit
                },
                {
                    searchLayout: 'limitForDecline',
                    valueToReplace: limit
                },
                {
                    searchLayout: '{label}',
                    valueToReplace: controlLabel
                },
                {
                    searchLayout: '{writeValue}',
                    valueToReplace: writeToControlValue
                }
            ])
        }

        /**
         * Отобразить ошибку
         */
        currentControl.hasError = true


        /**
         * Скрыть ошибку через таймаут если его указали
         */
        if (hideErrorTimeout) {
            const timeoutName = [controlName, formIndex, controlIndex].toString()
            
            console.log(timeoutName);

            form.formParams.errorTimeoutList[timeoutName] = hideLiveErrorAfterTimeout(hooksData, setForm, hideErrorTimeout)
        }

        /**
         * Хук после всплытием ошибки
         */
        if (typeof afterError === "function") {
            afterError(hooksData)
        }

    })



}
