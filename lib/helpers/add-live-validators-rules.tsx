import {
    ControlProps,
    ValidatorsSettingList,
    FormProps
} from "./../types"

//2.Наложить новый слой на контрол
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

//1.Добавить слой валидаторы для конкретного контрола
export function addValidatorsToSingleControl(control: ControlProps, controlName: string, formValidatorsSetting: ValidatorsSettingList, form: FormProps, controlIndex = null) {

    const controlValidatorsSetting: ValidatorsSettingList = control.validatorsSetting || {}

    //Добавить первый дефолтный слой валидаторов для контрола
    control.validatorsSetting = form.formSettings.formValidatorsSetting

    //Добавить слой валидаторов из всей формы
    addLiveValidatorsSettingsLayer(control, formValidatorsSetting)

    //Добавить слой валидатора из конкретного контрола
    addLiveValidatorsSettingsLayer(control, controlValidatorsSetting)



}