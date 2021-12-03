/**
 *  Правила основных валидаторов
 */
export interface ValidatorRulesProps {
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
export interface LimitingValidatorRulesProps extends ValidatorRulesProps {
    /**
     *  Число лимита валидатора (max-val, min-val, ...)
     */
    limit: number;
}

/**
 *  Правила числового валидатора
 */
export interface NumberValidatorRulesProps extends ValidatorRulesProps {
    negative?: boolean;
    dot?: boolean;
}

/**
 * Список валидаторов
 */
export interface ValidatorsRulesList {
    minLength?: ValidatorRulesProps;
    maxLength?: ValidatorRulesProps;
    minValue?: ValidatorRulesProps;
    maxValue?: ValidatorRulesProps;
    number?: NumberValidatorRulesProps;
    required?: ValidatorRulesProps;
    email?: ValidatorRulesProps;
}