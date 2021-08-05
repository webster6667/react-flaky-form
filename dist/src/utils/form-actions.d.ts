import { InitFlukyForm, SubmitFlukyFormHandler, ToggleSubmitBtnLockRelativeLockValidatorError } from "./types";
/**
 * @description
 * Функция обрабатывающая отправку формы на сервер
 *
 * @param {SetFormProps} setForm - Функция обрабрабатывающая глобальный объект формы
 */
export declare const submitFlukyFormHandler: SubmitFlukyFormHandler;
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
export declare const initFlukyForm: InitFlukyForm;
/**
 * @description
 * Запускает валидатор на блокирование кнопки отправления, и при необходимости блокирует или открывает кнопку отправления
 *
 * @param {FormProps} form - Главный объект формы
 */
export declare const toggleSubmitBtnLockRelativeLockValidatorError: ToggleSubmitBtnLockRelativeLockValidatorError;
