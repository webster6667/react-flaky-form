import { useState} from 'react'

import {myFunc, useCounter} from "./my-func";
import { renderHook, act } from '@testing-library/react-hooks'


test('is function check when written string greater than limit', () => {

    const { result } = renderHook(() => useState(1))


    act(() => {
        const [state, setState] = result.current


    })



    expect(myFunc()).toBeTruthy()
});