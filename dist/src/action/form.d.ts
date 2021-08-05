import { AxiosResponse } from "axios";
import { FormConfigProps, FormParamsProps, FormProps, SetFormProps } from "./../types";
export declare const submitForm: (setForm: SetFormProps) => void;
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
export declare const initActiveForm: (form: FormProps, apiResponse: AxiosResponse, formConfig: FormConfigProps, formParams: FormParamsProps, setForm: SetFormProps) => void;
