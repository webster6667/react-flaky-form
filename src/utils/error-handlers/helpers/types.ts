import {HookProps, SetFormProps} from "@common-types";

export type HideLiveErrorAfterTimeout = (hooksData: HookProps, setForm: SetFormProps, ms: number) => NodeJS.Timeout