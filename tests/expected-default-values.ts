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