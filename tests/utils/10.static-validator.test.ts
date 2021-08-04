import {
    ControlProps,
    CurrentControlData,
    ValidatorErrorProps
} from "@src/types";

import {getHookData} from '@mock-functions/get-hook-data'
import {getInitFormDataSingleControl} from '@mock-functions/get-initialized-full-form'

import {defaultStaticValidator} from '@validators/static-validator'
import {defaultStaticValidatorErrorData} from "@tests/expected-default-values";



describe('written validator return right error data', () => {

    test('if control has not rules, validator return errorData.hasError === false', () => {

        const newValue = 'abc',
              currentControl:ControlProps = {
                  type: 'text',
                  value: newValue,
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
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
                  value: newValue,
                  validateRules: {
                      [validatorName]: {
                          limit,
                          message
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
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
                  value: newValue,
                  validateRules: {
                      [validatorName]: {
                          limit,
                          message
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
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
                value: newValue,
                validateRules: {
                    [validatorName]: {
                        limit,
                        message
                    }
                }
            },
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
            hookData = getHookData({...currentControlData, form, newValue}),
            errorData = defaultStaticValidator(hookData),
            expectedResult: ValidatorErrorProps = {
                ...defaultStaticValidatorErrorData,
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
                  value: newValue,
                  validateRules: {
                      [validatorName]: {
                          limit,
                          message
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
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
                  value: newValue,
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
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
                  value: newValue,
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
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
                  value: newValue,
                  validateRules: {
                      [validatorName]: {
                          message
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form, newValue}),
              errorData = defaultStaticValidator(hookData),
              expectedResult: ValidatorErrorProps = {
                  ...defaultStaticValidatorErrorData,
                  hasError: true,
                  message
              }

        expect(errorData).toEqual(expectedResult)
    });

});