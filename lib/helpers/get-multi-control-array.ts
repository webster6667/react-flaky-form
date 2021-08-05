//Определить массив контрола (в группе форм, или просто мульти контрол)
import {ControlProps, ControlsProps} from "./../types";

export const getMultiControlArray = (controls: ControlsProps | ControlsProps[], controlName: string, formIndex: number | null = null):ControlProps[] => {
    let controlArray:ControlProps[] = []

    //Если группа форм, отдать массив контрола из этой формы
    if (Array.isArray(controls)) {

        //Если передали индекс формы
        if (formIndex !== null) {
            controlArray = controls[formIndex][controlName] as ControlProps[]
        }

        //Если одиночная форма, просто отдать массив мультиконтрола
    } else {
        controlArray = controls[controlName] as ControlProps[]
    }

    return controlArray
}