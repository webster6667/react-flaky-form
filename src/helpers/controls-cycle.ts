import {
    ControlProps,
    ControlsProps,
    FormProps, SetFormProps
} from "../types";

//Прогнать все контролы формы в цикле
export const controlsCycle = (controlsCycleFunction: (control: ControlProps, controlName: string, form: FormProps, formIndex?: number | null, controlIndex?: number | null, setForm?: SetFormProps) => boolean, formControls: ControlsProps | ControlsProps[], form: FormProps, formIndex: number | null = null, setForm: SetFormProps = null):boolean => {

    let isAllControlsReturnTrue: boolean = true

    //Все контролы отдельной формы
    Object.keys(formControls).forEach((controlName) => {
        let control = formControls[controlName]

        //Группа контролов
        if (Array.isArray(control)) {

            control.forEach((controlItem, controlIndex) => {
                const isControlReturnTrue = controlsCycleFunction(controlItem, controlName, form, formIndex, controlIndex, setForm)

                if (isControlReturnTrue !== true) isAllControlsReturnTrue = false
            })

        //Одиночный контрол
        } else {
            const isControlReturnTrue = controlsCycleFunction(control, controlName, form, formIndex, null, setForm)

            if (isControlReturnTrue !== true) isAllControlsReturnTrue = false
        }

    })

    return isAllControlsReturnTrue
}

//Прогнать все формы в цикле
export const formCycle = (form: FormProps, controlsCycleFunction, setForm?: SetFormProps):boolean => {
        const controls = form.controls

        let isAllFormReturnTrue: boolean = true

        //Прогнать все формы через цикл
        if (Array.isArray(controls)) {

            controls.forEach((controls: ControlsProps, formIndex) => {
                const isSingleFormValid = controlsCycle(controlsCycleFunction, controls, form, formIndex, setForm)

                if (isSingleFormValid === false) isAllFormReturnTrue = false
            })

        //Прогнать одну форму через цикл
        } else {
            const isSingleFormValid = controlsCycle(controlsCycleFunction, controls, form, null, setForm)

            if (isSingleFormValid === false) isAllFormReturnTrue = false
        }

    return isAllFormReturnTrue
}