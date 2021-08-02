import {getControlFromForm} from '@control-utils/get-control-from-form'
import {formCycle} from '@control-utils/controls-cycle'
import {ControlProps, FormParamsProps, FormProps, ControlsCycleHandler} from "@common-types";


describe('function get need control from multi/singleton form and from singleton/multi control by (formIndex, controlName, controlIndex),', () => {

    test('function get need control from singleton form singleton control', () => {

        let returnedControl = {}
        
        const controlProps: ControlProps = {
                type: 'text',
                controlName: 'username'
              },
              controls = {
                  username: {...controlProps}
              },
              formParams: FormParamsProps = {
                  loaded: false,
                  isFormTriedSubmit: false
              },
              form:FormProps = {
                  controls,
                  formParams,
                  formSettings: {
                      formName: 'myForm'
                  },
                  controlsExample: {}
              },
              controlHandler:ControlsCycleHandler = ({controlName, formIndex, controlIndex}, form) => {
                returnedControl = getControlFromForm(form, controlName, formIndex, controlIndex)
                return true
              }

        formCycle(form, controlHandler)

        expect(controlProps).toEqual(returnedControl)
    })

    test('function get need control from singleton form multi control', () => {

        let returnedControl = {}

        const controlProps: ControlProps = {
                type: 'text',
                controlName: 'username'
            },
            controls = {
                username: [{...controlProps}]
            },
            formParams: FormParamsProps = {
                loaded: false,
                isFormTriedSubmit: false
            },
            form:FormProps = {
                controls,
                formParams,
                formSettings: {
                    formName: 'myForm'
                },
                controlsExample: {}
            },
            controlHandler:ControlsCycleHandler = ({controlName, formIndex, controlIndex}, form) => {
                returnedControl = getControlFromForm(form, controlName, formIndex, controlIndex)
                return true
            }

        formCycle(form, controlHandler)

        expect(controlProps).toEqual(returnedControl)
    })

    test('function get need control from multi form single control', () => {

        let returnedControl = {}

        const controlProps: ControlProps = {
                type: 'text',
                controlName: 'username'
            },
            controls = [{
                username: {...controlProps}
            }],
            formParams: FormParamsProps = {
                loaded: false,
                isFormTriedSubmit: false
            },
            form:FormProps = {
                controls,
                formParams,
                formSettings: {
                    formName: 'myForm'
                },
                controlsExample: {}
            },
            controlHandler:ControlsCycleHandler = ({controlName, formIndex, controlIndex}, form) => {
                returnedControl = getControlFromForm(form, controlName, formIndex, controlIndex)
                return true
            }

        formCycle(form, controlHandler)

        expect(controlProps).toEqual(returnedControl)
    })

    test('function get need control from multi form multi control', () => {

        let returnedControl = {}

        const controlProps: ControlProps = {
                type: 'text',
                controlName: 'username'
            },
            controls = [{
                username: [{...controlProps}]
            }],
            formParams: FormParamsProps = {
                loaded: false,
                isFormTriedSubmit: false
            },
            form:FormProps = {
                controls,
                formParams,
                formSettings: {
                    formName: 'myForm'
                },
                controlsExample: {}
            },
            controlHandler:ControlsCycleHandler = ({controlName, formIndex, controlIndex}, form) => {
                returnedControl = getControlFromForm(form, controlName, formIndex, controlIndex)
                return true
            }

        formCycle(form, controlHandler)

        expect(controlProps).toEqual(returnedControl)
    })

})