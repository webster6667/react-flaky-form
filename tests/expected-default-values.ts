import {ValidatorErrorProps} from '@common-types'

export const defaultLiveValidatorErrorData: ValidatorErrorProps  = {
          hasError: false,
          shouldLockNotValidWrite: false,
          message: null,
          limit: null,
          showLiveErrorAfterFirstSubmit: false,
          hideErrorTimeout: null,
          showErrorTimeout: null
}

export const defaultStaticValidatorErrorData: ValidatorErrorProps  = {
    hasError: false,
    shouldLockNotValidWrite: false,
    message: null,
    limit: null,
    showLiveErrorAfterFirstSubmit: false,
    hideErrorTimeout: null,
    shouldLockSubmitBtnWhenControlInvalid: false,
    shouldLockSubmitBtn: false
}

