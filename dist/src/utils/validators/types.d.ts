import { ControlProps, MaskSettingProps, inputEvents } from "@common-types";
export declare type MaskWriteValue = (maskSetting: MaskSettingProps, currentControl: ControlProps, writeValue: string | number, eventType: typeof inputEvents) => void;
