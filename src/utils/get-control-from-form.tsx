import {ControlProps, ControlsProps, FormProps} from "./../types";

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
export const getControlFromForm = (form: FormProps, formIndex: number | null = null, controlIndex: number | null = null, controlName: string | number | null = null):ControlProps => {

    /**
     * 1.Определить вид формы(одиночная или мульти)
     * 2.Определить вид контрола(одиночный или вложенный)
     */
    const isMultiForm = formIndex !== null,
          isMultiControl = controlIndex !== null

    const controls: ControlsProps = isMultiForm ? form.controls[formIndex] : form.controls,
          control: ControlProps = isMultiControl ? controls[controlName][controlIndex] : controls[controlName]

    return control
}