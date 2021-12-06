import debounce from 'debounce-wrapper';

import {requestHandler} from './helpers/request-handler'

import {LiveSearchHandler} from "./types"

/**
 * @description
 * Обработчик инпута с живым поиском
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {HookProps} hooksData - Данные для хуков
 * @param {SetForm} setForm - Функция изменяющая главный объект формы
 *
 * @returns {void}
 */
export const liveSearchHandler:LiveSearchHandler = (currentControl, hooksData, setForm) => {

    const {liveSearch, _liveSearchRequestTimeoutId: prevLiveSearchRequestTimeoutId} = currentControl,
          { debounceTime = 0 } = liveSearch,
          requestHandlerWrapper = debounceTime
              ? () => setForm(prevForm => {
                    const form = {...prevForm};
                    
                    requestHandler(currentControl, hooksData, setForm)

                    return form
              })
              : () => {
                  requestHandler(currentControl, hooksData, setForm)
              }
              


        /**
         *  Если вызов с таймаутом
         *  Отчистить старый таймаут, назначить новый
         */      
        if (debounceTime) {
            prevLiveSearchRequestTimeoutId && clearTimeout(prevLiveSearchRequestTimeoutId);

            currentControl._liveSearchRequestTimeoutId = debounce(requestHandlerWrapper, debounceTime)()
        } else {
            requestHandlerWrapper()
        }

}