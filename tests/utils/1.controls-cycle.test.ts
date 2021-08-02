import {useImmer} from 'use-immer';
import { renderHook } from '@testing-library/react-hooks'

import {getRequireFormParams} from '@mock-functions/get-require-form-params'
import {getInitFormDataDynamicControls} from '@mock-functions/get-initialized-full-form'


import {ControlsCycleHandler, FormControls, FormProps} from "@common-types";
import {controlsCycle, formCycle} from '@control-utils/controls-cycle'

describe('controls-cycle', () => {

    const formParams = getRequireFormParams()

    test('control cycle run handler for all controls (single/multi)', () => {

        const controls: FormControls = {
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                    }
                ]
              },
              initFormData = getInitFormDataDynamicControls(controls),
              { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            handledControlList = {},
            controlHandler: ControlsCycleHandler = (currentControlData, form, setForm) => {
                const {controlIndex, controlName, currentControl} = currentControlData


                if (controlIndex !== null) {
                    handledControlList[controlName]
                        ? handledControlList[controlName].push(currentControl)
                        : handledControlList[controlName] = [currentControl]
                } else {
                    handledControlList = {...handledControlList, [controlName]: currentControl}
                }

              return true
            }


        controlsCycle(controlHandler, controls, flukyForm, null, setForm)

        expect(handledControlList).toEqual(controls)
    })


    test('if handler return false in single control, controlsCycle return false', () => {

        const controls: FormControls = {
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                        value: 'HR'
                    },
                    {
                        type: 'text',
                        value: 'Admin'
                    }
                ]
            },
            initFormData = getInitFormDataDynamicControls(controls),
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            controlHandler: ControlsCycleHandler = ({currentControl}, form, setForm) => {
                return currentControl.value !== 'Admin'
            },
            cycleResult = controlsCycle(controlHandler, controls, flukyForm, null, setForm)

        expect(cycleResult).toBeFalsy()
    })

    test('if handler return true in all control, controlsCycle return true', () => {

        const controls: FormControls = {
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                        value: 'HR'
                    },
                    {
                        type: 'text',
                        value: 'Admin'
                    }
                ]
            },
            initFormData = getInitFormDataDynamicControls(controls),
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            controlHandler: ControlsCycleHandler = ({currentControl}, form, setForm) => {
                return currentControl.type === 'text'
            },
            cycleResult = controlsCycle(controlHandler, controls, flukyForm, null, setForm)

        expect(cycleResult).toBeTruthy()
    })

})

describe('form-cycle', () => {

    test('form cycle run handler for all single form controls(single/multi)', () => {

        const controls: FormControls = {
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                    }
                ]
            },
            initFormData = getInitFormDataDynamicControls(controls),
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            handledControlList = {},
            controlHandler: ControlsCycleHandler = ({controlIndex, controlName, currentControl}, form, setForm) => {

                if (controlIndex !== null) {
                    handledControlList[controlName]
                        ? handledControlList[controlName].push(currentControl)
                        : handledControlList[controlName] = [currentControl]
                } else {
                    handledControlList = {...handledControlList, [controlName]: currentControl}
                }

                return true
            }

        formCycle(flukyForm, controlHandler, setForm)

        expect(handledControlList).toEqual(controls)
    })

    test('form cycle run handler for all multi form controls(single/multi)', () => {

        const controls: FormControls = [{
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                    }
                ]
            }],
            initFormData = getInitFormDataDynamicControls(controls),
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            handledControlList = [],
            controlHandler: ControlsCycleHandler = ({formIndex, controlIndex, controlName, currentControl}, form, setForm) => {

                if (formIndex !== null) {

                    // handledControlList[formIndex] = {[controlName]: control}

                    if (controlIndex !== null) {
                        handledControlList[formIndex][controlName]
                            ? handledControlList[formIndex][controlName].push(currentControl)
                            : handledControlList[formIndex][controlName] = [currentControl]
                    } else {
                        handledControlList = [{...handledControlList[formIndex], [controlName]: currentControl}]
                    }

                }

                return true
            }

        formCycle(flukyForm, controlHandler, setForm)

        expect(handledControlList).toEqual(controls)
    })

    test('if handler return false in single control, formCycle return false', () => {

        const controls: FormControls = {
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                        value: 'HR'
                    },
                    {
                        type: 'text',
                        value: 'Admin'
                    }
                ]
            },
            initFormData = getInitFormDataDynamicControls(controls),
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            controlHandler: ControlsCycleHandler = ({currentControl}, form, setForm) => {
                return currentControl.value !== 'Admin'
            },
            cycleResult = formCycle(flukyForm, controlHandler, setForm)

        expect(cycleResult).toBeFalsy()
    })

    test('if handler return true in all control, formCycle return true', () => {

        const controls: FormControls = {
                username: {
                    type: 'text'
                },
                profession: [
                    {
                        type: 'text',
                        value: 'HR'
                    },
                    {
                        type: 'text',
                        value: 'Admin'
                    }
                ]
            },
            initFormData = getInitFormDataDynamicControls(controls),
            { result } = renderHook(() => useImmer<FormProps<typeof controls>>(initFormData))

        let [flukyForm, setForm] = result.current,
            controlHandler: ControlsCycleHandler = ({currentControl}, form, setForm) => {
                return currentControl.type === 'text'
            },
            cycleResult = formCycle(flukyForm, controlHandler, setForm)

        expect(cycleResult).toBeTruthy()
    })

})

