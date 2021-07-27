import {useImmer} from 'use-immer';

import {ControlProps, FormControls, FormParamsProps, FormProps, HookProps, ValidatorErrorProps} from "@common-types";
import {renderHook, act} from "@testing-library/react-hooks";
import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "@const";

import {defaultLiveErrorHandler} from "@error-handlers/live-validator-error-handler"
import {hideLiveErrorAfterTimeout} from "@error-handlers/helpers/hide-live-error-after-timeout"

/**
 * require data for form state
 */
const formParams: FormParamsProps = {
        loaded: false,
        triedSubmit: false,
        isSubmitBtnLocked: false,
        errorList: [],
        commonError: ''
}

describe('hide error after timeout', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    test('myControl.hasError will be false, after timeout ', () => {

        const currentControl:ControlProps = {
                type: 'text'
            },
            controlName = 'myControl',
            controls: FormControls = {
                [controlName]: {
                    type: 'text',
                    label: 'контрол',
                    hasError: true
                }
            },
            newValue = 2,
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>({
                controls,
                formParams,
                formSettings: {
                    ...DEFAULT_FORM_SETTINGS,
                    formName: FORM_NAME
                },
                controlsExample: {}
            }))

        let [form, setForm] = result.current,
            hookData: HookProps = {
                currentControl,
                controlName,
                newValue,
                form,
                controlIndex: null,
                formIndex: null,
                selectedValue: null
            }

        act(() => {
            hideLiveErrorAfterTimeout(hookData, setForm, 100)
        })

        act(() => {

            setTimeout(() => {

                let controlResult = result.current[0].controls.myControl as ControlProps,
                    controlHasError = controlResult.hasError

                expect(controlHasError).toBeFalsy()
            },200);

            jest.runAllTimers();

        })

    })

})



describe('default live validator error handler', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });
    
    test('myControl.hasError will be true ,myControl.error has parsed error message, after timeout', () => {

        const currentControl:ControlProps = {
                type: 'text'
            },
            controlName = 'myControl',
            controls: FormControls = {
                [controlName]: {
                    type: 'text',
                    label: 'контрол',
                    hasError: false
                }
            },
            newValue = 2,
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>({
                controls,
                formParams,
                formSettings: {
                    ...DEFAULT_FORM_SETTINGS,
                    formName: FORM_NAME
                },
                controlsExample: {}
            }))

        let [form, setForm] = result.current,
            message = "limit has been exceeded, {limit} is maximum",
            limit = 3,
            errorDataForControl: ValidatorErrorProps  = {
                hasError: false,
                shouldLockNotValidWrite: false,
                message,
                limit,
                showLiveErrorAfterFirstSubmit: null,
                hideErrorTimeout: null,
                showErrorTimeout: null
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

        act(() => {
            defaultLiveErrorHandler(errorDataForControl, hookData, setForm)
        })


        let controlResult = result.current[0].controls.myControl as ControlProps,
            controlHasError = controlResult.hasError,
            controlErrorMessage = controlResult.error

        
        expect(controlHasError).toBeTruthy()
        expect(controlErrorMessage).toEqual(message.replace(/{limit}/gm, limit.toString()))
    })
    
})