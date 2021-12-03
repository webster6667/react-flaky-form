import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DEFAULT_FORM_SETTINGS, FORM_NAME } from './const';
import { combineValidatorsSettingsLayers } from './utils/add-validators-settings-layers';

import { initForm } from './utils/form-actions/init';

import { UseFormValidator } from './types';

const useFormValidator: UseFormValidator = (controls, customFormConfig) => {
  const formState = {
      loaded: false,
      isSubmitBtnLocked: false,
      isFormTriedSubmit: false,
    },
    formValidatorsSetting = combineValidatorsSettingsLayers(
      DEFAULT_FORM_SETTINGS.formValidatorsSetting,
      customFormConfig.formValidatorsSetting,
    ),
    [flukyForm, setForm] = useState({
      controls,
      formState,
      formSettings: {
        ...DEFAULT_FORM_SETTINGS,
        formName: FORM_NAME,
        ...customFormConfig,
        formValidatorsSetting,
      },
    });

  useEffect(() => {
    (async function asyncFunction() {
      setForm(prevForm => {
        const form = JSON.parse(JSON.stringify(prevForm));

        initForm(form, customFormConfig, setForm);

        return form;
      });
    })();
  }, []);

  return [flukyForm, setForm];
};

export { useFormValidator };
