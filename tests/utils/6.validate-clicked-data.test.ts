import {ControlProps, ValidatorErrorProps} from "@common-types";
import {getInitFormDataSingleControl} from "@mock-functions/get-initialized-full-form";
import {getHookData} from "@mock-functions/get-hook-data";
import {getExpectedErrorData} from "@mock-functions/get-expected-error-data";

import {validateClickedData} from "@validators/clicked-live-validator";

describe('live clicked validator', () => {

    test('required validator is working', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                  required: {
                      message: 'select single value'
                  }
                },
                validatorsSetting: {
                    required: {
                        liveEnable: true
                    }
                }
            },
            newValue = [],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({hasError: true, message: currentControl.validateRules.required.message})

            const {errorData} = validateClickedData(hookData)

        expect(errorData).toEqual(expectedControlProps)
    })

    test('min length validator is working', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    minLength: {
                        limit: 3,
                        message: 'select minimum 3 values'
                    }
                },
                validatorsSetting: {
                    minLength: {
                        liveEnable: true
                    }
                }
            },
            newValue = [1, '2'],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({...currentControl.validateRules.minLength, hasError: true})

        const {errorData} = validateClickedData(hookData)
        
        expect(errorData).toEqual(expectedControlProps)
    })

    test('max length validator is working', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    minLength: {
                        limit: 3,
                        message: 'select minimum 3 values'
                    }
                },
                validatorsSetting: {
                    minLength: {
                        liveEnable: true
                    }
                }
            },
            newValue = [1, '2'],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({...currentControl.validateRules.minLength, hasError: true})

        const {errorData} = validateClickedData(hookData)

        expect(errorData).toEqual(expectedControlProps)
    })

    test('min value validator is working', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    minValue: {
                        limit: 5,
                        message: 'sum of array numbers must be min 5'
                    }
                },
                validatorsSetting: {
                    minValue: {
                        liveEnable: true
                    }
                }
            },
            newValue = [1, '2'],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({...currentControl.validateRules.minValue, hasError: true})

        const {errorData} = validateClickedData(hookData)

        expect(errorData).toEqual(expectedControlProps)
    })

    test('min value validator ignore when array data sum isNan', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    minValue: {
                        limit: 5,
                        message: 'sum of array numbers must be min 5'
                    }
                },
                validatorsSetting: {
                    minValue: {
                        liveEnable: true
                    }
                }
            },
            newValue = [1, {}, '2'],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({hasError: false})

        const {errorData} = validateClickedData(hookData)

        expect(errorData).toEqual(expectedControlProps)
    })

    test('max value validator is working', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxValue: {
                        limit: 2,
                        message: 'sum of array numbers must be max 2'
                    }
                },
                validatorsSetting: {
                    maxValue: {
                        liveEnable: true
                    }
                }
            },
            newValue = [1, '2'],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({...currentControl.validateRules.maxValue, hasError: true})

        const {errorData} = validateClickedData(hookData)

        expect(errorData).toEqual(expectedControlProps)
    })

    test('max value validator ignore when array data sum isNan', () => {

        const currentControl: ControlProps = {
                type: 'radio',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxValue: {
                        limit: 2,
                        message: 'sum of array numbers must be max 2'
                    }
                },
                validatorsSetting: {
                    maxValue: {
                        liveEnable: true
                    }
                }
            },
            newValue = [1,{},'2'],
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = getExpectedErrorData({hasError: false})

        const {errorData} = validateClickedData(hookData)

        expect(errorData).toEqual(expectedControlProps)
    })

});