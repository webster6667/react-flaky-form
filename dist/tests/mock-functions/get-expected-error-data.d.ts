import { ValidatorErrorProps } from "@common-types";
/**
 * Микс дефолтных значений ошибки с ожидаемыми
 */
export declare const getExpectedErrorData: ({ hasError, shouldLockNotValidWrite, message, limit, showLiveErrorAfterFirstSubmit, hideErrorTimeout, showErrorTimeout }: Partial<ValidatorErrorProps>) => ValidatorErrorProps;
