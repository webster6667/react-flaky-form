import { AxiosResponse } from 'axios';
import {ValidatorRulesProps, ValidatorsRulesListInsideValidator, ValidatorsRulesList, LimitingValidatorRulesProps, NumberValidatorRulesProps} from './validator-rules'
import {FormConfigProps} from './form/form-settings'
import {FormStateProps} from './form/form-state'
import {FormProps, SetForm, FlakyFormI} from './form'
import {ControlsList, ControlProps, CurrentControlData, ControlOutputDataProps} from './control'

let inputTypes:
  | 'phone'
  | 'number'
  | 'text'
  | 'password'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'date';

let inputEvents:
  | 'change'
  | 'mouseover'
  | 'mouseleave'
  | 'focus'
  | 'blur'
  | null;

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
  hasErrorLockingSubmitBtn?: boolean,

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
type UseFlakyForm = (
  controls: ControlsList,
  customFormConfig?: FormConfigProps,
) => [FormProps<typeof controls>, SetForm];



export {
  UseFlakyForm,
  FlakyFormI,
  FormProps,
  SetForm,
  LiveValidator,
  StaticValidator,
  ValidatorErrorProps,
  FormStateProps,
  FormConfigProps,
  ControlsList,
  ControlProps,
  CurrentControlData,
  ControlOutputDataProps,
  inputTypes,
  inputEvents,
  ValidatorRulesProps,
  ValidatorsRulesList,
  ValidatorsRulesListInsideValidator,
  LimitingValidatorRulesProps,
  NumberValidatorRulesProps
}