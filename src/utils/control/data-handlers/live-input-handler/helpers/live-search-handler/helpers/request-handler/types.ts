import {HookProps, ControlProps, SetForm} from '@common-types'

export type RequestHandler = ( currentControlData: ControlProps, hookData:HookProps, setForm: SetForm) => void