export const defaultLockSubmitBtnValidator = (hookData: HookProps):boolean => {
    let {form, currentControl: control} = hookData,
        {value: controlValue = '', validateRules = {}, validatorsSetting = {}} = control,
        currentControlLength = String(controlValue).length,
        isControlValid = true,
        {email: emailSetting} = validatorsSetting,
        {number: numberRules = {}} = validateRules,
        isInputNumberValid = inputNumberValidator(controlValue, numberRules),
        additionalLockSubmitBtnValidator = control.additionalLockSubmitBtnValidator || form.formSettings.additionalLockSubmitBtnValidator || null

    //Если поле с маской
    if (control.inputMask || control.customMask) {

        let requiredRules = validateRules.required

        //Выдать ошибку если поле с маской пустое
        if (requiredRules && controlValue === '') {
            isControlValid = false
        }

        //Выдать ошибку если обязательное поле не заполнено по маске
        if (requiredRules && control.hasError) {
            isControlValid = !control.hasError
        }


    } else if (validateRules) {

        let minValueRules = validateRules.minValue,
            maxValueRules = validateRules.maxValue,
            minLengthRules = validateRules.minLength,
            maxLengthRules = validateRules.maxLength,
            validNumberRules = validateRules.number,
            requiredRules = validateRules.required,
            emailRules = validateRules.email


        //Меньше лимита
        if (minValueRules && typeof Number(controlValue) === 'number' && controlValue < minValueRules.limit) {
            isControlValid = false
        }

        //Больше лимита
        if (maxValueRules && typeof Number(controlValue) === 'number' && controlValue > maxValueRules.limit) {
            isControlValid = false
        }

        //Короче лимита
        if (minLengthRules && currentControlLength < minLengthRules.limit) {
            isControlValid = false
        }

        //Длиннее лимита
        if (maxLengthRules && currentControlLength > maxLengthRules.limit) {
            isControlValid = false
        }

        //Не валидные цифры
        if (validNumberRules && !isInputNumberValid) {
            isControlValid = false
        }

        //Валидатор емаила
        if (emailRules) {
            let isMailInvalid = controlValue === '' ? false : !/.+@.+\..+/i.test(String(controlValue))


            //Не валидный емаил
            if (isMailInvalid) {
                isControlValid = false
            }

        }

        //Обязательное поле пусто
        if (requiredRules) {

            if (control.value === '' || Array.isArray(control.value) && control.value.length === 0) {
                isControlValid = false
            }

        }

    }

    //Дополнительный валидатор
    if (typeof additionalLockSubmitBtnValidator === 'function') {
        const isAdditionalValidatorSuccess = additionalLockSubmitBtnValidator(hookData)

        if (!isAdditionalValidatorSuccess) {
            isControlValid = false
        }

    }

    //Валидный контрол или нет
    return isControlValid
}
