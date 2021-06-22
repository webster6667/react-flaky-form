import {
    ControlProps,
    ValidatorsSettingList,
    FormProps
} from "./../types"

/**
 * @description
 * Функция накладывающая слой настроек валидатора на контрол, из переданного ей объекта config
 *
 * @param {ControlProps} control - Контрол на который переданный слой настроек валидатора
 * @param {ValidatorsSettingList} config - Слой настроек валидатора
 *
 * @returns {void}
 *
 */
function addLiveValidatorsSettingsLayer(control: ControlProps, config: ValidatorsSettingList): void {

    //Наложенные слои валидаторов контрола
    let controlValidatorsSetting: ValidatorsSettingList = control.validatorsSetting


    //Перебрать все переданные валидаторы, и наложить слоем сверху
    Object.keys(config).forEach((validatorName: string):void => {
        
        let controlValidator = controlValidatorsSetting[validatorName],
            newValidatorLayer = config[validatorName],
            isObject = typeof newValidatorLayer === 'object'


        //Наложить слой всех переданных параметров для валидатора
        if (isObject) {
            controlValidatorsSetting[validatorName] = {...controlValidator, ...newValidatorLayer}
        } else {
        //Просто включить валидатор, с дефолтными параметрами
            controlValidatorsSetting[validatorName] = {...controlValidator, liveEnable: newValidatorLayer}
        }

    })

}

/**
 * @description
 * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
 *
 * @param {ControlProps} control - Контрол на который накладывают слои валидатора
 * @param {string} controlName - Имя контрола(username or password)
 * @param {ValidatorsSettingList} formValidatorsSetting - Список валидаторов
 * @param {FormProps} form - главный объект формы
 *
 * @returns {void}
 *
 */
export function addValidatorsToSingleControl(control: ControlProps, controlName: string, formValidatorsSetting: ValidatorsSettingList, form: FormProps):void {

    /**
     * Настройки валидатора для отдельного контрола(могут быть пустыми)
     */
    const controlValidatorsSetting: ValidatorsSettingList = control.validatorsSetting || {}

    /**
     * Наложить слой настроек валидатора, описанный в глобальном объекте для всех форм проекта
     */
    control.validatorsSetting = form.formSettings.formValidatorsSetting

    /**
     * Наложить слой настроек валидатора, описанных именно для этой формы
     */
    addLiveValidatorsSettingsLayer(control, formValidatorsSetting)


    /**
     * Наложить слой настроек валидатора, описанных именно для этого контрола
     */
    addLiveValidatorsSettingsLayer(control, controlValidatorsSetting)
}