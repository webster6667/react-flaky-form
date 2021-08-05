import {toggleSubmitBtnLockRelativeLockValidatorError} from './lock-submit-btn-validator'
import {getControlFromForm} from './get-control-from-form'
import {controlHandler} from './control-handlers'

import {
    HookProps,
    inputEvents,
    SetFormProps
} from "./../types"


//Добавить обработчик для всех типов контрола
export const addControlHandler = (newValue: string | number,
                                  controlName: string,
                                  controlIndex: number | null = null,
                                  formIndex: number | null = null,
                                  setForm: SetFormProps,
                                  eventType: typeof inputEvents = null,
                                  selectedValue: string | number | null
                                  ) => {

        setForm((form) => {

            //Получить контрол из группы контролов
            const currentControl = getControlFromForm(form, formIndex, controlIndex, controlName),
                  hookData: HookProps = {currentControl, controlIndex, formIndex, controlName, newValue, form, selectedValue}

            //Общие хуки
            const beforeChange = currentControl.beforeChange || form.formSettings.beforeChange || null,
                  afterChange = currentControl.afterChange || form.formSettings.afterChange || null

            //До изменения value
            if (typeof beforeChange === "function") {
                beforeChange(hookData)
            }

            //Выполнить функцию обработки изменения значения
            controlHandler(currentControl, form, hookData, eventType, setForm)

            //событие после изменения value
            if (typeof afterChange === "function") {
                afterChange(hookData)
            }

            //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
            toggleSubmitBtnLockRelativeLockValidatorError(form)
        })

}