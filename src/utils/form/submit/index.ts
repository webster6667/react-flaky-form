import axios from 'axios'
// import {controlsCycle} from "@control-utils/controls-cycle";
import {SubmitFlakyFormHandler} from "./types"

/**
 * @description
 * Функция обрабатывающая отправку формы на сервер
 *
 * @param {SetForm} setForm - Функция обрабрабатывающая глобальный объект формы
 */
export const submitFlakyFormHandler:SubmitFlakyFormHandler = async (setForm) => {

    setForm( (prevForm) => {
        const form = {...prevForm}
        // form.formState.errorList = []
        form.formState.isFormTriedSubmit = true

        /**
         * Про валидироват все контролы перед отправкой
         */
        // let isAllControlsValid = formCycle(form, controlsHandlerBeforeSubmit)

        // if (isAllControlsValid) {}

            const {action = null, beforeRequest, afterSubmit} = form.formSettings

                // initAction = action
                // action ? typeof action === 'object' && action.toSubmit ? action.toSubmit : String(action) : null

            const {body = null} = typeof beforeRequest === "function" ? beforeRequest(form) : {}


            if (action) {
                axios.post(action, body).then((data) => {
                    const {status} = data

                    // /**
                    //  * Хук успешной отправки
                    //  */
                    // if (status === 200 && typeof afterSuccessSubmit === "function") {
                    //     afterSuccessSubmit(data)
                    // }
                    //
                    // /**
                    //  * Хук не успешной отправки
                    //  */
                    // if (status === 500 && typeof afterErrorSubmit === "function") {
                    //     afterErrorSubmit(data)
                    // }

                    /**
                     * Хук после любой отправки
                     */


                        setForm((prevForm) => {
                            const form = {...prevForm},
                                  {afterSubmit = null} = form.formSettings

                            if (typeof afterSubmit === "function") {
                                afterSubmit(form, data)
                            }

                            return form

                        })


                }).catch((data) => {
                    const {status} = data

                    setForm((prevForm) => {
                        const form = {...prevForm},
                            {afterSubmit = null} = form.formSettings

                        if (typeof afterSubmit === "function") {
                            afterSubmit(form, data)
                        }

                        return form

                    })

                    // /**
                    //  * Хук не успешной отправки
                    //  */
                    // if (status === 500 && typeof afterErrorSubmit === "function") {
                    //     afterErrorSubmit(data)
                    // }

                    // /**
                    //  * Хук после любой отправки
                    //  */
                    // if (typeof afterSubmit === "function") {
                    //     afterSubmit(data)
                    // }

                })
            } else {

                if (typeof afterSubmit === "function") {
                    afterSubmit(form)
                }

            }

            return form
    })

}