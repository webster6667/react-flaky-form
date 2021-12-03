import axios from 'axios'
import debounce from 'debounce-wrapper';

/**
 * @description
 * Обработчик инпута с живым поиском
 *
 * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
 * @param {FormProps} form - Глобальный объект формы
 * @param {HookProps} hooksData - Данные для хуков
 * @param {SetForm} setForm - Функция изменяющая главный объект формы
 *
 * @returns {void}
 */
export const liveSearchHandler = (currentControl, hooksData, setForm) => {

    const { request, debounceTime = 0 } = currentControl.liveSearch,
          {
           url,
           method = 'get',
           data = {}
          } = debounceTime ? debounce((hooksData) => request(hooksData), debounceTime) : request(hooksData)


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