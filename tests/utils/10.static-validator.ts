import {
    ControlProps, CurrentControlData,
    FormParamsProps,
    FormProps, HookProps, ValidatorErrorProps,
    ValidatorsRulesList,
    ValidatorsSettingListInsideHandler
} from "@src/types";
import {DEFAULT_FORM_SETTINGS} from "@const";
import {validateWrittenData} from "@validators/written-live-validator";

import {getHookData} from '@mock-functions/get-hook-data'
import {getInitFormDataSingleControl} from '@mock-functions/get-initialized-full-form'

import {defaultStaticValidator} from '@validators/static-validator'



describe('written validator return right error data', () => {

    // const getHookData = (newValue: string | number, validatorName = 'empty', validatorRules = {}, validatorSettings = {}) => {
    //
    //         const validateRules: ValidatorsRulesList = {
    //                 [validatorName]: validatorRules
    //             },
    //             validatorsSetting: ValidatorsSettingListInsideHandler = {
    //                 ...DEFAULT_FORM_SETTINGS.formValidatorsSetting as ValidatorsSettingListInsideHandler,
    //                 [validatorName]: validatorSettings
    //             },
    //             currentControl: ControlProps = {
    //                 type: 'text',
    //                 validateRules,
    //                 validatorsSetting
    //             },
    //             controlName = 'mycontrol',
    //             formParams: FormParamsProps = {
    //                 loaded: true,
    //                 isFormTriedSubmit: false
    //             },
    //             form: FormProps = {
    //                 controls: {
    //                     [controlName]: currentControl
    //                 },
    //                 formParams
    //             },
    //             hookData: HookProps = {
    //                 currentControl,
    //                 controlName,
    //                 newValue,
    //                 form,
    //                 controlIndex: null,
    //                 formIndex: null,
    //                 selectedValue: null
    //             }
    //
    //         return hookData
    //     },
    //     defaultErrorData: ValidatorErrorProps = {
    //         hasError: false,
    //         shouldLockNotValidWrite: false,
    //         message: null,
    //         limit: null,
    //         showLiveErrorAfterFirstSubmit: false,
    //         hideErrorTimeout: null,
    //         showErrorTimeout: null
    //     }

    test('if control has not rules, validator return errorData.hasError === false', () => {

        const currentControl:ControlProps = {
                type: 'text',
                label: 'контрол'
              },
              {controlName, initFormData: form} = getInitFormDataSingleControl(currentControl),
              currentControlData:CurrentControlData = {currentControl, controlName, formName: form.formSettings.formName, controlIndex: null, formIndex: null},
              hookData = getHookData({...currentControlData, form})
        // const newValue = 'abc',
        //     hookData = getHookData(newValue),
        //     {errorData} = defaultStaticValidator(hookData),
        //     expectedResult: ValidatorErrorProps = {
        //         ...defaultErrorData,
        //         hasError: false
        //     }

        // expect(errorData).toEqual(expectedResult)

    });

});