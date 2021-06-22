import {
    ControlProps,
    ControlsProps,
    FormProps,
    SetFormProps
} from "../types"
import {addValidatorsToSingleControl} from "./../helpers/add-live-validators-rules"
import {addControlHandler} from "./../helpers/add-control-handler"
import {isControlBtnSubmitValidationSuccess} from './../helpers/lock-submit-btn-validator'


//Добавить экземпляр формы
const addControlExample = (controlsExampleList: ControlsProps, controlName, control, controlIndex) => {

    //Записать экземпляр только из первого контрола если это список
    if (controlIndex === 0) controlsExampleList[controlName] = [{...control}]

    //Просто записать экземпляр если это не группа контролов
    if (controlIndex === null) controlsExampleList[controlName] = {...control}
}

//Добавить обязательные поля
const addRequireFields = (control: ControlProps, controlName: string, formName: string): void => {
    control.error = ''
    control.hasError = false

    control.controlName = controlName
    control.inputName = `${formName}[${controlName}]`

    //Добавить поля значения, если его небыло
    if (!control.value) control.value = ''

    //Обязательные поля для селекта
    if (control.type === 'select') {

        //Обязательное поле isMultiply
        control.isMultiple = control.isMultiple !== true ? false : true

        let {options, value, selectPlaceholder} = control,
            hasSelectedValue = Array.isArray(value) ? value.length > 0: Boolean(value),
            isSingletonSelectHasEmptyActiveItem = options.length && !selectPlaceholder && control.isMultiple === false && !hasSelectedValue

        //Если у селекта одиночки нет ни активного значения, ни плейсхолдера, поставить активным первое значение
        if (isSingletonSelectHasEmptyActiveItem) {
            control.value = options[0].value
        }

    }
}


//Добавить все настройки контрола
export const addControlSetting = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null, setForm: SetFormProps) => {

    const {type = null} = control,
          {formName} = form.formSettings,
          controlsExampleList = form.controlsExample


    if (type) {
        let formValidatorsSetting = form.formSettings.formValidatorsSetting || {}

        //Добавить обязательные поля для всех контролов
        addRequireFields(control, controlName, formName)

        //Добавить конфиги для валидаторов
        addValidatorsToSingleControl(control, controlName, formValidatorsSetting, form, controlIndex)

        //Добавить обработчик входных данных
        control.setValue = (
            newValue,
            controlIndex,
            formIndex,
            eventType = null,
            selectedValue = null
        ) => addControlHandler(newValue, controlName, controlIndex, formIndex, setForm, eventType, selectedValue)

        //Записать чистый экземпляр контрола(для работы с мульти формой)
        addControlExample(controlsExampleList, controlName, control, controlIndex)

        //Проверить, проходит ли контрол валидатор блокирующий кнопку
        const shouldLockSubmitBtn = !isControlBtnSubmitValidationSuccess(control, controlName, form, formIndex, controlIndex)

        //Заблокировать кнопку если где-то была ошибка
        if (shouldLockSubmitBtn) {
            form.formParams.isSubmitBtnLocked = true
        }

    } else {
        console.error(`type is require control prop`);
    }


    return true
}