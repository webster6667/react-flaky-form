import {useImmer} from 'use-immer';

import {ControlProps, FormControls, FormParamsProps, FormProps, HookProps} from "@common-types";
import {act, renderHook} from "@testing-library/react-hooks";


import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "@const";
import {liveInputHandler} from "@control-handlers/live-input-handler";


const formParams: FormParamsProps = {
    loaded: false,
    triedSubmit: false,
    isSubmitBtnLocked: false,
    errorList: [],
    commonError: ''
}

//@todo: Маска работает
//@todo: Живой валидатор работает
//@todo: Дополнительный валидатор работает
//@todo: Дополнительны валидатор дополняет живой
//@todo: Ошибки всплывают только после первой попытки
//@todo: Ошибки всплывают всегда
//@todo: Вывод данных блокируется
//@todo: Вывод данных открыт
//@todo: Ошибки всплывают по дебанусу если он есть
//@todo: Ошибки скрываются через указанное време

// const getFormData = (controlName, currentControl, newValue) => {
//
//     const controls: FormControls = {
//             [controlName]: currentControl
//         },
//         dataForFormInit = {
//             controls,
//             formParams,
//             formSettings: {
//                 ...DEFAULT_FORM_SETTINGS,
//                 formName: FORM_NAME
//             },
//             controlsExample: {}
//         }
//
// }
//
// const getHookData = (controlName, currentControl, newValue, form) => {
//     const hookData: HookProps = {
//         currentControl,
//         controlName,
//         newValue,
//         form,
//         controlIndex: null,
//         formIndex: null,
//         selectedValue: null
//     }
//
//     return hookData
// }

describe('live input handler', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    test('input mask is working', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол',
                hasError: false,
                maskSetting: {
                    maskPlaceholder: '_',
                    maskPattern: '+7(999)-999-99-99'
                }
            },
            controlName = 'myControl',
            controls: FormControls = {
                [controlName]: currentControl
            },
            newValue = 5,
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
            liveInputHandler(currentControl, form, hookData, 'change', setForm)
        })

        console.log(result.current[0]);


    })

})