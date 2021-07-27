import {GetControlTimerName, ControlIdsProps} from "./types"

/**
 * @description
 * Функция возвращает имя для таймера для текущего контрола + кодовое слова действия
 *
 * @param {ControlIdsProps} hooksData - данные для хука(данные контрола)
 * @param {string} timerActionName - кодовое слово действия таймера
 * @returns {string}
 *
 * @example
 * function() // => true
 */
export const getControlTimerName: GetControlTimerName = ({controlIndex = null, formIndex = null, controlName}, timerActionName) => {
    const timerName = `${timerActionName}_${formIndex || ''}${controlIndex || ''}${controlName}`.trim()

    return timerName
}