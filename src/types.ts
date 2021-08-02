import {AxiosResponse} from "axios";

let inputTypes: 'phone' | 'number' | 'text' | 'password' | 'radio' | 'checkbox' | 'select' | 'date'
let eventWhenPlaceholderVisible: 'always' | 'hover' | 'focus' | 'write'
export let inputEvents: 'change' | 'mouseover' | 'mouseleave' | 'focus' | 'blur' | null

/**
 * Функция обработчик для каждого отдельного контрола
 */
export type ControlsCycleHandler = (

    /**
     * Данные текущего контрола
     */
    currentControlData: CurrentControlData,

    /**
     * Глобальный объект форм
     */
    form: FormProps,

    /**
     * Функция изменеия глобальныого объекта форм
     */
    setForm?: SetFormProps
) => boolean

/**
 * Функция запускающая обработчик для контролов переданного объекта
 */
export type ControlsCycle = (
    /**
     * Функция которая будет запущена для каждого контрола
     */
    controlsCycleFunction: ControlsCycleHandler,

    /**
     * Список контролов, по которым пройдется функция
     */
    formControls: FormControls,

    /**
     * Глобальный объект форм со всеми контролами
     */
    form: FormProps,

    /**
     * Индекс формы
     */
    formIndex: number | null,

    /**
     * Функция изменеия глобальныого объекта форм
     */
    setForm?: SetFormProps
) => boolean

/**
 * Функция запускающая обработчик для каждого контрола каждой формы
 */
export type FormCycle = (
    /**
     * Глобальный объект форм
     */
    form: FormProps,
    
    /**
     * Функция которая сработает для всех контролов всех форм
     */
    controlsCycleFunction: ControlsCycleHandler,

    /**
     * Функция изменеия глобальныого объекта форм
     */
    setForm?: SetFormProps
) => boolean

interface ClickControlOptionsProps {
    label?: string,
    value?: string | number,
    locked?: boolean,
    checked?: boolean
}

/**
 * @description
 * Параметры axios
 */
interface FormActions {
    /**
     * Куда отправлять запрос за инитом
     */
    toInit?: string,

    /**
     * Куда отправлять даныне из формы
     */
    toSubmit?: string
}

/**
 * @description
 * Параметры отдельного валидатора
 */
export interface ValidatorSettingProps {
    /**
     * Включена ли живая валижация контрола
     */
    liveEnable?: boolean,
    
    /**
     * Начать ли живое отображение ошибок только после первой отправки формы
     */
    showLiveErrorAfterFirstSubmit?: boolean,
    
    /**
     * Блокировать ли вывыод в ипут данные не прошедшие валидацию
     */
    shouldLockNotValidWrite?: boolean,

    /**
     * Блокировать ли кнопку отправки при не валидном значении
     */
    shouldLockSubmitBtnWhenControlInvalid?: boolean,
    
    /**
     * Через какой таймаут отображать ошибки
     */
    showErrorTimeout?: number | null,
    
    /**
     * Через какой таймаут прятать ошибку
     */
    hideErrorTimeout?: number | null
}

/**
 * @description
 * Список настроек валидатора с внешней стороны(при обьявлении формы)
 */
export interface ValidatorsSettingList {
    minLength?: ValidatorSettingProps | boolean,
    maxLength?: ValidatorSettingProps | boolean,
    minValue?: ValidatorSettingProps | boolean,
    maxValue?: ValidatorSettingProps | boolean,
    required?: ValidatorSettingProps | boolean,
    number?: ValidatorSettingProps | boolean,
    email?: ValidatorSettingProps | boolean
}

/**
 * @description
 * Список настроек валидатора внутри валидатора
 */
export interface ValidatorsSettingListInsideHandler {
    minLength?: ValidatorSettingProps,
    maxLength?: ValidatorSettingProps,
    minValue?: ValidatorSettingProps,
    maxValue?: ValidatorSettingProps,
    required?: ValidatorSettingProps,
    number?: ValidatorSettingProps,
    email?: ValidatorSettingProps
}

/**
 * @description
 * Настройки отображения ошибки
 */
export interface ValidatorErrorProps {
    /**
     * Была ли ошибка в контроле
     */
    hasError: boolean,

    /**
     * Блокировать ли ввод значения не прошедшее валидацию
     */
    shouldLockNotValidWrite: boolean,

    /**
     * Сообщение об ошибке
     */
    message?: string | null,
    
    /**
     * Какой лимит был привышен
     */
    limit?: number | null,
    
    /**
     * Показывать ли ошибки живого валидатора, только после попытки отправки формы
     */
    showLiveErrorAfterFirstSubmit?: boolean | null,

    /**
     * Через отображается ошибка
     */
    showErrorTimeout?: number | null,

    /**
     * Через сколько ошибка исчезает
     */
    hideErrorTimeout?: number | null
}

/**
 * Объект данных ввывода из контрола в инпут
 */
export interface ControlOutputDataProps<T = string | number | any[]> {
    /**
     * Значение которое запишется из контрола в инпут
     */
    writeToControlValue: T,
    
    /**
     * Данные для отображения ошибок
     */
    errorDataForControl: ValidatorErrorProps,
    
    /**
     * Была ли ошибка хоть в одном из валидаторов
     */
    hasAnyError: boolean,
    
    /**
     * Открыт ли инпут для записи данных из контрола
     */
    isWriteInputEnable: boolean
}

//Правило срабатывание валидатора
export interface ValidatorRulesProps {
    limit: number,
    message: string
}

//Параметры валидатора цифр
export interface NumberValidatorRulesProps {
    negative?: boolean,
    message?: string,
    dot?: boolean
}

//Список правил валидаторов для отдельного контрола
export interface ValidatorsRulesList {
    minLength?: ValidatorRulesProps,
    maxLength?: ValidatorRulesProps,
    minValue?: ValidatorRulesProps,
    maxValue?: ValidatorRulesProps,
    number?: NumberValidatorRulesProps,
    required?: Pick<ValidatorRulesProps, "message">,
    email?: Pick<ValidatorRulesProps, "message">
}

/**
 * @description
 * Типизация функции живого валидатора
 */
export type LiveValidator = (hookData: HookProps) => {modifiedValueToWrite?: string | number | null, errorData: ValidatorErrorProps}

export interface SubmitValidatorProps {
    (hookData: HookProps):{hasError: boolean, errorData?: ValidatorErrorProps}
}


/**
 * @description
 * Объект формы, при инициализации
 */
export interface FormConfigProps {
    formName?: string,
    lockSubmitBtnEvent?: false | 'required-empty' | 'lock-validator-has-error',

    formValidatorsSetting?: ValidatorsSettingList,
    action?: FormActions | string,

    //кастомный валидатор блокирующий кнопку отправления
    customLockSubmitBtnValidator?(hookData: HookProps):boolean,

    //Дополнительный валидатор к дефолтному валидатору блокировки кнопки
    additionalLockSubmitBtnValidator?(hookData: HookProps):boolean,

    //Живой валидатор для всех контролов
    customLiveValidator?:LiveValidator,

    //Дополнительный живой валидатор для всех контролов
    additionalLiveValidator?:LiveValidator,

    //Хуки до и после всплывшей ошибки живого валидатора
    beforeLiveValidatorError?(hookData: HookProps): any,
    afterLiveValidatorError?(hookData: HookProps): any,

    //Хуки до и после всплывшей ошибки после отправки формы
    beforeSubmitValidatorError?(hookData: HookProps): any,
    afterSubmitValidatorError?(hookData: HookProps): any,

    //Хуки до и после ввода для каждого контрола
    beforeChange?(hookData: HookProps): any,
    afterChange?(hookData: HookProps): any,

    //Кастомный валидатор после отправки формы для каждого контрола
    customSubmitValidator?:SubmitValidatorProps,

    //Дополнительный валидатор перед отправкой для всех контролов
    additionalSubmitValidator?:SubmitValidatorProps,

    //Хуки до и после отправки для каждого контрола
    beforeSubmitValidator?(hookData: HookProps): any,
    afterSubmitValidator?(hookData: HookProps): any,

    //Хуки после отправки формы
    afterSuccessSubmit?(axiosResponse: AxiosResponse): any
    afterErrorSubmit?(axiosResponse: AxiosResponse): any
    afterSubmit?(axiosResponse: AxiosResponse): any
}

/**
 * @description
 * Внутренние параметры состояния формы
 */
export interface FormParamsProps {
    /**
     * Все контролы про инициализированны, и готовы к работе
     */
    loaded: boolean,

    /**
     * Была попытка отправки
     */
    isFormTriedSubmit: boolean,

    /**
     * Блокировать ли кнопку
     */
    isSubmitBtnLocked?: boolean,

    /**
     * Список ошибок со всех контролов для каждой формы
     */
    errorList?: {[key: string]: string}[] | {[key: string]: string}[][],

    /**
     * Общая ошибка для всей формы
     */
    commonError?: string,

    errorTimeoutList?: {
        [key: string]: ReturnType<typeof setTimeout>
    }
}

/**
 * @description
 * Данные контрола, с которым ведется работа
 */
export interface CurrentControlData {
    /**
     * Данные текущего контрола
     */
    currentControl: ControlProps,

    /**
     * Индекс контрола
     */
    controlIndex: number | null,

    /**
     * Имя формы контрола
     */
    controlName: string,

    /**
     * Индекс формы
     */
    formIndex: number | null,

    /**
     * Имя формы
     */
    formName: string,
}

/**
 * @description
 * Данные для хуков
 */
export interface HookProps {
    /**
     * Данные текущего контрола
     */
    currentControl: ControlProps,
    
    /**
     * Индекс контрола
     */
    controlIndex: number | null,
    
    /**
     * Имя формы контрола
     */
    controlName: string,
    
    /**
     * Индекс формы
     */
    formIndex: number | null,
    
    /**
     * Значение которые пытались ввести 
     */
    newValue?: string | number | any[],
    
    /**
     * Весь объект формы
     */
    form: FormProps,
    
    /**
     * Выбранное значение ?
     */
    selectedValue: number | string | null
}

/**
 * @description
 * Настройки маски
 */
export interface MaskSettingProps {
    /**
     * При каком событии отображать наложенную маску
    */
    eventWhenPlaceholderVisible?: typeof eventWhenPlaceholderVisible,
    
    /**
     * Шаблон маски:
     * Для любого символа используется число `9`, для любого символа буква `A`.
     * Например +7(999)-999-99-99 | AA-AAA
     */
    maskPattern: string,
    
    /**
     * Какой символ отображать вместо незаполненых
     */
    maskPlaceholder?: null | string,
    
    /**
     * Сообщение, при несовпадении с маской(выводится после отправления формы)
     */
    message?: string,
    
    /**
     * Чистое значение, без маски
     */
    clearValue?: string,
    
    /**
     * Маска с наложенным placeholder
     */
    _maskWithPlaceholder?: string
}

/**
 * @description
 * Пропсы отдельного контрола
 */
export interface ControlProps {
    value?: string | number | any[],
    readonly?: boolean,
    selectPlaceholder?: string | null,
    isMultiple?: boolean,
    shouldCloseAfterSelect?: boolean,
    label?: string,
    error?: string,
    hasError?: boolean,
    setValue?: object,
    type: typeof inputTypes,
    controlName?: string,
    inputName?: string | null,
    validateRules?: ValidatorsRulesList,
    validatorsSetting?: ValidatorsSettingList,
    maskSetting?: MaskSettingProps,
    placeholder?: string | null,
    _hideErrorTimeoutId?: null | ReturnType<typeof setTimeout>
    _showErrorTimeoutId?: null | ReturnType<typeof setTimeout>

    options?: ClickControlOptionsProps[]

    //Живые валидаторы
    customLiveValidator?:LiveValidator,
    additionalLiveValidator?:LiveValidator,

    //Хуки до и после всплывшей ошибки живого валидатора
    beforeLiveValidatorError?(hookData: HookProps): any,
    afterLiveValidatorError?(hookData: HookProps): any,

    //Хуки до и после всплывшей ошибки после отправки формы
    beforeSubmitValidatorError?(hookData: HookProps): any,
    afterSubmitValidatorError?(hookData: HookProps): any,

    //Хуки живых валидаторов
    beforeChange?(hookData: HookProps): any,
    afterChange?(hookData: HookProps): any,

    //Валидаторы после отправки формы
    customSubmitValidator?:SubmitValidatorProps,
    additionalSubmitValidator?:SubmitValidatorProps,

    //Хуки для валидаторов после отправки
    beforeSubmitValidator?(hookData: HookProps): any,
    afterSubmitValidator?(hookData: HookProps): any,

    //Валидатор для блокировки кнопки
    customLockSubmitBtnValidator?(hookData: HookProps): boolean,
    additionalLockSubmitBtnValidator?(hookData: HookProps):boolean,

    //Кастомная маска
    customMask?(VMasker, hookData: HookProps): any
}

/**
 * @description
 * Тип для контрола отдельной формы(мульти/сингл)
 */
export interface ControlsProps {
    [propName: string]: ControlProps | ControlProps[]
}

/**
 * @description
 * Главный объект формы
 */
export interface FormProps<T = FormControls> {
    controls: T,
    formParams: FormParamsProps,
    formSettings?: FormConfigProps,
    controlsExample?: ControlsProps
}


//Тип компонента activeForm
export interface ActiveFormProps {
    className?: string,
    children: any,
    id?: string,
    action?: string,
    formState: FormProps,
    setForm: SetFormProps
}

/**
 * Отдельный контрол который может быть и одиночным и мульти контролом
 */
export type SingleControl = ControlProps | ControlProps[]

/**
 * Список всех контролов включая мульти формы и мульти контролы
 */
export type FormControls = ControlsProps | ControlsProps[]

/**
 * Тип функции на изменения состояния всей формы
 */
export type SetFormProps = (setFormFunc: (form: FormProps) => any) => any

/**
 * Хук инициализации
 */
export type UseFlukyForm = <T extends ControlsProps[] | ControlsProps>(controls: T extends ControlsProps[] ? ControlsProps[] : ControlsProps, customFormConfig: FormConfigProps) => [FormProps<T extends ControlsProps[] ? ControlsProps[] : ControlsProps>, SetFormProps]


