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
