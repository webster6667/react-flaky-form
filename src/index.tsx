import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DEFAULT_FORM_SETTINGS, FORM_NAME } from '@const';
import { combineRulesLayers } from '@control-utils/adding-layers/combine-rules-layers';

import { initForm } from '@form-utils/init';

import { UseFlakyForm } from '@common-types';

const useFlakyForm: UseFlakyForm = (controls, customFormConfig = {}) => {
  const formState = {
      loaded: false,
      isSubmitBtnLocked: false,
      isFormTriedSubmit: false,
    },
    formValidatorsRules = combineRulesLayers(
      DEFAULT_FORM_SETTINGS.formValidatorsRules,
      customFormConfig.formValidatorsRules,
    ),
    [flukyForm, setForm] = useState({
      controls,
      formState,
      formSettings: {
        ...DEFAULT_FORM_SETTINGS,
        formName: FORM_NAME,
        ...customFormConfig,
        formValidatorsRules,
      },
    });

  useEffect(() => {
    (async function asyncFunction() {
      setForm(prevForm => {
        const form = {...prevForm};

        initForm(form, customFormConfig, setForm);

        return form;
      });
    })();
  }, []);

  return [flukyForm, setForm];
};

export { useFlakyForm };
