import {addValidatorsSettingsLayer, addValidatorsSettingsLayerToSingleControl, combineValidatorsSettingsLayers} from '@add-control-props-layers/add-validators-settings-layers'
import {ControlProps, FormParamsProps, ValidatorsSettingList, FormConfigProps, FormProps} from "@common-types";

import {getInitFormDataSingleControl} from '@mock-functions/get-initialized-full-form'

import {DEFAULT_FORM_SETTINGS, FORM_NAME} from "@const";


describe('function add new validator settings layer to selected control', () => {

    test('function add new validator settings layer params to selected control', () => {

        const control: ControlProps = {
                  type: 'text',
                  validatorsSetting: {
                      maxLength: {
                          liveEnable: true,
                          showErrorTimeout: 100,
                          showLiveErrorAfterFirstSubmit: false,
                          hideErrorTimeout: null,
                          shouldLockNotValidWrite: true
                      }
                  }
              },
              expectedControlState = {
                  type: 'text',
                  validatorsSetting: {
                      maxLength: {
                          liveEnable: true,
                          showErrorTimeout: 200,
                          showLiveErrorAfterFirstSubmit: false,
                          hideErrorTimeout: null,
                          shouldLockNotValidWrite: true
                      }
                  }
              },
              newValidatorsSettingsLayer: ValidatorsSettingList = {
                  maxLength: {
                      showErrorTimeout: 200
                  }
              }

        addValidatorsSettingsLayer(control, newValidatorsSettingsLayer)

        expect(control).toEqual(expectedControlState)
    })

    test('function only enable liveEnable prop on selected control, if in validator value put true', () => {

        const control: ControlProps = {
                type: 'text',
                validatorsSetting: {
                    maxLength: {
                        liveEnable: false,
                        showErrorTimeout: 100,
                        showLiveErrorAfterFirstSubmit: false,
                        hideErrorTimeout: null,
                        shouldLockNotValidWrite: true
                    }
                }
            },
            expectedControlState = {
                type: 'text',
                validatorsSetting: {
                    maxLength: {
                        liveEnable: true,
                        showErrorTimeout: 100,
                        showLiveErrorAfterFirstSubmit: false,
                        hideErrorTimeout: null,
                        shouldLockNotValidWrite: true
                    }
                }
            },
            newValidatorsSettingsLayer: ValidatorsSettingList = {
                maxLength: true
            }

        addValidatorsSettingsLayer(control, newValidatorsSettingsLayer)

        expect(control).toEqual(expectedControlState)
    })

})

test('function return combine validators layer, and not change original objects', () => {

    let validatorsSettings = {...DEFAULT_FORM_SETTINGS.formValidatorsSetting},
        customFormConfig = {
            minLength: {
                showErrorTimeout: 500
            }
        },
        expectedValidatorSettingsLayer = {
            ...validatorsSettings,
            minLength: {
                //@ts-ignore
                ...validatorsSettings.minLength,
                showErrorTimeout: 500
            }
        }


    const combinedValidatorSettingsLayer = combineValidatorsSettingsLayers(validatorsSettings, customFormConfig)

    expect(validatorsSettings).not.toEqual(expectedValidatorSettingsLayer)
    expect(combinedValidatorSettingsLayer).toEqual(expectedValidatorSettingsLayer)
})

describe('function add all validator settings layers to selected control', () => {

    test('function added first default settings layer', () => {

        const control: ControlProps = {
                type: 'text'
              },
              {initFormData: form} = getInitFormDataSingleControl(control),
              expectedControlState: ControlProps = {
                  ...control,
                  validatorsSetting: {
                      ...DEFAULT_FORM_SETTINGS.formValidatorsSetting
                  }
              }

        addValidatorsSettingsLayerToSingleControl(control, form)

        
        expect(control).toEqual(expectedControlState)
    })

    test('function added second current form settings layer', () => {
        
        const control: ControlProps = {
                type: 'text'
            },
            controlName = 'username',
            controls = {
                [controlName]: control
            },
            formParams: FormParamsProps = {
                loaded: false,
                isFormTriedSubmit: false,
                isSubmitBtnLocked: false,
                errorList: [],
                commonError: ''
            },
            customFormConfig: FormConfigProps = {
                formValidatorsSetting: {
                    minLength: {
                        showErrorTimeout: 500
                    }
                }
            },
            formValidatorsSetting = combineValidatorsSettingsLayers(DEFAULT_FORM_SETTINGS.formValidatorsSetting, customFormConfig.formValidatorsSetting),
            form: FormProps = {
                controls,
                formParams,
                formSettings: {
                    ...DEFAULT_FORM_SETTINGS,
                    formName: FORM_NAME,
                    ...customFormConfig,
                    formValidatorsSetting
                },
                controlsExample: {}
            },
            expectedControlState: ControlProps = {
                ...control,
                validatorsSetting: {
                    ...DEFAULT_FORM_SETTINGS.formValidatorsSetting,
                    minLength: {
                        //@ts-ignore
                        ...DEFAULT_FORM_SETTINGS.formValidatorsSetting.minLength,
                        showErrorTimeout: 500
                    }
                }
            }

        addValidatorsSettingsLayerToSingleControl(control, form)

        expect(control).toEqual(expectedControlState)
    })

    test('function added third current control settings layer', () => {

        const control: ControlProps = {
                type: 'text',
                validatorsSetting: {
                    minLength: {
                        showErrorTimeout: 200
                    }
                }
            },
            controlName = 'username',
            controls = {
                [controlName]: control
            },
            formParams: FormParamsProps = {
                loaded: false,
                isFormTriedSubmit: false,
                isSubmitBtnLocked: false,
                errorList: [],
                commonError: ''
            },
            customFormConfig: FormConfigProps = {
                formValidatorsSetting: {
                    minLength: {
                        showErrorTimeout: 100
                    }
                }
            },
            formValidatorsSetting = combineValidatorsSettingsLayers(DEFAULT_FORM_SETTINGS.formValidatorsSetting, customFormConfig.formValidatorsSetting),
            form: FormProps = {
                controls,
                formParams,
                formSettings: {
                    ...DEFAULT_FORM_SETTINGS,
                    formName: FORM_NAME,
                    ...customFormConfig,
                    formValidatorsSetting
                },
                controlsExample: {}
            },
            expectedControlState: ControlProps = {
                ...control,
                validatorsSetting: {
                    ...formValidatorsSetting,
                    minLength: {
                        //@ts-ignore
                        ...formValidatorsSetting.minLength,
                        showErrorTimeout: 200,
                    }
                }
            }

        addValidatorsSettingsLayerToSingleControl(control, form)

        expect(control).toEqual(expectedControlState)
    })
    
})

