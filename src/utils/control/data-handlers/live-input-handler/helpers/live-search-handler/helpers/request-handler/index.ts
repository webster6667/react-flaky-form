import axios from 'axios'

import {RequestHandler} from "./types"

/**
 * @description
 * Обработчик запроса для живого инпута
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {HookProps} hooksData - Данные для хуков
 * @param {SetForm} setForm - Функция изменяющая главный объект формы
 *
 * @returns {void}
 */
export const requestHandler: RequestHandler = ( currentControl, hooksData, setForm) => {

    const { request } = currentControl.liveSearch

    const {
        url,
        method = 'get',
        data = {}
    } = request(hooksData)

    if (url) {

        currentControl.liveSearch.isLoading = true

        axios({
            method,
            url,
            data
        }).then(requestResult => {

            const {controlName} = hooksData

            setForm((prevForm) => {
                const form = {...prevForm},
                      control = form.controls[controlName]

                /**
                 * Выключить режим ожидания
                 */
                control.liveSearch.isLoading = false

                /**
                 * Результат живого запроса
                 */
                const foundedData = control.liveSearch.response(hooksData, requestResult)

                control.liveSearch.foundedData = foundedData || requestResult


                return form
            })

        })

    }

}