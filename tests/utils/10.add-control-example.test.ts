import {addControlExample} from '@add-control-props-layers/add-control-example'
import {ControlsProps, ControlProps, CurrentControlData} from "@common-types";


describe('function create control example', () => {

    test('create example from single control', () => {

        const exampleControlList: ControlsProps = {},
              controlName = 'username',
              control: ControlProps = {
                      type: 'text'
              },
              currentControlData:CurrentControlData = {currentControl: control, controlName, formName: '', controlIndex: null, formIndex: null},
              expectedExampleList: ControlsProps = {
                    [controlName]: control
              }

        addControlExample(exampleControlList, currentControlData)

        expect(exampleControlList).toEqual(expectedExampleList)

    })

    test('create example from multi control', () => {

        const exampleControlList: ControlsProps = {},
              controlName = 'username',
              multiControl: ControlProps[] = [
                      {
                          type: 'text',
                          value: '1'
                      },
                      {
                          type: 'text',
                          value: '2'
                      },
              ],
              expectedExampleList: ControlsProps = {
                  [controlName]: [
                      multiControl[0]
                  ]
              }

        if (Array.isArray(multiControl)) {

            multiControl.map((control, controlIndex) => {
                const currentControlData:CurrentControlData = {currentControl: control, controlName, formName: '',  controlIndex, formIndex: null}

                addControlExample(exampleControlList, currentControlData)
            })

        }

        expect(exampleControlList).toEqual(expectedExampleList)
    })

})

