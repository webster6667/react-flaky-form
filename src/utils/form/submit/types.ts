import {SubmitRequestFn, SetForm, FormProps} from "@common-types";

type SubmitHandler = (form:FormProps, responseData?) => void

export type SubmitFlakyFormHandler = (setForm:SetForm, submitHandler?: SubmitHandler, submitRequestFn?:SubmitRequestFn) => void
