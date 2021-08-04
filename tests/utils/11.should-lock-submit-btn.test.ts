import {shouldLockSubmitBtnByControl} from '@control-handlers/submit-btn-lock-handler'
import {getInitFormDataSingleControl} from "@mock-functions/get-initialized-full-form";
import {getHookData} from "@mock-functions/get-hook-data";

import {ControlProps, CurrentControlData} from "@common-types";
import {defaultStaticValidator} from "@validators/static-validator";
import {LockSubmitBtnErrorData} from "@control-handlers/types";

describe('set-lock-submit-validator-result find, should lock submit btn', () => {

    test('shouldLockSubmitBtn === false, if control valid', () => {

        const currentControl:ControlProps = {
                  type: 'text',
                  value: 'abc'
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              shouldLockSubmitBtn = shouldLockSubmitBtnByControl(currentControlData, form)

        expect(shouldLockSubmitBtn).toBeFalsy()
    })

    test('shouldLockSubmitBtn === false, if control has error on rules, but in rule settings shouldLockSubmitBtnWhenControlInvalid !== true', () => {

        const currentControl:ControlProps = {
                  type: 'text',
                  value: 'abc',
                  validateRules: {
                      maxLength: {
                          limit: 2,
                          message: 'longer than limit'
                      }
                  }
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              shouldLockSubmitBtn = shouldLockSubmitBtnByControl(currentControlData, form)

        expect(shouldLockSubmitBtn).toBeFalsy()
    })

    test('shouldLockSubmitBtn === true, if control has error on rules, and in rule settings shouldLockSubmitBtnWhenControlInvalid === true', () => {

        const validatorName = 'maxLength',
              currentControl:ControlProps = {
                  type: 'text',
                  value: 'abc',
                  validateRules: {
                      [validatorName]: {
                          limit: 2,
                          message: 'longer than limit'
                      },
                  },
                  validatorsSetting: {
                      [validatorName]: {
                          shouldLockSubmitBtnWhenControlInvalid: true
                      }
                  }
              },
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
            shouldLockSubmitBtn = shouldLockSubmitBtnByControl(currentControlData, form)


        expect(shouldLockSubmitBtn).toBeTruthy()
    })

    test('shouldLockSubmitBtn === true, if control rules valid, but additional submit btn validator return true', () => {

        const validatorName = 'maxLength',
            currentControl:ControlProps = {
                type: 'text',
                value: 'ab',
                validateRules: {
                    [validatorName]: {
                        limit: 2,
                        message: 'longer than limit'
                    },
                },
                validatorsSetting: {
                    [validatorName]: {
                        shouldLockSubmitBtnWhenControlInvalid: true
                    }
                },
                additionalLockSubmitBtnValidator: (hooksData) => {
                    return {hasError: true}
                }
            },
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
            shouldLockSubmitBtn = shouldLockSubmitBtnByControl(currentControlData, form)

        expect(shouldLockSubmitBtn).toBeTruthy()
    })

    test('shouldLockSubmitBtn === true, if control rules lock submit btn, but additional submit btn validator return false', () => {

        const validatorName = 'maxLength',
            currentControl:ControlProps = {
                type: 'text',
                value: 'abc',
                validateRules: {
                    [validatorName]: {
                        limit: 2,
                        message: 'longer than limit'
                    },
                },
                validatorsSetting: {
                    [validatorName]: {
                        shouldLockSubmitBtnWhenControlInvalid: true
                    }
                },
                additionalLockSubmitBtnValidator: (hooksData) => {
                    return {hasError: false}
                }
            },
            {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
            currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
            shouldLockSubmitBtn = shouldLockSubmitBtnByControl(currentControlData, form)

        expect(shouldLockSubmitBtn).toBeTruthy()
    })

})