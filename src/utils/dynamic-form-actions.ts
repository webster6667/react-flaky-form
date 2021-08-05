import {addControlSetting} from "./add-control-setting"
import {getMultiControlArray} from "@control-utils/get-multi-control-array"
import {toggleSubmitBtnLockRelativeLockValidatorError} from "./form-actions"
import {controlsCycle} from "@control-utils/controls-cycle"


import {FormProps, SetFormProps} from "@common-types"

import {
    AddFormExample,
    RemoveFormByIndex
} from "./types"

/**
 * @description
 * Добавить экземпляр формы
 *
 * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
 *
 */
export const addFormExample:AddFormExample = (setForm) => {

    setForm((form) => {

        /**
         * Если это мульти форма
         */
        if (Array.isArray(form.controls)) {

            //Добавить копию заиниченной формы, если ничего не передали
            const formExample = {...form.controlsExample},
                  controls = form.controls

            //Добавить новую форму
            controls.push(formExample)

            //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
            toggleSubmitBtnLockRelativeLockValidatorError(form)
        }

    })

}

/**
 * @description
 * Удалить экземпляр формы по индексу
 *
 * @param {number | null} formIndex - Индекс формы
 * @param {SetFormProps} setForm - Функция обрабатывающая глобальный объект формы
 *
 */
export const removeFormByIndex:RemoveFormByIndex = (formIndex = null, setForm) => {
    const isMultiform = formIndex != null

    if (isMultiform) {

        setForm((form) => {

            //Если группа форм
            if (Array.isArray(form.controls)) {

                //Удалить форму
                form.controls.splice(formIndex, 1)

                //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
                toggleSubmitBtnLockRelativeLockValidatorError(form)
            }


        })

    }

}

//Добавить экземпляр переданного контрола
export const addControlExample = (setForm: any, controlName: string, formIndex: null | number = null) => {

    setForm((form:FormProps) => {
        const controls = form.controls,
            multiControlArray = getMultiControlArray(controls, controlName, formIndex),
            controlExample = {...form.controlsExample[controlName][0]}

        multiControlArray.push(controlExample)

        //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
        toggleSubmitBtnLockRelativeLockValidatorError(form)
    })

}

//Удалить контрол из списка контролов
export const removeControlFromListByIndex = (setForm: any, controlName: string, formIndex: number | null = null, controlIndex: number) => {

    //Проверка наличия индекса и имя контрола
    if (controlIndex !== null && controlName) {

        setForm((form:FormProps) => {
            const formControls = form.controls,
                multiControlArrayForRemove = getMultiControlArray(formControls, controlName, formIndex)

            multiControlArrayForRemove.splice(controlIndex, 1)

            //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
            toggleSubmitBtnLockRelativeLockValidatorError(form)
        })

    }

}

// //Добавить новый контрол в список существующего
// export const addNewControlToControlList = (setForm: any, controlName: string, formIndex: null | number = null, newControlLayout: ControlProps) => {
//
//     setForm((form:FormProps) => {
//         const controls = form.controls,
//             controlArray = getMultiControlArray(controls, controlName, formIndex)
//
//             controlArray.push(newControlLayout)
//
//         const newControlIndex = controlArray.length - 1,
//             newControl = controlArray[newControlIndex]
//
//         //Наложить все настройки на новый контрол
//         addControlSetting(newControl, controlName, form, formIndex, newControlIndex, setForm)
//
//         //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
//         toggleSubmitBtnLockRelativeLockValidatorError(form)
//     })
//
// }
//
// //Добавить новый контрол в форму
// export const addNewControlToForm = (setForm: any, controlName: string, newFormControl: ControlProps | ControlProps[], formIndex: null | number = null) => {
//
//     setForm((form:FormProps) => {
//
//         let newControl = null,
//             newControlIndex = null
//
//         if (controlName) {
//
//             if (formIndex === null) {
//
//                 if (!Array.isArray(form.controls)) {
//
//                     form.controls[controlName] = newFormControl
//                     newControl = form.controls[controlName]
//                 }
//
//             } else {
//
//
//                 if (Array.isArray(form.controls)) {
//                     form.controls[formIndex][controlName] = newFormControl
//                     newControl = form.controls[formIndex][controlName]
//                 }
//
//             }
//
//             //Наложить все настройки на новый контрол
//             addControlSetting(newControl, controlName, form, formIndex, newControlIndex, setForm)
//
//             //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
//             toggleSubmitBtnLockRelativeLockValidatorError(form)
//         }
//
//     })
//
// }
//
// export const removeControlFromForm = (setForm: any, controlName: string, formIndex: number | null = null) => {
//
//     setForm((form: FormProps) => {
//         formIndex != null ? delete form.controls[formIndex][controlName] : delete form.controls[controlName]
//     })
//
// }
//
// //Добавить новую форму
// export const addNewForm = (setForm: any, addedNewForm: ControlsProps) => {
//
//     setForm((form:FormProps) => {
//
//         //Если список контролов массив
//         if (Array.isArray(form.controls)) {
//
//             //Добавить копию заиниченной формы, если ничего не передали
//             const controls = form.controls
//
//             //Добавить новую форму
//             controls.push(addedNewForm)
//
//             const newFormIndex = form.controls.length
//
//             //Прогнать все контролы новой формы через инит
//             controlsCycle(addControlSetting, addedNewForm, form, newFormIndex, setForm)
//
//             //Заблокировать кнопку если не пройденный ошибки lockBtn валидатора, разблокировать если все пройдены
//             toggleSubmitBtnLockRelativeLockValidatorError(form)
//
//             // //Провалидировать все контролы после добавления новой формы
//             // form.formParams.isAllFormsValid = isFormValid(controls)
//             //
//             // //Индекс добавленной формы
//             // const newFormIndex = controls.length - 1,
//             //     newFormControls = controls[newFormIndex]
//             //
//             // //Добавить все дефолтные настройки новой форме
//             // addLiveValidatorsLayersForControls(form, newForm, form.formSettings)
//             // addHandlersToUpdateState(newFormControls, setForm, form.formSettings.formName)
//         }
//
//     })
//
//
//
// }