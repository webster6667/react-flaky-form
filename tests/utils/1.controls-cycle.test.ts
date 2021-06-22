import {useImmer} from 'use-immer';

import {controlsCycle} from './../../src/utils/controls-cycle'
import { renderHook, act } from '@testing-library/react-hooks'
import {ControlProps, FormControls, FormParamsProps, FormProps, SetFormProps} from "src/types";
import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "./../../src/const";


describe('controls-cycle', () => {

    test('should increment counter', () => {
        const formParams: FormParamsProps = {
                loaded: false,
                triedSubmit: false,
                isSubmitBtnLocked: false,
                errorList: [],
                commonError: ''
            },
            controls: FormControls = {
                username: {
                    type: 'text'
                }
            },
            customFormConfig = {},
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>({
                        controls,
                        formParams,
                        formSettings: {
                            ...DEFAULT_FORM_SETTINGS,
                            formName: FORM_NAME,
                            ...customFormConfig
                        },
                        controlsExample: {}
            }))

        const [flukyForm, setForm] = result.current

        const controlHandler = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null, setForm: SetFormProps):boolean => {
            return controlName === 'username'
        }

        expect(controlsCycle(controlHandler, controls, flukyForm, null, setForm)).toBeTruthy()

    })


})


