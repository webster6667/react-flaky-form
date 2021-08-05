import {isMultiControl, isMultiForm} from '@control-utils/is-multi'
import {ControlProps, ControlsProps, FormProps} from "@common-types";

import {GetControlFromForm} from "./types"

/**
 * @description
 * Получить контрол из глобального обьекта формы, по переданным парраметрам
 *
 * @param {FormProps} form - Глобальный объект формы
 * @param {number | null} formIndex - Индекс формы (Если это мультиформа)
 * @param {number | null} controlIndex - Индекс контрола (Если это вложенный контрол)
 * @param {string | number | null} controlName - Имя контрола (username or password)
 *
 * @returns {ControlProps} - вернет контрол
 *
 */
export const getControlFromForm: GetControlFromForm = (form, controlName = null, formIndex = null, controlIndex = null) => {
    const controls: ControlsProps = isMultiForm(formIndex) ? form.controls[formIndex] : form.controls,
          control: ControlProps = isMultiControl(controlIndex) ? controls[controlName][controlIndex] : controls[controlName]

    return control
}