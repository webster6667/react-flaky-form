import {isLiveValidatorEnable} from '@validators/helpers/is-live-validator-enable'
import {validateWrittenData} from '@validators/written-live-validator'
import {setLiveValidatorResult} from '@control-handlers/helpers/set-live-validator-result'

import {getHookData} from '@mock-functions/get-hook-data'
import {getInitFormDataSingleControl} from "@mock-functions/get-initialized-full-form";
import {defaultLiveValidatorErrorData} from '@tests/expected-default-values'

import {
    ValidatorSettingProps,
    ControlProps,
    ValidatorErrorProps,
    ControlOutputDataProps, CurrentControlData
} from "@common-types"

describe('function return is live validator enable from control settings object', () => {

    test('function return true, when liveEnable === true', () => {

        const validatorSettings: ValidatorSettingProps = {
                liveEnable: true,
                showLiveErrorAfterFirstSubmit: true,
                shouldLockNotValidWrite: true,
                hideErrorTimeout: 0,
                showErrorTimeout: 0
              }

              expect(isLiveValidatorEnable(validatorSettings)).toBeTruthy()
    });

    test('function return false, when liveEnable === false', () => {

        const validatorSettings: ValidatorSettingProps = {
            liveEnable: false,
            showLiveErrorAfterFirstSubmit: true,
            shouldLockNotValidWrite: true,
            hideErrorTimeout: 0,
            showErrorTimeout: 0
        }

        expect(isLiveValidatorEnable(validatorSettings)).toBeFalsy()
    });

})

describe('written validator return right error data', () => {

    test('if control has not rules, validator return errorData.hasError === false', () => {

        const newValue = 'abc',
              currentControl:ControlProps = {
                  type: 'text'
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: false
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when new value less than limit', () => {

        const newValue = 3,
              limit = 5,
              message = 'less than limit',
              validatorName = 'minValue',
              currentControl:ControlProps = {
                type: 'text',
                validateRules: {
                    [validatorName]: {
                        limit,
                        message
                    }
                },
                validatorsSetting: {
                    [validatorName]: {
                        liveEnable: true
                    }
                }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message,
                  limit
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when new value greater than limit', () => {

        const newValue = 3,
              limit = 2,
              message = 'greater than limit',
              validatorName = 'maxValue',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          limit,
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message,
                  limit
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when new value longer than limit', () => {

        const newValue = '123',
              limit = 2,
              message = 'longer than limit',
              validatorName = 'maxLength',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          limit,
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message,
                  limit
              }

        expect(errorData).toEqual(expectedResult)
    });


    test('has error when new value shorter than limit', () => {

        const newValue = '123',
              limit = 5,
              message = 'shorter than limit',
              validatorName = 'minLength',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          limit,
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message,
                  limit
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when new value has not valid mail', () => {

        const newValue = 'abcd',
              message = 'not valid mail',
              validatorName = 'email',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when required field is empty', () => {

        const newValue = '',
              message = 'filed is required',
              validatorName = 'required',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when number not valid', () => {

        const newValue = 'abc',
              message = 'number not valid',
              validatorName = 'number',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('lock write value, when shouldLockNotValidWrite === true and value not valid', () => {

        const newValue = 'abc',
              message = 'number not valid',
              validatorName = 'number',
              shouldLockNotValidWrite = true,
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true,
                          shouldLockNotValidWrite
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  shouldLockNotValidWrite,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has not error when number rules empty', () => {

        const newValue = 'abc',
              limit = 5,
              message = 'longer than limit',
              validatorName = 'maxLength',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          message,
                          limit
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: false
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('setLiveValidatorResult written validator result to common error object', () => {

        const newValue = 2,
              limit = 5,
              message = 'less than limit',
              validatorName = 'minValue',
              currentControl:ControlProps = {
                  type: 'text',
                  validateRules: {
                      [validatorName]: {
                          message,
                          limit
                      }
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          liveEnable: true
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              controlOutputData: ControlOutputDataProps<typeof newValue> = {
                  writeToControlValue: newValue,
                  errorDataForControl: null,
                  hasAnyError: false,
                  isWriteInputEnable: true
              },
              {errorData} = validateWrittenData(hookData),
              expectedErrorDataForControl: ValidatorErrorProps = {
                  ...defaultLiveValidatorErrorData,
                  hasError: true,
                  message,
                  limit
              },
              expectedResult: ControlOutputDataProps<typeof newValue> = {
                  writeToControlValue: newValue,
                  errorDataForControl: expectedErrorDataForControl,
                  hasAnyError: true,
                  isWriteInputEnable: true
              }

        setLiveValidatorResult(validateWrittenData, hookData, controlOutputData)

        expect(controlOutputData).toEqual(expectedResult)
    });

})

