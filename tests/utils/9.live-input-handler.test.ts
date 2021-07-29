import {useImmer} from 'use-immer';

import {ControlProps, FormProps, ValidatorErrorProps} from "@common-types";
import {act, renderHook} from "@testing-library/react-hooks";

import {getInitFormDataSingleControl} from '@mock-functions/get-initialized-full-form'
import {getHookData} from '@mock-functions/get-hook-data'


import {liveInputHandler} from "@control-handlers/live-input-handler";


//@todo: Маска работает +
//@todo: Живой валидатор работает с выводом ошибки, без дебаунса +
//@todo: Дополнительный валидатор работает +
//@todo: Дополнительный валидатор модифицирует введенное значение +
//@todo: Дополнительны валидатор сильнее обычного +

//@todo: Кликабельный валидатор


//@todo: Ошибки всплывают только после первой попытки
//@todo: Ошибки всплывают всегда
//@todo: Вывод данных блокируется
//@todo: Вывод данных открыт
//@todo: Ошибки всплывают по дебанусу если он есть
//@todo: Ошибки скрываются через указанное време

describe('live input handler', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    test('input mask is working', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                maskSetting: {
                    maskPlaceholder: '_',
                    maskPattern: '+7(999)-999-99-99'
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 5


            let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                hasError: true,
                value: '+7(5__)-___-__-__'
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterMaskValidate = result.current[0].controls[controlName]

        expect(controlStateAfterMaskValidate).toEqual(expectedControlProps)
    })

    test('live write input validator is working', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxValue: {
                        message: 'limit {limit} was exceeded',
                        limit: 3
                    }
                },
                validatorsSetting: {
                    maxValue: {
                        liveEnable: true,
                        showLiveErrorAfterFirstSubmit: false
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 5


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                value: newValue,
                hasError: true,
                error: 'limit 3 was exceeded'
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]

        expect(controlStateAfterValidate).toEqual(expectedControlProps)
    })

    test('live write input validator is working', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxValue: {
                        message: 'limit {limit} was exceeded',
                        limit: 3
                    }
                },
                validatorsSetting: {
                    maxValue: {
                        liveEnable: true,
                        showLiveErrorAfterFirstSubmit: false
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 5


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                value: newValue,
                hasError: true,
                error: 'limit 3 was exceeded'
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]

        expect(controlStateAfterValidate).toEqual(expectedControlProps)
    })

    test('additional write validator is working', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxValue: {
                        message: 'limit {limit} was exceeded',
                        limit: 10
                    }
                },
                validatorsSetting: {
                    maxValue: {
                        liveEnable: true,
                        showLiveErrorAfterFirstSubmit: false
                    }
                },
                additionalLiveValidator: ({newValue}) => {
                    const errorData: ValidatorErrorProps = {
                        hasError: false,
                        shouldLockNotValidWrite: false,
                        message: null,
                        limit: null,
                        showLiveErrorAfterFirstSubmit: false,
                        hideErrorTimeout: null,
                        showErrorTimeout: null,
                    }

                    if (newValue === 6) {
                        errorData.hasError = true
                        errorData.message = '{writeValue} is not happy number'
                    }

                    return {errorData}

                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 6


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                value: newValue,
                hasError: true,
                error: `${newValue} is not happy number`
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]

        expect(controlStateAfterValidate).toEqual(expectedControlProps)
    })

    test('additional write validator can modify written value', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxValue: {
                        message: 'limit {limit} was exceeded',
                        limit: 10
                    }
                },
                validatorsSetting: {
                    maxValue: {
                        liveEnable: true,
                        showLiveErrorAfterFirstSubmit: false
                    }
                },
                additionalLiveValidator: ({newValue}) => {
                    const errorData: ValidatorErrorProps = {
                        hasError: false,
                        shouldLockNotValidWrite: false,
                        message: null,
                        limit: null,
                        showLiveErrorAfterFirstSubmit: false,
                        hideErrorTimeout: null,
                        showErrorTimeout: null,
                    }

                    if (newValue === 6) {
                        errorData.hasError = true
                        errorData.message = '{writeValue} is not happy number'
                    }

                    return {modifiedValueToWrite: 666,errorData}

                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 6


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                value: 666,
                hasError: true,
                error: `${newValue} is not happy number`
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]
        
        expect(controlStateAfterValidate).toEqual(expectedControlProps)
    })

})