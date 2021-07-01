import {LiveValidatorProps, ValidatorErrorProps, ValidatorSettingProps} from "@src/types";

export const validateClickedData:LiveValidatorProps = (hooksData) => {
    const {currentControl, newValue, form} = hooksData,
        controlValidatorsSetting = currentControl.validatorsSetting || {},
        controlValidatorsRules = currentControl.validateRules || {},
        {required: requiredRules} = controlValidatorsRules,
        defaultLiveFormValidatorSettings = form.formSettings.formValidatorsSetting,
        {
            required: requiredSetting = defaultLiveFormValidatorSettings.required
        } = controlValidatorsSetting


    let hasError = false,
        shouldLockInput = false,
        errorData:ValidatorErrorProps = null

    //Записывает данные ошибок для дальнейшего отображения
    const errorHandler = (errorHandlerProps:ValidatorErrorProps, controlErrorSetting: ValidatorSettingProps):void => {
        const {message = null, limit = null} = errorHandlerProps,
            {showLiveErrorAfterFirstSubmit, hideErrorTimeout, showErrorTimeout} = controlErrorSetting

        hasError = true

        errorData = {message, limit, hideErrorTimeout, showErrorTimeout, showLiveErrorAfterFirstSubmit}
    }

    //Обязательное поле
    if (requiredRules && Array.isArray(newValue) && newValue.length === 0 && requiredSetting.liveEnable === true) {
        errorHandler(requiredRules, requiredSetting)
        shouldLockInput = false
    }

    return {shouldLockInput, hasError, errorData}
}