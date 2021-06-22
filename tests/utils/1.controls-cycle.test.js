import React, {useState} from 'react'
import { renderHook, act } from '@testing-library/react-hooks'


import {controlsCycle} from './../../src/utils/controls-cycle'
import {FormControls, FormParamsProps, FormProps} from "./../../src/types"

describe('controls-cycle', () => {

    test('should increment counter', () => {
        const { result } = renderHook(() => useState(1))


        expect(result.current).toBe(2)
    })

    // test('is function do cycle for all controls in single form', () => {
    //     const formParams: FormParamsProps = {
    //             loaded: false,
    //             triedSubmit: false,
    //             isSubmitBtnLocked: false,
    //             errorList: [],
    //             commonError: ''
    //         },
    //         form: FormProps<FormControls> = {
    //         controls: {
    //             username: {
    //                 type: "text"
    //             }
    //         },
    //         formParams
    //     }
    //
    //     const cycleHandler = () => {
    //         return true
    //     }
    //
    //
    //
    //     // expect(controlsCycle(formParams, cycleHandler, ))
    // });


})


