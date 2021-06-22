import {addControlSetting} from './../../src/utils/add-control-setting'
import {ControlProps, ControlsProps, FormParamsProps, FormProps, SetFormProps} from "./../../src/types"

describe('controls-cycle', () => {

    test('is function do cycle for all controls in single form', () => {

        const formParams: FormParamsProps = {
                loaded: false,
                triedSubmit: false,
                isSubmitBtnLocked: false,
                errorList: [],
                commonError: ''
            },
            controls: ControlsProps = {
                username: {
                    type: "text",
                    controlName: 'username'
                }
            },
            form: FormProps = {
                controls,
                formParams
            },
            control: ControlProps = controls.username


            // export const addControlSetting = (control: ControlProps, controlName: string, form: FormProps, formIndex: number | null = null, controlIndex: number | null = null, setForm: SetFormProps):boolean => {


            expect(addControlSetting(control, control.controlName, form, null, null, (form) => true))
    });


})

