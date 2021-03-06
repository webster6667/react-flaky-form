import {ControlProps, MaskSettingProps, inputEvents} from "@common-types";

export type MaskWriteValue = (maskSetting: MaskSettingProps, currentControl: ControlProps, writeValue: string | number, eventType: typeof inputEvents) => void