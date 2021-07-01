import {addRequireFields} from '@add-control-props-layers/add-required-field'
import {ControlProps} from "@common-types";


describe('required fields have been added for all control types', () => {

    test('fields have been added to text input', () => {

        const control: ControlProps  = {
                type: 'text'
              },
              controlName = 'username',
              formName = 'Form',
              expectedObject = {
                  type: 'text',
                  error: '',
                  hasError: false,
                  controlName,
                  inputName: `${formName}[${controlName}]`,
                  value: ''
              }

        addRequireFields(control, controlName, formName)

        expect(control).toEqual(expectedObject)
    })

    test('text value not overwriting', () => {

        const value = 'text-value',
              control: ControlProps  = {
                type: 'text',
                value
              },
              controlName = 'username',
              formName = 'Form',
              expectedObject = {
                  type: 'text',
                  error: '',
                  hasError: false,
                  controlName,
                  inputName: `${formName}[${controlName}]`,
                  value
              }

        addRequireFields(control, controlName, formName)

        expect(control).toEqual(expectedObject)
    })

    test('fields have been added to select input', () => {

        const options = [
                    {
                        label: "select",
                        value: '1',
                        locked: false,
                        checked: false
                    }
              ],
              control: ControlProps  = {
                type: 'select',
                options
              },
              controlName = 'username',
              formName = 'Form',
              expectedObject = {
                  type: 'select',
                  options,
                  error: '',
                  hasError: false,
                  controlName,
                  inputName: `${formName}[${controlName}]`,
                  isMultiple: false,
                  value: options[0].value
              }


        addRequireFields(control, controlName, formName)

        expect(control).toEqual(expectedObject)
    })

    test('if in select input active value empty, select first of the options', () => {

        const options = [
                {
                    label: "select1",
                    value: '1',
                    locked: false,
                    checked: false
                },
                {
                    label: "select2",
                    value: '2',
                    locked: false,
                    checked: false
                },
            ],
            control: ControlProps  = {
                type: 'select',
                options
            },
            controlName = 'username',
            formName = 'Form',
            expectedObject = {
                type: 'select',
                options,
                error: '',
                hasError: false,
                controlName,
                inputName: `${formName}[${controlName}]`,
                isMultiple: false,
                value: options[0].value
            }


        addRequireFields(control, controlName, formName)

        expect(control).toEqual(expectedObject)
    })

})