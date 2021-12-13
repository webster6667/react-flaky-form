import axios from 'axios'
// import {controlsCycle} from "@control-utils/controls-cycle";
import {SubmitFlakyFormHandler} from "./types"

/**
 * @description
 * Функция обрабатывающая отправку формы на сервер
 *
 * @param {SetForm} setForm - Функция обрабрабатывающая глобальный объект формы
 * @param {any} requestFn - Функция делающая запрос на сервер если все фалидации фронта прошли успешно
 */
export const submitFlakyFormHandler:SubmitFlakyFormHandler = async (setForm, submitHandler, submitRequestFn) => {

    setForm( async (form) => {
        // const form = {...prevForm}
        // form.formState.errorList = []
        form.formState.isFormTriedSubmit = true

        /**
         * Про валидироват все контролы перед отправкой
         */
        // let isAllControlsValid = formCycle(form, controlsHandlerBeforeSubmit)

        // if (isAllControlsValid) {}

            // const {action = null, beforeRequest, afterSubmit} = form.formSettings

                // initAction = action
                // action ? typeof action === 'object' && action.toSubmit ? action.toSubmit : String(action) : null

            // const {body = null} = typeof beforeRequest === "function" ? beforeRequest(form) : {}


            // if (action) {
            //     axios.post(action, body).then((data) => {
            //
            //         /**
            //          * Хук после любой отправки
            //          */
            //          setForm((form) => {
            //              const {afterSubmit = null} = form.formSettings
            //
            //              if (typeof afterSubmit === "function") {
            //                  afterSubmit(form, data)
            //              }
            //
            //              return form
            //
            //          })
            //
            //
            //     }).catch((data) => {
            //         const {status} = data
            //
            //         /**
            //          * Хук после любой отправки
            //          */
            //         setForm((form) => {
            //             const {afterSubmit = null} = form.formSettings
            //
            //             if (typeof afterSubmit === "function") {
            //                 afterSubmit(form, data)
            //             }
            //
            //
            //         })
            //
            //     })
            // } else

            if (submitRequestFn && typeof submitRequestFn === "function") {

                 const data = await submitRequestFn()

                /**
                 * Хук после любой отправки
                 */
                setForm((form) => {

                    if (typeof submitHandler === "function") {
                        submitHandler(form, data)
                    }


                })

            } else {

                if (typeof submitHandler === "function") {
                    submitHandler(form)
                }

            }

    })

}