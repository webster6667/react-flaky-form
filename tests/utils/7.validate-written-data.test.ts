import {isLiveValidatorEnable} from '@validators/helpers/is-live-validator-enable'
import {validateWrittenData} from '@validators/written-live-validator'
import {setLiveValidatorResult} from '@control-handlers/helpers/set-live-validator-result'

import {
    ValidatorSettingProps,
    ControlProps,
    HookProps,
    FormProps,
    FormParamsProps,
    ValidatorErrorProps,
    ValidatorsRulesList,
    ValidatorsSettingListInsideHandler, ControlOutputDataProps
} from "@common-types"

import {DEFAULT_FORM_SETTINGS} from "@const";


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

    const getHookData = (newValue: string | number, validatorName = 'empty', validatorRules = {}, validatorSettings = {}) => {

            const validateRules: ValidatorsRulesList = {
                    [validatorName]: validatorRules
                  },
                  validatorsSetting: ValidatorsSettingListInsideHandler = {
                      ...DEFAULT_FORM_SETTINGS.formValidatorsSetting as ValidatorsSettingListInsideHandler,
                      [validatorName]: validatorSettings
                  },
                  currentControl:ControlProps = {
                    type: 'text',
                    validateRules,
                    validatorsSetting
                  },
                  controlName = 'mycontrol',
                  formParams:FormParamsProps = {
                    loaded: true,
                    isFormTriedSubmit: false
                  },
                  form: FormProps = {
                    controls: {
                        [controlName]: currentControl
                    },
                    formParams
                  },
                  hookData: HookProps = {
                      currentControl,
                      controlName,
                      newValue,
                      form,
                      controlIndex: null,
                      formIndex: null,
                      selectedValue: null
                  }

            return hookData
          },
          defaultErrorData: ValidatorErrorProps  = {
              hasError: false,
              shouldLockNotValidWrite: false,
              message: null,
              limit: null,
              showLiveErrorAfterFirstSubmit: false,
              hideErrorTimeout: null,
              showErrorTimeout: null
          }
    
    test('if control has not rules, validator return errorData.hasError === false', () => {

        const newValue = 'abc',
              hookData = getHookData(newValue),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                    ...defaultErrorData,
                    hasError: false
              }
        
        expect(errorData).toEqual(expectedResult)
        
    });

    test('has error when new value greater than limit', () => {

        const newValue = 2,
              limit = 5,
              message = 'less than limit',
              validatorName = 'minValue',
              validateRules = {
                  limit,
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  hasError: true,
                  message,
                  limit,
                  shouldLockNotValidWrite: false,
                  showLiveErrorAfterFirstSubmit: false
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when new value greater than limit', () => {

        const newValue = 3,
              limit = 2,
              message = 'greater than limit',
              validatorName = 'maxValue',
              validateRules = {
                  limit,
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
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
              validateRules = {
                  limit,
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
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
              validateRules = {
                  limit,
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
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
              validateRules = {
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when required field is empty', () => {

        const newValue = '',
              message = 'filed is required',
              validatorName = 'required',
              validateRules = {
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('has error when number not valid', () => {

        const newValue = 'abc',
              message = 'number not valid',
              validatorName = 'number',
              validateRules = {
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });
    
    test('has error when number not valid', () => {

        const newValue = 'abc',
              message = 'number not valid',
              validatorName = 'number',
              validateRules = {
                  message
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('lock write value, when shouldLockNotValidWrite === true and value not valid', () => {

        const newValue = 'abc',
              message = 'number not valid',
              validatorName = 'number',
              validateRules = {
                  message
              },
              validatorSettings = {
                  liveEnable: true,
                  shouldLockNotValidWrite: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  message,
                  hasError: true,
                  shouldLockNotValidWrite: true,
              }
              
        expect(errorData).toEqual(expectedResult)
    });

    test('has not error when number rules empty', () => {

        const newValue = 'abc',
              limit = 5,
              message = 'longer than limit',
              validatorName = 'maxLength',
              validateRules = {
                  message,
                  limit
              },
              validatorSettings = {
                  liveEnable: true
              },
              hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
              {errorData} = validateWrittenData(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultErrorData,
                  hasError: false
              }

        expect(errorData).toEqual(expectedResult)
    });

    test('setLiveValidatorResult written validator result to common error object', () => {

        const newValue = 2,
            limit = 5,
            message = 'less than limit',
            validatorName = 'minValue',
            validateRules = {
                limit,
                message
            },
            validatorSettings = {
                liveEnable: true
            },
            hookData = getHookData(newValue, validatorName, validateRules, validatorSettings),
            controlOutputData: ControlOutputDataProps<typeof newValue> = {
                writeToControlValue: newValue,
                errorDataForControl: null,
                hasAnyError: false,
                isWriteInputEnable: true
            },
            expectedResult: ControlOutputDataProps<typeof newValue> = {
                writeToControlValue: 2,
                errorDataForControl: {
                    hasError: true,
                    shouldLockNotValidWrite: false,
                    message: 'less than limit',
                    limit: 5,
                    showLiveErrorAfterFirstSubmit: false,
                    hideErrorTimeout: null,
                    showErrorTimeout: null
                },
                hasAnyError: true,
                isWriteInputEnable: true
            }
            
        setLiveValidatorResult(validateWrittenData, hookData, controlOutputData)

        expect(controlOutputData).toEqual(expectedResult)
    });
    
})

