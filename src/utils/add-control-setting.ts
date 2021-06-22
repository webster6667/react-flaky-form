import {
    ControlProps,
    ControlsProps,
    FormProps,
    SetFormProps
} from "../types"
import {addValidatorsToSingleControl} from "./../utils/add-live-validators-rules"
import {addControlHandler} from "./../utils/add-control-handler"
import {isControlBtnSubmitValidationSuccess} from './../helpers/lock-submit-btn-validator'

/**
 * @description
 * Функция добавляющая экземпляр контрола(одиночного или вложенного), 
 * Для того что бы можно было добавлять новые формы или контролы во вью
 *
 * @param {ControlsProps} controlsExampleList - Список контролов формы, с которых клонируют структуру
 * @param {string} controlName - Имя контрола(username or password)
 * @param {ControlProps} control - Сам контрол который клонируют, со всеми свойствами
 * @param {number} controlIndex - Индекс вложенного контрола
 * 
 * @returns {void}
 */
const addControlExample = (controlsExampleList: ControlsProps, controlName: string, control: ControlProps, controlIndex: number):void => {

    const isSingleControl = controlIndex === 0,
          isGroupControl = controlIndex === null
    
    /**
     * Сделать экземпляр первого элемента, вложенного контрола
     */
    if (isSingleControl) controlsExampleList[controlName] = [{...control}]

    /**
     * Сделать экземпляр одиночного контрола
     */
    if (isGroupControl) controlsExampleList[controlName] = {...control}
}

/**
 * @description
 * Добавить обязательные поля для функционирования контролов
 *
 * @param {ControlProps} control - Контрол которому добавят обящательные поля
 * @param {string} controlName - Имя контрола (username or password)
 * @param {string} formName - Имя формы(RegistrationForm or LoginForm)
 *
 * @returns {void}
 */
const addRequireFields = (control: ControlProps, controlName: string, formName: string): void => {
    const isSelectInput = control.type === 'select'

    control.error = ''
    control.hasError = false

    control.controlName = controlName
    control.inputName = `${formName}[${controlName}]`

    /**
     * Добавить поле value если оно было пустым
     */
    if (!control.value) control.value = ''

    /**
     * Обязательные поля селект инпутов
     */
    if (isSelectInput) {

        /**
         * Обязательное isMultiply
         */
        control.isMultiple = control.isMultiple === true

        let {options, value, selectPlaceholder} = control,
            hasSelectedValue = Array.isArray(value) ? value.length > 0: Boolean(value),
            isSingletonSelectHasEmptyActiveItem = options.length && !selectPlaceholder && control.isMultiple === false && !hasSelectedValue

        /**
         * Если не определенно активное поле или плейсхолдер, сделать активным первое значение по дефолту
         */
        if (isSingletonSelectHasEmptyActiveItem) {
            control.value = options[0].value
        }

    }
}


/**
 * @description
 * Добавить все настройки контролу (валидаторы, экземпляры и тд)
 *
 * @param {ControlProps} control - Контрол которому добавляют настройки
 * @param {string} controlName - Имя контрола(username or password)
 * @param {FormProps} form - главный объект формы
 * @param {number} formIndex - Индекс формы
 * @param {number} controlIndex - Индекс вложенного контрола
 * @param {SetFormProps} setForm - функция изменяющая главный объект формы
 *
 * @returns {boolean}
 */
export const addControlSetting = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null, setForm: SetFormProps):boolean => {

    const {type = null} = control,
          {formName} = form.formSettings,
          controlsExampleList = form.controlsExample


    if (!type) {
        console.error(`type is require control prop`);
    } else {
        /**
         * Настройка валидатора, описанная для этой формы
         */
        let formValidatorsSetting = form.formSettings.formValidatorsSetting || {}

        /**
         * Добавить обязательные поля
         */
        addRequireFields(control, controlName, formName)

        /**
         * Наложить все слои настроек валидатора для контрола
         */
        addValidatorsToSingleControl(control, controlName, formValidatorsSetting, form)


        /**
         * Обработчик входных данных
         */
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

    }


    return true
}