import {AxiosResponse} from "axios";

let inputTypes: 'phone' | 'number' | 'text' | 'password' | 'radio' | 'checkbox' | 'select' | 'date'
let placeholderVisibleValues: 'always' | 'hover' | 'focus' | 'write'
export let inputEvents: 'change' | 'mouseover' | 'mouseleave' | 'focus' | 'blur' | null

/**
 * Функция обработчик для каждого отдельного контрола
 */
export type ControlsCycleHandler = (
    control: ControlProps,
    controlName: string,
    form: FormProps,
    formIndex?: number | null,
    controlIndex?: number | null,
    setForm?: SetFormProps
) => boolean

/**
 * Функция запускающая обработчик для контролов переданного объекта
 */
export type ControlsCycle = (
    controlsCycleFunction: ControlsCycleHandler,
    formControls: FormControls,
    form: FormProps,
    formIndex: number | null,
    setForm?: SetFormProps
) => boolean

/**
 * Функция запускающая обработчик для каждого контрола каждой формы
 */
export type FormCycle = (
    form: FormProps,
    controlsCycleFunction: ControlsCycleHandler,
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
    toInit?: string,
    toSubmit?: string
}

/**
 * @description
 * Параметры отдельного валидатора
 */
export interface ValidatorSettingProps {
    liveEnable?: boolean,
    showLiveErrorAfterFirstSubmit?: boolean,
    shouldLockNotValidWrite?: boolean,
    showErrorTimeout?: number | null,
    hideErrorTimeout?: number | null
}

/**
 * @description
 * Список настроек валидатора
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
 * Список настроек валидатора
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

export interface LiveValidatorProps {
    (hookData: HookProps):{shouldLockInput: boolean, hasError: boolean, modifiedValueToWrite?: string | number | null, errorData?: ValidatorErrorProps}
}

export interface SubmitValidatorProps {
    (hookData: HookProps):{hasError: boolean, errorData?: ValidatorErrorProps}
}

//Настройки передаваемые для всей формы при инициализации
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
    customLiveValidator?:LiveValidatorProps,

    //Дополнительный живой валидатор для всех контролов
    additionalLiveValidator?:LiveValidatorProps,

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
    triedSubmit: boolean,

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
    commonError?: string
}

/**
 * @description
 * Данные для хуков
 */
export interface HookProps {
    currentControl: ControlProps,
    controlIndex: number | null,
    controlName: string | number,
    formIndex: number | null,
    newValue?: string | number | any[],
    form: FormProps,
    selectedValue: number | string | null
}


export interface InputMaskProps {
    placeholderVisible?: typeof placeholderVisibleValues,
    pattern: string,
    placeholder?: null | string
    message?: string,
    clearValue?: string,
    _maskValue?: string
}


// export interface ControlHandler {
//     (currentControl: ControlProps, form: FormProps, hooksData: HookProps, eventType: typeof inputEvents, setForm:SetFormProps):any
// }

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
    inputMask?: InputMaskProps,
    placeholder?: string | null,

    options?: ClickControlOptionsProps[]

    //Живые валидаторы
    customLiveValidator?:LiveValidatorProps,
    additionalLiveValidator?:LiveValidatorProps,

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


