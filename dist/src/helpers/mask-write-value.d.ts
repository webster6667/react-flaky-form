import { InputMaskProps, ControlProps } from "./../types";
export declare function unmask(pattern: string, placeholder: any, textAfterMask: string | number): string;
export declare function maskWriteValue(inputMask: InputMaskProps, currentControl: ControlProps, writeValue: string | number, eventType: string): void;
