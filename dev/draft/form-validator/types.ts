import { AxiosResponse } from 'axios';

export let inputTypes:
  | 'phone'
  | 'number'
  | 'text'
  | 'password'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'date';

export let inputEvents:
  | 'change'
  | 'mouseover'
  | 'mouseleave'
  | 'focus'
  | 'blur'
  | null;

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
  required?: Pick<ValidatorRulesProps, 'message'>;
  email?: Pick<ValidatorRulesProps, 'message'>;
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

interface ClickControlOptionsProps {
  label?: string;
  value?: string | number;
  locked?: boolean;
  checked?: boolean;
}

/**
 * @description
 * Внутренние параметры состояния формы
 */
export interface FormStateProps {
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
export interface FormProps<T = ControlsList> {
  controls: T;
  formState: FormStateProps;
  formSettings?: FormConfigProps;
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
  selectedValue: number | string | null;
}

export interface ControlProps {
  value?: string | number | any[];
  readonly?: boolean;
  selectPlaceholder?: string | null;
  label?: string;
  error?: string;
  hasError?: boolean;
  setValue?: (writeValue: string, eventType: string) => void;
  type: typeof inputTypes;
  controlName?: string;
  inputName?: string | null;
  validateRules?: ValidatorsRulesList;
  validatorsSetting?: ValidatorsSettingList;
  _hideErrorTimeoutId?: null | ReturnType<typeof setTimeout>;
  _showErrorTimeoutId?: null | ReturnType<typeof setTimeout>;

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

export type SetFormProps = (setFormFunc: (form: FormProps) => any) => any;

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
  setForm: SetFormProps,
) => boolean;

/**
 * @description
 * Объект формы, при инициализации
 */
export interface FormConfigProps {
  formName?: string;

  formValidatorsSetting?: ValidatorsSettingList;
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

  //Хуки до и после отправки для каждого контрола
  beforeSubmitValidator?(hookData: HookProps): any;
  afterSubmitValidator?(hookData: HookProps): any;

  //Хуки после отправки формы
  afterSuccessSubmit?(axiosResponse: AxiosResponse): any;
  afterErrorSubmit?(axiosResponse: AxiosResponse): any;
  afterSubmit?(axiosResponse: AxiosResponse): any;
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
   * Открыт ли инпут для записи данных из контрола
   */
  isWriteInputEnable: boolean;
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

export type StaticValidator = (hookData: HookProps) => ValidatorErrorProps;

/**
 * @description
 * Типизация функции живого валидатора
 */
export type LiveValidator = (hookData: HookProps) => {
  modifiedValueToWrite?: string | number | null;
  errorData: ValidatorErrorProps;
};

/**
 * Тип функции на изменения состояния всей формы
 */
// export type SetFormProps = (setFormFunc: (form: FormProps) => any) => any;

export type UseFormValidator = (
  controls: ControlsList,
  customFormConfig: FormConfigProps,
) => [FormProps<typeof controls>, any];
