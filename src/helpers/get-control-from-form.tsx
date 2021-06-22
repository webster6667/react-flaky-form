import {ControlProps, ControlsProps, FormProps} from "./../types";

//Вытянуть контрол из формы
export const getControlFromForm = (form: FormProps, formIndex: number | null = null, controlIndex: number | null = null, controlName: string | number | null = null):ControlProps => {

    //Определить вид контрола и формы (групповой или одиночный)
    const isMultiForm = formIndex !== null,
          isMultiControl = controlIndex !== null

    const controls: ControlsProps = isMultiForm ? form.controls[formIndex] : form.controls,
          control: ControlProps = isMultiControl ? controls[controlName][controlIndex] : controls[controlName]

    return control
}