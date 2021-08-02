import {useImmer} from 'use-immer';

import {ControlProps, FormProps, HookProps, ValidatorErrorProps} from "@common-types";
import {renderHook, act} from "@testing-library/react-hooks";

import {getRequireFormParams} from '@mock-functions/get-require-form-params'
import {getInitFormDataSingleControl} from "@mock-functions/get-initialized-full-form";
import {getHookData} from "@mock-functions/get-hook-data";


import {defaultLiveErrorHandler} from "@error-handlers/live-validator-error-handler"
import {hideLiveErrorAfterTimeout} from "@error-handlers/helpers/hide-live-error-after-timeout"


/**
 * require data for form state
 */
const formParams = getRequireFormParams()

describe('hide error after timeout', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    test('myControl.hasError will be false, after timeout ', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: true
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 2


        let [form, setForm] = result.current,
            hookData = getHookData({currentControl, controlName, newValue})

        act(() => {
            hideLiveErrorAfterTimeout(hookData, setForm, 100)
        })

        act(() => {

            setTimeout(() => {

                let controlResult =  !Array.isArray(result.current[0].controls) ? result.current[0].controls[controlName] as ControlProps : null,
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
                type: 'text',
                label: 'контрол',
                hasError: false
            },
            {controlName, initFormData} = getInitFormDataSingleControl(currentControl),
            { result } = renderHook(() => useImmer<FormProps<typeof initFormData.controls>>(initFormData)),
            newValue = 2


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


        let controlResult = !Array.isArray(result.current[0].controls) ? result.current[0].controls[controlName] as ControlProps : null,
            controlHasError = controlResult.hasError,
            controlErrorMessage = controlResult.error

        
        expect(controlHasError).toBeTruthy()
        expect(controlErrorMessage).toEqual(message.replace(/{limit}/gm, limit.toString()))
    })
    
})