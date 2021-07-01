export const isControlBtnSubmitValidationSuccess = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null) => {

    //Определить тип блокирования кнопки
    let lockSubmitBtnEvent = form.formSettings.lockSubmitBtnEvent,
        isControlBtnSubmitValidationSuccess = true

    //дополнительный валидатор кнопки
    const additionalLockSubmitBtnValidator = control.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null


    //Данные для хуков
    const hookData: HookProps = {currentControl: control, controlIndex, formIndex, controlName, newValue: control.value, form}

    //Валидатор на обязательные поля
    if (lockSubmitBtnEvent === 'required-empty') {


        if (control.validateRules && control.validateRules.required) {

            if(control.value === '' || Array.isArray(control.value) && control.value.length === 0) {
                isControlBtnSubmitValidationSuccess = false
            }

        }

    }

    //Валидатор блокирующий по функциям
    if (lockSubmitBtnEvent === 'lock-validator-has-error') {
        //Взять любой из слоев валидатора кнопки
        const lockSubmitValidator = control.customLockSubmitBtnValidator || form.formSettings.customLockSubmitBtnValidator || defaultLockSubmitBtnValidator

        //Если контрол не проходит функциональный валидатор - блокируем кнопку
        if (typeof lockSubmitValidator === 'function') {
            isControlBtnSubmitValidationSuccess = lockSubmitValidator(hookData)
        }

    }

    //Блокировать кнопку, если не прошли дополнительные условия
    if (typeof additionalLockSubmitBtnValidator === "function") {
        isControlBtnSubmitValidationSuccess = additionalLockSubmitBtnValidator(hookData)
    }

    return isControlBtnSubmitValidationSuccess
}