import {HookProps, inputTypes, inputEvents, LiveValidator, StaticValidator, ValidatorErrorProps} from "@common-types";
import {ValidatorsRulesList} from "@common-types/validator-rules";

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
export interface ControlProps {
    value?: string | number | any[];
    readonly?: boolean;
    selectPlaceholder?: string | null;
    label?: string;
    error?: string;
    hasError?: boolean;
    hasErrorLockingSubmitBtn?: boolean,
    setValue?: (writeValue: string | number | any[], eventType: typeof inputEvents) => void;
    liveSearch?: {
      isLoading?: boolean,
      request(hookData: HookProps): {
          url: string,
          method?: 'get' | 'post',
          data?: any
      },
      response?(hookData: HookProps, responseData: any):any,
      foundedData?: any,
      debounceTime?: number
    },
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
export interface ControlsList {
    [propName: string]: ControlProps;
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
     * Имя формы контрола
     */
    controlName: string;

    /**
     * Имя формы
     */
    formName?: string;
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
    errorDataForControl: ValidatorErrorProps | null;

    /**
     * Была ли ошибка хоть в одном из валидаторов
     */
    hasAnyError: boolean;

    /**
     * Была ли ошибка хоть в одном из валидаторов блокирующая кнопку отправления
     */
    hasAnyLockingSubmitBtnError?: boolean;

    /**
     * Открыт ли инпут для записи данных из контрола
     */
    isWriteInputEnable: boolean;
}