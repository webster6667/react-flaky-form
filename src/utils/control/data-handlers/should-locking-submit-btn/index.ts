import {ShouldLockingSubmitBtn} from "./types"
import {validateWrittenData} from "@validators/written-live-validator";
import {validateClickedData} from "@validators/clicked-live-validator";import {HookProps} from "@src/types";

/**
 * Проверяет блокирует ли контрол кнопку отправки
 */
export const shouldLockingSubmitBtn:ShouldLockingSubmitBtn = (currentControlData, form) => {

    const {currentControl, controlName} = currentControlData,
          { type } = currentControl,
          textControlTypes = ['phone', 'number', 'text', 'password', 'date'],
          isTextControl = textControlTypes.includes(type),
          defaultValidateFunction = isTextControl ? validateWrittenData : validateClickedData,
          liveValidator = currentControl.customLiveValidator || defaultValidateFunction,
          hooksData:HookProps = {
            form,
            currentControl,
            controlName,
            newValue: currentControl.value
          }

          
    const {errorData} = liveValidator(hooksData),
          {hasErrorLockingSubmitBtn} = errorData

    return hasErrorLockingSubmitBtn
}