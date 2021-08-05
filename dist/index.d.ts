/// <reference types="react" />
declare module "src/types" {
    import React from 'react';
    import { AxiosResponse } from 'axios';
    let inputTypes: 'phone' | 'number' | 'text' | 'password' | 'radio' | 'checkbox' | 'select' | 'date';
    let eventWhenPlaceholderVisible: 'always' | 'hover' | 'focus' | 'write';
    export let inputEvents: 'change' | 'mouseover' | 'mouseleave' | 'focus' | 'blur' | null;
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
    setForm?: SetFormProps) => boolean;
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
    setForm?: SetFormProps) => boolean;
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
    setForm?: SetFormProps) => boolean;
    interface ClickControlOptionsProps {
        label?: string;
        value?: string | number;
        locked?: boolean;
        checked?: boolean;
    }
    /**
     * @description
     * Параметры axios
     */
    interface FormActions {
        /**
         * Куда отправлять запрос за инитом
         */
        toInit?: string;
        /**
         * Куда отправлять даныне из формы
         */
        toSubmit?: string;
    }
    /**
     * @description
     * Параметры отдельного валидатора
     */
    export interface ValidatorSettingProps {
        /**
         * Включена ли живая валижация контрола
         */
        liveEnable?: boolean;
        /**
         * Начать ли живое отображение ошибок только после первой отправки формы
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
     * @description
     * Список настроек валидатора с внешней стороны(при обьявлении формы)
     */
    export interface ValidatorsSettingList {
        minLength?: ValidatorSettingProps | boolean;
        maxLength?: ValidatorSettingProps | boolean;
        minValue?: ValidatorSettingProps | boolean;
        maxValue?: ValidatorSettingProps | boolean;
        required?: ValidatorSettingProps | boolean;
        number?: ValidatorSettingProps | boolean;
        email?: ValidatorSettingProps | boolean;
    }
    /**
     * @description
     * Список настроек валидатора внутри валидатора
     */
    export interface ValidatorsSettingListInsideHandler {
        minLength?: ValidatorSettingProps;
        maxLength?: ValidatorSettingProps;
        minValue?: ValidatorSettingProps;
        maxValue?: ValidatorSettingProps;
        required?: ValidatorSettingProps;
        number?: ValidatorSettingProps;
        email?: ValidatorSettingProps;
    }
    /**
     * @description
     * Настройки отображения ошибки
     */
    export interface ValidatorErrorProps {
        /**
         * Была ли ошибка в контроле
         */
        hasError: boolean;
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
     * Объект данных ввывода из контрола в инпут
     */
    export interface ControlOutputDataProps<T = string | number | any[]> {
        /**
         * Значение которое запишется из контрола в инпут
         */
        writeToControlValue: T;
        /**
         * Данные для отображения ошибок
         */
        errorDataForControl: ValidatorErrorProps;
        /**
         * Была ли ошибка хоть в одном из валидаторов
         */
        hasAnyError: boolean;
        /**
         * Открыт ли инпут для записи данных из контрола
         */
        isWriteInputEnable: boolean;
    }
    export interface ValidatorRulesProps {
        limit: number;
        message: string;
    }
    export interface NumberValidatorRulesProps {
        negative?: boolean;
        message?: string;
        dot?: boolean;
    }
    export interface ValidatorsRulesList {
        minLength?: ValidatorRulesProps;
        maxLength?: ValidatorRulesProps;
        minValue?: ValidatorRulesProps;
        maxValue?: ValidatorRulesProps;
        number?: NumberValidatorRulesProps;
        required?: Pick<ValidatorRulesProps, "message">;
        email?: Pick<ValidatorRulesProps, "message">;
    }
    /**
     * @description
     * Типизация функции живого валидатора
     */
    export type LiveValidator = (hookData: HookProps) => {
        modifiedValueToWrite?: string | number | null;
        errorData: ValidatorErrorProps;
    };
    /**
     * @description
     * Типизация функции статического валидатора
     */
    export type StaticValidator = (hookData: HookProps) => ValidatorErrorProps;
    /**
     * @description
     * Объект формы, при инициализации
     */
    export interface FormConfigProps {
        formName?: string;
        formValidatorsSetting?: ValidatorsSettingList;
        action?: FormActions | string;
        customLockSubmitBtnValidator?: StaticValidator;
        additionalLockSubmitBtnValidator?: StaticValidator;
        customLiveValidator?: LiveValidator;
        additionalLiveValidator?: LiveValidator;
        beforeLiveValidatorError?(hookData: HookProps): any;
        afterLiveValidatorError?(hookData: HookProps): any;
        beforeSubmitValidatorError?(hookData: HookProps): any;
        afterSubmitValidatorError?(hookData: HookProps): any;
        beforeChange?(hookData: HookProps): any;
        afterChange?(hookData: HookProps): any;
        customSubmitValidator?: StaticValidator;
        additionalSubmitValidator?: StaticValidator;
        beforeSubmitValidator?(hookData: HookProps): any;
        afterSubmitValidator?(hookData: HookProps): any;
        afterSuccessSubmit?(axiosResponse: AxiosResponse): any;
        afterErrorSubmit?(axiosResponse: AxiosResponse): any;
        afterSubmit?(axiosResponse: AxiosResponse): any;
    }
    type errorListProps = {
        [key: string]: string;
    } | {
        [key: string]: string;
    }[];
    /**
     * @description
     * Внутренние параметры состояния формы
     */
    export interface FormParamsProps {
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
        /**
         * Список ошибок со всех контролов для каждой формы
         */
        errorList?: errorListProps[];
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
     * Данные контрола, с которым ведется работа
     */
    export interface CurrentControlData {
        /**
         * Данные текущего контрола
         */
        currentControl: ControlProps;
        /**
         * Индекс контрола
         */
        controlIndex: number | null;
        /**
         * Имя формы контрола
         */
        controlName: string;
        /**
         * Индекс формы
         */
        formIndex: number | null;
        /**
         * Имя формы
         */
        formName: string;
    }
    /**
     * @description
     * Данные для хуков
     */
    export interface HookProps {
        /**
         * Данные текущего контрола
         */
        currentControl: ControlProps;
        /**
         * Индекс контрола
         */
        controlIndex: number | null;
        /**
         * Имя формы контрола
         */
        controlName: string;
        /**
         * Индекс формы
         */
        formIndex: number | null;
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
        selectedValue: number | string | null;
    }
    /**
     * @description
     * Настройки маски
     */
    export interface MaskSettingProps {
        /**
         * При каком событии отображать наложенную маску
        */
        eventWhenPlaceholderVisible?: typeof eventWhenPlaceholderVisible;
        /**
         * Шаблон маски:
         * Для любого символа используется число `9`, для любого символа буква `A`.
         * Например +7(999)-999-99-99 | AA-AAA
         */
        maskPattern: string;
        /**
         * Какой символ отображать вместо незаполненых
         */
        maskPlaceholder?: null | string;
        /**
         * Сообщение, при несовпадении с маской(выводится после отправления формы)
         */
        message?: string;
        /**
         * Чистое значение, без маски
         */
        clearValue?: string;
        /**
         * Маска с наложенным placeholder
         */
        _maskWithPlaceholder?: string;
    }
    /**
     * @description
     * Пропсы отдельного контрола
     */
    export interface ControlProps {
        value?: string | number | any[];
        readonly?: boolean;
        selectPlaceholder?: string | null;
        isMultiple?: boolean;
        shouldCloseAfterSelect?: boolean;
        label?: string;
        error?: string;
        hasError?: boolean;
        setValue?: object;
        type: typeof inputTypes;
        controlName?: string;
        inputName?: string | null;
        validateRules?: ValidatorsRulesList;
        validatorsSetting?: ValidatorsSettingList;
        maskSetting?: MaskSettingProps;
        placeholder?: string | null;
        _hideErrorTimeoutId?: null | ReturnType<typeof setTimeout>;
        _showErrorTimeoutId?: null | ReturnType<typeof setTimeout>;
        options?: ClickControlOptionsProps[];
        customLiveValidator?: LiveValidator;
        additionalLiveValidator?: LiveValidator;
        beforeLiveValidatorError?(hookData: HookProps): any;
        afterLiveValidatorError?(hookData: HookProps): any;
        beforeSubmitValidatorError?(hookData: HookProps): any;
        afterSubmitValidatorError?(hookData: HookProps): any;
        beforeChange?(hookData: HookProps): any;
        afterChange?(hookData: HookProps): any;
        customSubmitValidator?: StaticValidator;
        additionalSubmitValidator?: StaticValidator;
        beforeSubmitValidator?(hookData: HookProps): any;
        afterSubmitValidator?(hookData: HookProps): any;
        customLockSubmitBtnValidator?: StaticValidator;
        additionalLockSubmitBtnValidator?: StaticValidator;
        customMask?(VMasker: any, hookData: HookProps): any;
    }
    /**
     * @description
     * Тип для контрола отдельной формы(мульти/сингл)
     */
    export interface ControlsProps {
        [propName: string]: ControlProps | ControlProps[];
    }
    /**
     * @description
     * Главный объект формы
     */
    export interface FormProps<T = FormControls> {
        controls: T;
        formParams: FormParamsProps;
        formSettings?: FormConfigProps;
        controlsExample?: ControlsProps;
    }
    /**
     * Параметры компонента формы
     */
    type FlukyFormProps = {
        className?: string;
        children: any;
        id?: string;
        action?: string;
        formState: FormProps;
        setForm: SetFormProps;
    };
    /**
     * Компонент формы
     */
    export type FlukyFormComponent = (flukyFormProps: FlukyFormProps) => React.ReactElement;
    /**
     * Отдельный контрол который может быть и одиночным и мульти контролом
     */
    export type SingleControl = ControlProps | ControlProps[];
    /**
     * Список всех контролов включая мульти формы и мульти контролы
     */
    export type FormControls = ControlsProps | ControlsProps[];
    /**
     * Тип функции на изменения состояния всей формы
     */
    export type SetFormProps = (setFormFunc: (form: FormProps) => any) => any;
    /**
     * Хук инициализации
     */
    export type UseFlukyForm = <T extends ControlsProps[] | ControlsProps>(controls: T extends ControlsProps[] ? ControlsProps[] : ControlsProps, customFormConfig: FormConfigProps) => [FormProps<T extends ControlsProps[] ? ControlsProps[] : ControlsProps>, SetFormProps];
    /**
     * Параметры компонента добавления формы
     */
    type AddFormExampleProps = {
        setForm: SetFormProps;
        value?: string;
        children?: any;
    };
    /**
     * Компонент добавления формы
     */
    export type AddFormExampleComponent = (addFormExampleProps: AddFormExampleProps) => void;
    /**
     * Параметры компонента удаления формы
     */
    type RemoveFormProps = {
        setForm: SetFormProps;
        formIndex: number | null;
        value?: string;
        children?: any;
    };
    /**
     * Компонент удаления формы
     */
    export type RemoveFormComponent = (removeFormButtonProps: RemoveFormProps) => void;
    /**
     * Параметры компонента добавления экземпляра контрола
     */
    type AddControlProps = {
        setForm: SetFormProps;
        controlName: string;
        formIndex?: null | number;
    };
    /**
     * Компонент добавления экземпляра контрола
     */
    export type AddControlComponent = (AddControlProps: AddControlProps) => void;
    /**
     * Параметры компонента удаления экземпляра контрола
     */
    type RemoveControlProps = {
        setForm: SetFormProps;
        controlName: string;
        controlIndex: null | number;
        formIndex: null | number;
    };
    /**
     * Компонент удаления экземпляра контрола
     */
    export type RemoveControlComponent = (AddControlProps: RemoveControlProps) => void;
}
declare module "src/const" {
    import { FormConfigProps } from "src/types";
    export const FORM_NAME: string;
    export let DEFAULT_FORM_SETTINGS: FormConfigProps;
}
declare module "src/utils/control-utils/types" {
    import { ControlProps, FormProps } from "src/types";
    export type ControlIdsProps = {
        controlIndex: number | null;
        formIndex: number | null;
        controlName: string | number | null;
        [key: string]: any;
    };
    export type GetControlFromForm = (form: FormProps, controlName: string | number, formIndex: number | null, controlIndex: number | null) => ControlProps;
    export type GetControlTimerName = (controlIdsProps: ControlIdsProps, timerActionName: string) => string;
    export type IsMulti = (index: number | null) => boolean;
}
declare module "src/utils/control-utils/is-multi" {
    import { IsMulti } from "src/utils/control-utils/types";
    /**
     * @description
     * Функция проверяет по индексу, является ли контрол мульти
     *
     * @param {number | null} controlIndex - Индекс контрола
     *
     * @returns {boolean}
     */
    export const isMultiControl: IsMulti;
    /**
     * @description
     * Функция проверяет по индексу, является ли контрол одиночкой
     *
     * @param {number | null} controlIndex - Индекс контрола
     *
     * @returns {boolean}
     */
    export const isSingletonControl: IsMulti;
    /**
     * @description
     * Функция проверяет по индексу, является ли форма мульти
     *
     * @param {number | null} formIndex - Индекс формы
     *
     * @returns {boolean}
     */
    export const isMultiForm: IsMulti;
}
declare module "src/utils/control-utils/get-control-from-form" {
    import { GetControlFromForm } from "src/utils/control-utils/types";
    /**
     * @description
     * Получить контрол из глобального обьекта формы, по переданным парраметрам
     *
     * @param {FormProps} form - Глобальный объект формы
     * @param {number | null} formIndex - Индекс формы (Если это мультиформа)
     * @param {number | null} controlIndex - Индекс контрола (Если это вложенный контрол)
     * @param {string | number | null} controlName - Имя контрола (username or password)
     *
     * @returns {ControlProps} - вернет контрол
     *
     */
    export const getControlFromForm: GetControlFromForm;
}
declare module "src/utils/validators/helpers/types" {
    import { ValidatorSettingProps, ValidatorErrorProps } from "src/types";
    export type IsLiveValidatorEnable = (controlValidatorsSetting: ValidatorSettingProps) => boolean;
    export type Unmask = (maskPattern: string, textCoveredMask: string | number, placeholder?: string | null) => string;
    export type StaticErrorDataHandler = <T extends ValidatorErrorProps>(commonErrorData: T, propsToUpdate: Partial<T>) => void;
}
declare module "src/utils/validators/helpers/unmask" {
    import { Unmask } from "src/utils/validators/helpers/types";
    /**
     * @description
     * Функция очищает значение от наложенной маски вместе с плейсхолдером
     *
     * @param {string} maskPattern - Строка маски(например: +7(999)-999-99-99 | AA-AAA)
     * @param {string | number} textCoveredMask - Значение покрытое маской
     * @param {string} maskPlaceholder - Символ заменяющий не заполненные символы маски
     *
     * @returns {string} возвращает текст без маски с плейсхолдером
     */
    export const unmask: Unmask;
}
declare module "src/utils/validators/types" {
    import { ControlProps, MaskSettingProps, inputEvents } from "src/types";
    export type MaskWriteValue = (maskSetting: MaskSettingProps, currentControl: ControlProps, writeValue: string | number, eventType: typeof inputEvents) => void;
}
declare module "src/utils/validators/mask-validator" {
    import { MaskWriteValue } from "src/utils/validators/types";
    /**
     * @description
     * Валидатор вписывает введенное значение в контрол по маске
     *
     * @param {MaskSettingProps} maskSetting - Объект описывающий правила маски
     * @param {ControlProps} currentControl - Контрол с которым работает валидатор
     * @param {string | number} writeValue - Чистое значение, которое должно быть покрыто маской
     * @param {string} eventType - Событие по которому попали в валидатор
     *
     * @returns {void} результатом работы функции будет введенное значение в контрол по маске, а так же toggle флага ошибки контрола
     */
    export const maskWriteValue: MaskWriteValue;
}
declare module "src/utils/validators/helpers/is-live-validator-enable" {
    import { IsLiveValidatorEnable } from "src/utils/validators/helpers/types";
    /**
     * @description
     * Функция проверяет и возвращает, включен ли живой валидатор в переданных настройках валидатора
     *
     * @param {ValidatorSettingProps} controlValidatorsSetting - обьект настройки валидатора
     *
     * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
     */
    export const isLiveValidatorEnable: IsLiveValidatorEnable;
}
declare module "src/utils/validators/written-live-validator" {
    import { LiveValidator } from "src/types";
    /**
     * @description
     * Живой валидатор введенных данных в интуп
     *
     * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
     *
     * @returns {{ValidatorErrorProps}}
     *
     */
    export const validateWrittenData: LiveValidator;
}
declare module "src/utils/validators/clicked-live-validator" {
    import { LiveValidator } from "src/types";
    /**
     * @description
     * Живой валидатор кликабельных инпутов
     *
     * @param {HookProps} hooksData - Данные для хуков(контрол, его данные, форма)
     *
     * @returns {{ValidatorErrorProps}}
     *
     */
    export const validateClickedData: LiveValidator;
}
declare module "src/utils/error-handlers/helpers/types" {
    import { FormProps, HookProps, SetFormProps } from "src/types";
    export type HideLiveErrorAfterTimeout = (hooksData: HookProps, setForm: SetFormProps, ms: number) => ReturnType<typeof setTimeout>;
    export type LayoutSymbolsValues = {
        limit: number;
        controlLabel: string;
        writeToControlValue: string | number | any[];
    };
    export type ReplaceLayoutSymbols = (message: string, layoutSymbolsValues: LayoutSymbolsValues) => string;
    export type SetControlErrorToFormErrorList = (message: string, form: FormProps, hooksData: HookProps) => void;
}
declare module "src/utils/error-handlers/helpers/hide-live-error-after-timeout" {
    import { HideLiveErrorAfterTimeout } from "src/utils/error-handlers/helpers/types";
    /**
     * @description
     * Функция вызывающая скрытие ошибки через таймаут
     *
     * @param {HookProps} hooksData - Данные хука
     * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
     * @param {number} ms - время через которое нужно скрыть ошибку
     *
     * @returns {void}
     *
     */
    export const hideLiveErrorAfterTimeout: HideLiveErrorAfterTimeout;
}
declare module "src/utils/error-handlers/helpers/replace-layout-symbols" {
    import { ReplaceLayoutSymbols } from "src/utils/error-handlers/helpers/types";
    export const replaceLayoutSymbols: ReplaceLayoutSymbols;
}
declare module "src/utils/error-handlers/types" {
    import { ValidatorErrorProps, HookProps, SetFormProps } from "src/types";
    /**
     * @description
     * Дефолтный обработчик живых ошибок
     */
    export type DefaultLiveErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, setForm: SetFormProps) => void;
    /**
     * @description
     * Дефолтный обработчик ошибок после валидации перед отправкой данных на сервер
     */
    export type DefaultBeforeSubmitValidatorErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps) => void;
}
declare module "src/utils/error-handlers/live-validator-error-handler" {
    import { DefaultLiveErrorHandler } from "src/utils/error-handlers/types";
    /**
     * @description
     * Дефолтный обработчик живых ошибок(парсинг, отображение, скрытие)
     *
     * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
     * @param {HookProps} hooksData - Данные хука
     * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
     *
     * @returns {void}
     *
     */
    export const defaultLiveErrorHandler: DefaultLiveErrorHandler;
}
declare module "src/utils/control-handlers/types" {
    import { ControlProps, CurrentControlData, FormProps, HookProps, inputEvents, SetFormProps, ValidatorErrorProps } from "src/types";
    /**
     * @description
     * Обработчик всех видов входных данных при вводе
     */
    export type LiveInputHandler = (currentControl: ControlProps, form: FormProps, hooksData: HookProps, eventType: typeof inputEvents, setForm: SetFormProps) => void;
    /**
     * @description
     * Обработчик живых ошибок, отвечающий за выбор функции обработчика и контроль дебаунса
     */
    export type LiveValidatorShowErrorHandler = (errorDataForControl: ValidatorErrorProps, hooksData: HookProps, form: FormProps, setForm: SetFormProps, prevShowErrorTimeoutId: null | ReturnType<typeof setTimeout>, ms: number) => null | ReturnType<typeof setTimeout>;
    /**
     * @description
     * Обработчик всех контролов перед отправкой на сервер
     */
    export type ControlsHandlerBeforeSubmit = (currentControlData: CurrentControlData, form: FormProps) => boolean;
    export type ShouldLockSubmitBtnByControl = (currentControlData: CurrentControlData, form: FormProps) => boolean;
    export type ShouldLockSubmitBtnByForm = (form: FormProps) => boolean;
    export type LockSubmitBtnErrorData = {
        shouldLockSubmitBtn: boolean;
    };
    export type BeforeSubmitErrorData = {
        isControlBeforeSubmitValidationSuccess: boolean;
        errorDataForControl: ValidatorErrorProps;
        hasControlError: boolean;
    };
}
declare module "src/utils/control-handlers/live-validator-show-error-handler" {
    import { LiveValidatorShowErrorHandler } from "src/utils/control-handlers/types";
    /**
     * @description
     * Функция которая выбирает обработчик ошибки, и обрабатывает его вместе с дебаунсом
     *
     * @param {ValidatorErrorProps} errorDataForControl - Результат работы живого валидатора(текст ошибки, данные когда и как показыавть ошибку)
     * @param {HookProps} hooksData - Данные хука
     * @param {FormProps} form - Глобальный объект формы
     * @param {SetFormProps} setForm - Функция изменяющая глобальный объект формы
     * @param {NodeJS.Timeout | null} prevShowErrorTimeoutId - id предыдущего дебаунса для очистки
     * @param {number} ms - через сколько должен сработать обработчик
     *
     * @returns {void}
     *
     */
    export const liveValidatorShowErrorHandler: LiveValidatorShowErrorHandler;
}
declare module "src/utils/control-handlers/helpers/types" {
    import { LiveValidator, HookProps, ControlOutputDataProps, StaticValidator } from "src/types";
    import { LockSubmitBtnErrorData, BeforeSubmitErrorData } from "src/utils/control-handlers/types";
    export type SetLiveValidatorResult = (validator: LiveValidator, hooksData: HookProps, controlOutputDataProps: ControlOutputDataProps) => void;
    export type SetLockSubmitBtnValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: LockSubmitBtnErrorData, shouldCheckValidatorSettings?: boolean) => void;
    export type SetBeforeSubmitValidatorResult = (validator: StaticValidator, hooksData: HookProps, errorData: BeforeSubmitErrorData) => void;
}
declare module "src/utils/control-handlers/helpers/set-live-validator-result" {
    import { SetLiveValidatorResult } from "src/utils/control-handlers/helpers/types";
    /**
     * @description
     * Записывает результат живого валидатора, в объект вывода данных контрола
     *
     * @param {LiveValidator} validator - Живой валидатор, результат которого будет записыватся
     * @param {HookProps} hookProps - Данные для работы валидатора
     * @param {ControlOutputDataProps} controlOutputData - Объект в котором хранятся данные вывода контрола
     *
     * @returns {void}
     */
    export const setLiveValidatorResult: SetLiveValidatorResult;
}
declare module "src/utils/control-handlers/live-input-handler" {
    import { LiveInputHandler } from "src/utils/control-handlers/types";
    /**
     * @description
     * Обработчик всех видов входных данных при вводе
     *
     * @param {ControlProps} currentControl - Контрол в который ввели данные и происходит обработка
     * @param {FormProps} form - Глобальный объект формы
     * @param {HookProps} hooksData - Данные для хуков
     * @param {typeof inputEvents} eventType - Тип сработающего события
     * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
     *
     * @returns {void}
     */
    export const liveInputHandler: LiveInputHandler;
}
declare module "src/utils/control-utils/controls-cycle" {
    import { ControlsCycle, FormCycle } from "src/types";
    /**
     * @description
     * Функция проходящая циклом по всем контролам, применяя к ним переданную функцию
     *
     * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
     * Внутри функция можно получить доступ к каждому контролу
     * И изменить там что либо, или использовать как валидатор возвращая булевое значение
     * @param {ControlsProps | ControlsProps[]} formControls - Список контролов по которым пройдется функция
     * @param {FormProps} form - Главная форма содержащая все контролы
     * @param {number} formIndex - Индекс формы, если это мультиформа
     * @param {SetFormProps} setForm - функция изменяющая главный объект формы
     *
     * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
     *
     * @example
     * const isAllControlsValid = controlsCycle((control, controlName, form, formIndex, controlIndex, setForm) => return formIndex ? true : false, controls, form, formIndex, setForm) // => true
     * const isAllControlsValid = controlsCycle((control, controlName, form, formIndex, controlIndex, setForm) => return formIndex ? true : false, controls, form, null, setForm) // => false
     */
    export const controlsCycle: ControlsCycle;
    /**
     * @description
     * Функция проходящая циклом по всем контролам всех форм, применяя к ним переданную функцию
     * Работает как для мульти формы, так и для одиночной
     *
     * @param {FormProps} form - Главная форма содержащая все контролы
     * @param {ControlsCycleHandler} controlsCycleHandler - Функция проходящая в цикле по всем контролам.
     * Внутри функция можно получить доступ к каждому контролу
     * И изменить там что либо, или использовать как валидатор возвращая булевое значение
     * @param {SetFormProps} setForm - функция изменяющая главный объект формы
     *
     * @returns {boolean} Результат означает прошла ли controlsCycleFunction все итерации с результатом true
     *
     * @example
     *
     * const form = {
     *      controls: {
     *          username: {
     *              type: "text",
     *              label: 'Имя пользователя'
     *          }
     *      }
     * }
     *
     * const isControlsValid = controlsCycle(form, (control, controlName, form, formIndex, controlIndex, setForm) => return controlName === 'username' ? true : false, setForm) // => true
     * const isControlsValid = controlsCycle(form, (control, controlName, form, formIndex, controlIndex, setForm) => return controlName === 'password' : false, setForm) // => false
     */
    export const formCycle: FormCycle;
}
declare module "src/utils/validators/helpers/static-validator-error-handler" {
    import { StaticErrorDataHandler } from "src/utils/validators/helpers/types";
    /**
     * @description
     * Функция записывает данные ошибки статического валидатора, и определяет нужно ли блокировать форму отправки
     *
     * @param {ValidatorErrorProps} commonErrorData - объект с данными ошибки
     * @param {ValidatorErrorProps} propsToUpdate - Слой новых свойств которые будут накладыватся
     *
     */
    export const StaticValidatorErrorHandler: StaticErrorDataHandler;
}
declare module "src/utils/validators/static-validator" {
    import { StaticValidator } from "src/types";
    export const defaultStaticValidator: StaticValidator;
}
declare module "src/utils/control-handlers/helpers/set-lock-submit-validator-result" {
    import { SetLockSubmitBtnValidatorResult } from "src/utils/control-handlers/helpers/types";
    /**
     * @description
     * Записывает результат валидаора на блокировку кнопки отправки
     *
     * @param {StaticValidator} validator - Валидатор, результат которого будет записыватся
     * @param {HookProps} hookProps - Данные для работы валидатора
     * @param {LockSubmitBtnErrorData} errorData - Объект в котором хранятся свойство блокировать или не блокировать кнопку
     * @param {boolean} shouldCheckValidatorSettings - Проверять необходимость блокировать ли кнопку отправки, по дополнительному полю shouldLockSubmitBtnWhenControlInvalid в настройкам rules
     *
     * @returns {void}
     */
    export const setLockSubmitBtnValidatorResult: SetLockSubmitBtnValidatorResult;
}
declare module "src/utils/control-handlers/submit-btn-lock-handler" {
    import { ShouldLockSubmitBtnByControl, ShouldLockSubmitBtnByForm } from "src/utils/control-handlers/types";
    /**
     * @description
     * Функция проходит через данные контрола, и на их основании определяет блокировать ли кнопку ввода
     *
     * @param {CurrentControlData} currentControlData - Все данные по переданному контролу
     * @param {FormProps} form - главный объект формы
     *
     * @returns {boolean}
     *
     */
    export const shouldLockSubmitBtnByControl: ShouldLockSubmitBtnByControl;
    /**
     * @description
     * Функция проходит через данные всех контролов, и на их основании определяет нужно ли блокировать кнопку
     *
     * @param {FormProps} form - главный объект формы, содержащий все контролы
     *
     * @returns {boolean}
     */
    export const shouldLockSubmitBtnByForm: ShouldLockSubmitBtnByForm;
}
declare module "src/utils/types" {
    import { AxiosResponse } from "axios";
    import { CurrentControlData, FormProps, SetFormProps, inputEvents, FormConfigProps, FormParamsProps } from "src/types";
    export type AddControlSetting = (currentControlData: CurrentControlData, form: FormProps, setForm: SetFormProps) => boolean;
    export type AddControlHandler = (newValue: string | number, controlName: string, controlIndex: number | null, formIndex: number | null, setForm: SetFormProps, eventType: typeof inputEvents, selectedValue: string | number | null) => void;
    /**
     * Инициализация формы
     */
    export type InitFlukyForm = (form: FormProps, apiResponse: AxiosResponse, formConfig: FormConfigProps, formParams: FormParamsProps, setForm: SetFormProps) => void;
    /**
     * Обработчик отправки формы на сервер
     */
    export type SubmitFlukyFormHandler = (setForm: SetFormProps) => void;
    export type ToggleSubmitBtnLockRelativeLockValidatorError = (form: FormProps) => void;
    export type AddFormExample = (setForm: SetFormProps) => void;
    export type RemoveFormByIndex = (formIndex: number | null, setForm: SetFormProps) => void;
}
declare module "src/utils/add-control-handler" {
    import { AddControlHandler } from "src/utils/types";
    /**
     * @description
     * Функция добавить обработку входных данных, для всех типов контролов,
     * Обработчики работают для всех типов контролов, даже если их типы меняются динамически
     *
     * @param {string | number} newValue - Новое значение которое выбирают или вводят
     * @param {string} controlName - Имя контрола (username or password)
     * @param {number | null} controlIndex - Индекс элемента вложенного контрола(если это вложенный контрол)
     * @param {number | null} formIndex - Индекс формы(если это мульти форма)
     * @param {SetFormProps} setForm - Функция изменяющая главный объект формы
     * @param {typeof inputEvents} eventType - Тип события который произошел на контроле
     * @param {string | number} selectedValue - Выбранное значение если это кликабильный контрол
     *
     * @returns {void}
     */
    export const addControlHandler: AddControlHandler;
}
declare module "src/utils/add-control-props-layers/types" {
    import { ControlProps, ControlsProps, FormProps, ValidatorsSettingList, CurrentControlData } from "src/types";
    export type AddControlExample = (controlsExampleList: ControlsProps, singleControlData: CurrentControlData) => void;
    export type AddRequireFields = (singleControlData: CurrentControlData) => void;
    export type AddValidatorsRuleLayer = (control: ControlProps, config: ValidatorsSettingList) => void;
    export type AddValidatorsRulesLayerToSingleControl = (control: ControlProps, form: FormProps) => void;
    export type CombineValidatorsSettingsLayers = (bottomLayer: ValidatorsSettingList, upperLayer: ValidatorsSettingList) => ValidatorsSettingList;
}
declare module "src/utils/add-control-props-layers/add-required-field" {
    import { AddRequireFields } from "src/utils/add-control-props-layers/types";
    /**
     * @description
     * Добавить обязательные поля для функционирования контролов
     *
     * @param {CurrentControlData} singleControlData - Все данные переданного контрола
     *
     * @returns {void}
     */
    export const addRequireFields: AddRequireFields;
}
declare module "src/utils/add-control-props-layers/add-control-example" {
    import { AddControlExample } from "src/utils/add-control-props-layers/types";
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
    export const addControlExample: AddControlExample;
}
declare module "src/utils/add-control-props-layers/add-validators-settings-layers" {
    import { AddValidatorsRuleLayer, AddValidatorsRulesLayerToSingleControl, CombineValidatorsSettingsLayers } from "src/utils/add-control-props-layers/types";
    /**
     * @description
     * Функция накладывающая слой настроек валидатора на контрол, из переданного ей объекта config
     *
     * @param {ControlProps} control - Контрол на который переданный слой настроек валидатора
     * @param {ValidatorsSettingList} validatorsSettingsList - Слой настроек валидатора
     *
     * @returns {void}
     *
     */
    export const addValidatorsSettingsLayer: AddValidatorsRuleLayer;
    /**
     * @description
     * Наложить все слои валидаторов(глобальные, формы, контрола) для отдельного контрола
     *
     * @param {ControlProps} control - Контрол на который накладывают слои валидатора
     * @param {ValidatorsSettingList} formValidatorsSetting - Список валидаторов
     * @param {FormProps} form - главный объект формы
     *
     * @returns {void}
     *
     */
    export const addValidatorsSettingsLayerToSingleControl: AddValidatorsRulesLayerToSingleControl;
    /**
     * @description
     * Функция накладывает на слой валидатора, свойства из нового слоя, возвращая комбинированный слой валидаторов
     *
     * @param {ValidatorsSettingList} bottomLayer - Основной слой валидаторов
     * @param {ValidatorsSettingList} upperLayer - Слой который накладывается сверху
     *
     * @returns {ValidatorsSettingList}
     *
     */
    export const combineValidatorsSettingsLayers: CombineValidatorsSettingsLayers;
}
declare module "src/utils/add-control-setting" {
    import { AddControlSetting } from "src/utils/types";
    /**
     * @description
     * Добавить все настройки контролу (валидаторы, экземпляры и тд)
     *
     * @param {CurrentControlData} currentControlData - Все данные по перебираемому контролу
     * @param {FormProps} form - главный объект формы
     * @param {SetFormProps} setForm - функция изменяющая главный объект формы
     *
     * @returns {boolean}
     */
    export const addControlSetting: AddControlSetting;
}
declare module "src/utils/control-utils/get-multi-control-array" {
    import { ControlProps, ControlsProps } from "src/types";
    /**
     * Отдать массив мульти контрола
     */
    export const getMultiControlArray: (controls: ControlsProps | ControlsProps[], controlName: string, formIndex?: number | null) => ControlProps[];
}
declare module "src/utils/error-handlers/helpers/set-control-error-to-form-error-list" {
    import { SetControlErrorToFormErrorList } from "src/utils/error-handlers/helpers/types";
    /**
     * @description
     * Функция записывает все ошибки контролов формы, в объект с всеми ошибками формы
     *
     * @param {string} errorMessage - Текст ошибки контрола
     * @param {FormProps} form - Объект формы куда будут писатся все ошибки
     * @param {HookProps} hooksData - Данные контрола
     *
     */
    export const setControlErrorToFormErrorList: SetControlErrorToFormErrorList;
}
declare module "src/utils/error-handlers/before-submit-validator-error-handler" {
    import { DefaultBeforeSubmitValidatorErrorHandler } from "src/utils/error-handlers/types";
    export const defaultBeforeSubmitValidatorErrorHandler: DefaultBeforeSubmitValidatorErrorHandler;
}
declare module "src/utils/control-handlers/helpers/set-before-submit-validator-result" {
    import { SetBeforeSubmitValidatorResult } from "src/utils/control-handlers/helpers/types";
    /**
     * @description
     * Записывает результат статического валидатора перед отправкой данный на сервер
     *
     * @param {LiveValidator} validator - Валидатор, результат которого будет записыватся
     * @param {HookProps} hookProps - Данные для работы валидатора
     * @param {ControlOutputDataProps} beforeSubmitErrorData - Объект в котором хранятся результаты валидации
     *
     * @returns {void}
     */
    export const setBeforeSubmitValidatorResult: SetBeforeSubmitValidatorResult;
}
declare module "src/utils/control-handlers/before-submit-handler" {
    import { ControlsHandlerBeforeSubmit } from "src/utils/control-handlers/types";
    export const controlsHandlerBeforeSubmit: ControlsHandlerBeforeSubmit;
}
declare module "src/utils/form-actions" {
    import { InitFlukyForm, SubmitFlukyFormHandler, ToggleSubmitBtnLockRelativeLockValidatorError } from "src/utils/types";
    /**
     * @description
     * Функция обрабатывающая отправку формы на сервер
     *
     * @param {SetFormProps} setForm - Функция обрабрабатывающая глобальный объект формы
     */
    export const submitFlukyFormHandler: SubmitFlukyFormHandler;
    /**
     * @description
     * 1.Подгрузка данных с бекенда(валидаторы, данные)
     * 2.Применение описанных конфигов ко всем контролам
     *
     * @param {FormProps} form - Главная форма содержащая все контролы
     * @param {AxiosResponse} apiResponse - Ответ от API(валидаторы, данные)
     * @param {FormConfigProps} formConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
     * @param {FormParamsProps} formParams - объект с внутренним состоянием формы(загрузилась ли, была ли попытка отправить)
     * @param {SetFormProps} setForm - функция изменяющая главный объект формы
     */
    export const initFlukyForm: InitFlukyForm;
    /**
     * @description
     * Запускает валидатор на блокирование кнопки отправления, и при необходимости блокирует или открывает кнопку отправления
     *
     * @param {FormProps} form - Главный объект формы
     */
    export const toggleSubmitBtnLockRelativeLockValidatorError: ToggleSubmitBtnLockRelativeLockValidatorError;
}
declare module "src/utils/dynamic-form-actions" {
    import { AddFormExample, RemoveFormByIndex } from "src/utils/types";
    /**
     * @description
     * Добавить экземпляр формы
     *
     * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
     *
     */
    export const addFormExample: AddFormExample;
    /**
     * @description
     * Удалить экземпляр формы по индексу
     *
     * @param {number | null} formIndex - Индекс формы
     * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
     *
     */
    export const removeFormByIndex: RemoveFormByIndex;
    export const addControlExample: (setForm: any, controlName: string, formIndex?: null | number) => void;
    export const removeControlFromListByIndex: (setForm: any, controlName: string, formIndex: number | null, controlIndex: number) => void;
}
declare module "tests/expected-default-values" {
    import { ValidatorErrorProps } from "src/types";
    export const defaultLiveValidatorErrorData: ValidatorErrorProps;
    export const defaultStaticValidatorErrorData: ValidatorErrorProps;
}
declare module "tests/mock-functions/get-expected-error-data" {
    import { ValidatorErrorProps } from "src/types";
    /**
     * Микс дефолтных значений ошибки с ожидаемыми
     */
    export const getExpectedErrorData: ({ hasError, shouldLockNotValidWrite, message, limit, showLiveErrorAfterFirstSubmit, hideErrorTimeout, showErrorTimeout }: Partial<ValidatorErrorProps>) => ValidatorErrorProps;
}
declare module "tests/mock-functions/types" {
    import { FormParamsProps, ControlProps, FormProps, HookProps, ControlsProps } from "src/types";
    export type GetRequireFormParams = (formParamsProps?: Partial<FormParamsProps>) => FormParamsProps;
    export type GetInitFormDataSingleControl = (currentControl: ControlProps, controlName?: string) => {
        controlName: string;
        initFormData: FormProps;
    };
    export type GetInitFormDataDynamicControls = <T extends ControlsProps[] | ControlsProps>(controls: T) => FormProps<T>;
    export type GetHookData = ({ controlName, currentControl, newValue, form, controlIndex, formIndex, selectedValue }: Partial<HookProps>) => HookProps;
}
declare module "tests/mock-functions/get-hook-data" {
    import { GetHookData } from "tests/mock-functions/types";
    /**
     * Данные для хуков
     */
    export const getHookData: GetHookData;
}
declare module "tests/mock-functions/get-require-form-params" {
    import { GetRequireFormParams } from "tests/mock-functions/types";
    /**
     * Обязательные параметры формы для инициализации
     */
    export const getRequireFormParams: GetRequireFormParams;
}
declare module "tests/mock-functions/get-initialized-full-form" {
    import { GetInitFormDataSingleControl, GetInitFormDataDynamicControls } from "tests/mock-functions/types";
    /**
     * Полностью инициализированная форма, с одним контролом
     */
    export const getInitFormDataSingleControl: GetInitFormDataSingleControl;
    /**
     * Полностью инициализированная форма, с динамически добавленными контролами
     */
    export const getInitFormDataDynamicControls: GetInitFormDataDynamicControls;
}
declare module "tests/utils/1.controls-cycle.test" { }
declare module "tests/utils/10.static-validator.test" { }
declare module "tests/utils/11.should-lock-submit-btn.test" { }
declare module "tests/utils/12.add-control-example.test" { }
declare module "tests/utils/2.add-required-fields.test" { }
declare module "tests/utils/3.add-validators-settings.test" { }
declare module "tests/utils/4.get-control-from-form.test" { }
declare module "tests/utils/5.validate-mask-control.test" { }
declare module "tests/utils/6.validate-clicked-data.test" { }
declare module "tests/utils/7.validate-written-data.test" { }
declare module "tests/utils/8.live-validator-error-handler.test" { }
declare module "tests/utils/9.live-input-handler.test" { }
