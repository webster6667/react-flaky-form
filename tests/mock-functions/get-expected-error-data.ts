import {ValidatorErrorProps} from "@common-types";

/**
 * Микс дефолтных значений ошибки с ожидаемыми
 */
export const getExpectedErrorData = ({
                                      hasError = false,
                                      shouldLockNotValidWrite = false,
                                      message = null,
                                      limit = null,
                                      showLiveErrorAfterFirstSubmit = null,
                                      hideErrorTimeout = null,
                                      showErrorTimeout = null
}:Partial<ValidatorErrorProps>):ValidatorErrorProps => {

    return {
        hasError,
        shouldLockNotValidWrite,
        message,
        limit,
        showLiveErrorAfterFirstSubmit,
        hideErrorTimeout,
        showErrorTimeout
    }
}