import {FormProps, HookProps, SetForm} from "@common-types";

export type HideLiveErrorAfterTimeout = (hooksData: HookProps, setForm: SetForm, ms: number) => ReturnType<typeof setTimeout>
