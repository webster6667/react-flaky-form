import { AxiosResponse } from 'axios';
import { ValidatorsRulesList } from '@common-types/validator-rules'

import {HookProps, LiveValidator, StaticValidator} from "@src/types/index";

/**
 * @description
 * Объект формы, при инициализации
 */
export interface FormConfigProps {
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

    //Хуки до и после отправки для каждого контрола
    beforeSubmitValidator?(hookData: HookProps): any;
    afterSubmitValidator?(hookData: HookProps): any;

    //Хуки после отправки формы
    afterSuccessSubmit?(axiosResponse: AxiosResponse): any;
    afterErrorSubmit?(axiosResponse: AxiosResponse): any;
    afterSubmit?(axiosResponse: AxiosResponse): any;
}