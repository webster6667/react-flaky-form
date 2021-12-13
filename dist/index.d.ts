/// <reference types="react" />
import React from "react";
/**
 *  Правила основных валидаторов
 */
interface ValidatorRulesProps {
    /**
     * Сообщение при ошибке
     */
    message?: string;
    /**
     * Включена ли живая валижация контрола
     */
    liveEnable?: boolean;
    /**
     * Включить живой валидатор только после первой отправки формы
     */
    showLiveErrorAfterFirstSubmit?: boolean;
    /**
     * Блокировать ли вывыод в ипут данные не прошедшие валидацию
     */
    shouldLockNotValidWrite?: boolean;
    /**
     * Блокировать ли кнопку отправки при не валидном значении
     */
    shouldLockSubmitBtnWhenControlInvalid?: boolean;
    /**
     * Через какой таймаут отображать ошибки
     */
    showErrorTimeout?: number | null;
    /**
     * Через какой таймаут прятать ошибку
     */
    hideErrorTimeout?: number | null;
}
/**
 *  Правила лимитирующих валидаторов
 */
interface LimitingValidatorRulesProps extends ValidatorRulesProps {
    /**
     *  Число лимита валидатора (max-val, min-val, ...)
     */
    limit: number;
}
/**
 *  Правила числового валидатора
 */
interface NumberValidatorRulesProps extends ValidatorRulesProps {
    negative?: boolean;
    dot?: boolean;
}
/**
 * Список валидаторов
 */
interface ValidatorsRulesList {
    minLength?: LimitingValidatorRulesProps | true;
    maxLength?: LimitingValidatorRulesProps | true;
    minValue?: LimitingValidatorRulesProps | true;
    maxValue?: LimitingValidatorRulesProps | true;
    number?: NumberValidatorRulesProps | true;
    required?: ValidatorRulesProps | true;
    email?: ValidatorRulesProps | true;
}
/**
 * @description
 * Объект формы, при инициализации
 */
interface FormConfigProps {
    formName?: string;
    formValidatorsRules?: ValidatorsRulesList;
    action?: string;
    //кастомный валидатор блокирующий кнопку отправления
    customLockSubmitBtnValidator?: StaticValidator;
    //Дополнительный валидатор к дефолтному валидатору блокировки кнопки
    additionalLockSubmitBtnValidator?: StaticValidator;
    //Живой валидатор для всех контролов
    customLiveValidator?: LiveValidator;
    //Дополнительный живой валидатор для всех контролов
    additionalLiveValidator?: LiveValidator;
    //Хуки до и после всплывшей ошибки живого валидатора
    beforeLiveValidatorError?(hookData: HookProps): any;
    afterLiveValidatorError?(hookData: HookProps): any;
    //Хуки до и после всплывшей ошибки после отправки формы
    beforeSubmitValidatorError?(hookData: HookProps): any;
    afterSubmitValidatorError?(hookData: HookProps): any;
    //Хуки до и после ввода для каждого контрола
    beforeChange?(hookData: HookProps): any;
    afterChange?(hookData: HookProps): any;
    //Кастомный валидатор после отправки формы для каждого контрола
    customSubmitValidator?: StaticValidator;
    //Дополнительный валидатор перед отправкой для всех контролов
    additionalSubmitValidator?: StaticValidator;
}
/**
 * @description
 * Внутренние параметры состояния формы
 */
interface FormStateProps {
    /**
     * Все контролы про инициализированны, и готовы к работе
     */
    loaded: boolean;
    /**
     * Была попытка отправки
     */
    isFormTriedSubmit: boolean;
    /**
     * Блокировать ли кнопку
     */
    isSubmitBtnLocked?: boolean;
    // /**
    //  * Список ошибок со всех контролов для каждой формы
    //  */
    // errorList?: errorListProps[],
    /**
     * Общая ошибка для всей формы
     */
    commonError?: string;
    errorTimeoutList?: {
        [key: string]: ReturnType<typeof setTimeout>;
    };
}
/**
 * @description
 * Главный объект формы
 */
interface FormProps<T = ControlsList> {
    controls: T;
    formState: FormStateProps;
    formSettings?: FormConfigProps;
}
type SetForm = (setFormFunc: (form: FormProps) => any) => any;
/**
 * Параметры компонента формы
 */
type FlakyFormProps = {
    className?: string;
    children: any;
    id?: string;
    formStateProps: [
        FormProps,
        SetForm
    ];
    submitRequestFn?: SubmitRequestFn;
    submitHandler?: (form: FormProps) => any;
};
type FlakyFormI = (flakyFormProps: FlakyFormProps) => React.ReactElement;
/**
 * @description
 * Опции кликабельных контролов(radio, check, select)
 */
interface ClickControlOptionsProps {
    label?: string;
    value?: string | number;
    locked?: boolean;
    checked?: boolean;
}
/**
 * @description
 * Пропсы контрола
 */
interface ControlProps {
    value?: string | number | any[];
    readonly?: boolean;
    selectPlaceholder?: string | null;
    label?: string;
    error?: string;
    hasError?: boolean;
    hasErrorLockingSubmitBtn?: boolean;
    setValue?: (writeValue: string | number | any[], eventType: typeof inputEvents) => void;
    liveSearch?: {
        isLoading?: boolean;
        request(hookData: HookProps): {
            url: string;
            method?: "get" | "post";
            data?: any;
        };
        response?(hookData: HookProps, responseData: any): any;
        foundedData?: any;
        debounceTime?: number;
    };
    type: typeof inputTypes;
    controlName?: string;
    inputName?: string | null;
    validateRules?: ValidatorsRulesList;
    _hideErrorTimeoutId?: null | ReturnType<typeof setTimeout>;
    _showErrorTimeoutId?: null | ReturnType<typeof setTimeout>;
    _liveSearchRequestTimeoutId?: null | ReturnType<typeof setTimeout>;
    options?: ClickControlOptionsProps[];
    //Живые валидаторы
    customLiveValidator?: LiveValidator;
    additionalLiveValidator?: LiveValidator;
    //Хуки до и после всплывшей ошибки живого валидатора
    beforeLiveValidatorError?(hookData: HookProps): any;
    afterLiveValidatorError?(hookData: HookProps): any;
    //Хуки до и после всплывшей ошибки после отправки формы
    beforeSubmitValidatorError?(hookData: HookProps): any;
    afterSubmitValidatorError?(hookData: HookProps): any;
    //Хуки живых валидаторов
    beforeChange?(hookData: HookProps): any;
    afterChange?(hookData: HookProps): any;
    //Валидаторы после отправки формы
    customSubmitValidator?: StaticValidator;
    additionalSubmitValidator?: StaticValidator;
    //Хуки для валидаторов после отправки
    beforeSubmitValidator?(hookData: HookProps): any;
    afterSubmitValidator?(hookData: HookProps): any;
    //Валидатор для блокировки кнопки
    customLockSubmitBtnValidator?: StaticValidator;
    additionalLockSubmitBtnValidator?: StaticValidator;
}
/**
 * @description
 * Список контролов
 */
interface ControlsList {
    [propName: string]: ControlProps;
}
declare let inputTypes: "phone" | "number" | "text" | "password" | "radio" | "checkbox" | "select" | "date";
declare let inputEvents: "change" | "mouseover" | "mouseleave" | "focus" | "blur" | null;
/**
 * @description
 * Данные для хуков
 */
interface HookProps {
    /**
     * Данные текущего контрола
     */
    currentControl: ControlProps;
    /**
     * Имя формы контрола
     */
    controlName: string;
    /**
     * Значение которые пытались ввести
     */
    newValue?: string | number | any[];
    /**
     * Весь объект формы
     */
    form: FormProps;
    /**
     * Выбранное значение ?
     */
    selectedValue?: number | string | null;
}
/**
 * @description
 * Настройки отображения ошибки
 */
interface ValidatorErrorProps {
    /**
     * Была ли ошибка в контроле
     */
    hasError: boolean;
    /**
     * Была ли ошибка в контроле блокирующая кнопку отправления
     */
    hasErrorLockingSubmitBtn?: boolean;
    /**
     * Блокировать ли ввод значения не прошедшее валидацию
     */
    shouldLockNotValidWrite?: boolean;
    /**
     * Тригер определяющий блокировать ли кнопку отправки если текущий контрол не валиден
     */
    shouldLockSubmitBtnWhenControlInvalid?: boolean;
    /**
     * Блокировать ли кнопку отправки(нужно для валидатора блокировки кнопки)
     */
    shouldLockSubmitBtn?: boolean;
    /**
     * Сообщение об ошибке
     */
    message?: string | null;
    /**
     * Какой лимит был привышен
     */
    limit?: number | null;
    /**
     * Показывать ли ошибки живого валидатора, только после попытки отправки формы
     */
    showLiveErrorAfterFirstSubmit?: boolean | null;
    /**
     * Через отображается ошибка
     */
    showErrorTimeout?: number | null;
    /**
     * Через сколько ошибка исчезает
     */
    hideErrorTimeout?: number | null;
    [key: string]: any;
}
/**
 * Валидатор контролов срабатывающий после отправки формы
 */
type StaticValidator = (hookData: HookProps) => ValidatorErrorProps;
/**
 * @description
 * Типизация функции живого валидатора
 */
type LiveValidator = (hookData: HookProps, errorData?: ValidatorErrorProps) => {
    modifiedValueToWrite?: string | number | null;
    errorData: ValidatorErrorProps;
};
/**
 * @description
 * Типизация главного хука библиотеки
 */
type UseFlakyForm = (controls: ControlsList, customFormConfig?: FormConfigProps) => [
    FormProps<typeof controls>,
    SetForm
];
type SubmitRequestFn = (...props: any) => Promise<any>;
type ControlsToFormData = (controls: ControlsList) => FormData;
/**
 * Переводит контролы в formData
 */
declare const controlsToFormData: ControlsToFormData;
declare const useFlakyForm: UseFlakyForm;
declare const FlakyForm: FlakyFormI;
export { useFlakyForm, FlakyForm, controlsToFormData };
