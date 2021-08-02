import {useImmer} from 'use-immer';

import {ControlProps, FormProps, ValidatorErrorProps} from "@common-types";
import {act, renderHook} from "@testing-library/react-hooks";

import {getInitFormDataSingleControl} from '@mock-functions/get-initialized-full-form'
import {getHookData} from '@mock-functions/get-hook-data'



import {liveInputHandler} from "@control-handlers/live-input-handler";


//@todo: Ошибки скрываются через указанное време

/**
 * В контроле появляется ошибка
 * Через таймаут она должна исчезнуть
 */

//@todo: Если


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

    test('live click input validator is working', () => {

        const currentControl:ControlProps = {
                type: 'select',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    required: {
                        message: 'select single option'
                    }
                },
                validatorsSetting: {
                    required: {
                        liveEnable: true,
                        showLiveErrorAfterFirstSubmit: false
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = ''


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                value: newValue,
                hasError: true,
                error: 'select single option'
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

    test('live error dont show before first form submit if showLiveErrorAfterFirstSubmit === true', () => {

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
                        showLiveErrorAfterFirstSubmit: true
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
                hasError: false
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]

        expect(controlStateAfterValidate).toEqual(expectedControlProps)
    })

    test('live error show after first form submit if showLiveErrorAfterFirstSubmit === true', () => {

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
                        showLiveErrorAfterFirstSubmit: true
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl)

        initFormData.formParams.isFormTriedSubmit = true

        const { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
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

    test('write output should locking, if input not valid and shouldLockNotValidWrite === true', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    maxLength: {
                        message: 'not longer that 3 symbol',
                        limit: 3
                    }
                },
                validatorsSetting: {
                    maxLength: {
                        liveEnable: true,
                        showLiveErrorAfterFirstSubmit: false,
                        shouldLockNotValidWrite: true
                    }
                },
                value: '123'
              },
              {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
              { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
              newValue = '1234'


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlProps = {
                ...currentControl,
                hasError: true,
                error: 'not longer that 3 symbol'
            }

        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]

        expect(controlStateAfterValidate).toEqual(expectedControlProps)
    })


    test('error show after timeout if showErrorTimeout > 0', () => {

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
                        showLiveErrorAfterFirstSubmit: false,
                        shouldLockNotValidWrite: true,
                        showErrorTimeout: 100
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 5


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlPropsAfterTimeout = {
                ...currentControl,
                hasError: true,
                error: 'limit 3 was exceeded',
                _showErrorTimeoutId: 1
            },
            controlPropsAfterTimeout


        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
            
            setTimeout(() => {
                controlPropsAfterTimeout = result.current[0].controls[controlName]
            },200);
            
            jest.runAllTimers();
        })

        expect(controlPropsAfterTimeout).toEqual(expectedControlPropsAfterTimeout)

    })

    test('error dont show after submit if showErrorTimeout > 0', () => {

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
                        showLiveErrorAfterFirstSubmit: false,
                        shouldLockNotValidWrite: true,
                        showErrorTimeout: 100
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 5


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlPropsAfterSubmit = {
                ...currentControl,
                _showErrorTimeoutId: 1,
            }


        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        const controlStateAfterValidate = result.current[0].controls[controlName]
        
        expect(controlStateAfterValidate).toEqual(expectedControlPropsAfterSubmit)
    })

    /**
     * Появляется первый таймаут, показать ошибку через 200 сек
     * Через 150 сек появляется новый таймаут, и отменяет первый таймаут
     * Через 210 сек от первого таймаута, в контроле не должно быть ошибки, так как ее отображение перетер 2-й таймаут
     * Но через 360 в контроле должена быть ошибка второго таймаута
     */
    test('first error show will be cleared when next timeout will be call', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                validateRules: {
                    minValue: {
                        message: 'minimum {limit}',
                        limit: 3
                    },
                    maxLength: {
                        message: '{limit} length is limit',
                        limit: 2
                    }
                },
                validatorsSetting: {
                    minValue: {
                        liveEnable: true,
                        showErrorTimeout: 200
                    },
                    maxLength: {
                        liveEnable: true,
                        shouldLockNotValidWrite: false,
                        showErrorTimeout: 400
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 2,
            valueForSecondTimeout = 222



        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlPropsAfterFirstTimeout = {
                ...currentControl,
                value: valueForSecondTimeout,
                hasError: false,
                _showErrorTimeoutId: 5
            },
            expectedControlPropsAfterSecondTimeout = {
                ...currentControl,
                value: valueForSecondTimeout,
                hasError: true,
                error: '2 length is limit',
                _showErrorTimeoutId: 5
            },
            controlPropsAfterFirstTimeout,
            controlPropsAfterSecondTimeout


        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)


            setTimeout(() => {
                currentControl.value = valueForSecondTimeout
                const newHookData = getHookData({currentControl: currentControl, controlName, newValue: valueForSecondTimeout, form})

                liveInputHandler(currentControl, form, newHookData, 'change', setForm)

            },100);

            setTimeout(() => {
                controlPropsAfterFirstTimeout = result.current[0].controls[controlName]
            },210);

            setTimeout(() => {
                controlPropsAfterSecondTimeout = result.current[0].controls[controlName]
            },610);

            jest.runAllTimers();
        })

        expect(controlPropsAfterFirstTimeout).toEqual(expectedControlPropsAfterFirstTimeout);
        expect(controlPropsAfterSecondTimeout).toEqual(expectedControlPropsAfterSecondTimeout);
    })

    test('error hide after timeout if hideErrorTimeout > 0', () => {

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
                        showLiveErrorAfterFirstSubmit: false,
                        shouldLockNotValidWrite: true,
                        showErrorTimeout: 100,
                        hideErrorTimeout: 100
                    }
                }
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 5


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue, form}),
            expectedControlPropsAfterTimeout = {
                ...currentControl,
                hasError: true,
                error: 'limit 3 was exceeded',
                _showErrorTimeoutId: 1,
                _hideErrorTimeoutId: 4
            },
            expectedControlPropsAfterHideTimeout = {
                ...expectedControlPropsAfterTimeout,
                hasError: false
            },
            controlPropsAfterTimeout,
            controlPropsAfterHideTimeout



        act(() => {
            liveInputHandler(currentControl, form, hookData, 'change', setForm)

            setTimeout(() => {
                controlPropsAfterTimeout = result.current[0].controls[controlName]
            },200);

            setTimeout(() => {
                controlPropsAfterHideTimeout = result.current[0].controls[controlName]
            },350);

            jest.runAllTimers();
        })

        expect(controlPropsAfterTimeout).toEqual(expectedControlPropsAfterTimeout)
        expect(controlPropsAfterHideTimeout).toEqual(expectedControlPropsAfterHideTimeout)
    })

})