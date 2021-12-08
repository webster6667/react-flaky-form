import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DEFAULT_FORM_SETTINGS, FORM_NAME } from '@const';
import { combineRulesLayers } from '@control-utils/adding-layers/combine-rules-layers';

import { initForm } from '@form-utils/init';
import { submitFlakyFormHandler } from '@form-utils/submit';


import {FlakyFormI, UseFlakyForm} from '@common-types';

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

const FlakyForm:FlakyFormI = ({
                                        children,
                                        className = 'form',
                                        id = null,
                                        action = null,
                                        formState,
                                        setForm
                                      }) => {

  const {loaded} = formState.formState,
      {formName: currentFormName} = formState.formSettings,
      submitHandler = (e) => {
        e.preventDefault()
        submitFlakyFormHandler(setForm)
      }

  return (<form
      id={id || String(currentFormName)}
      className={className}
      onSubmit={submitHandler}
  >
    {children}
      <input data-element={'hidden-submit-trigger'}
             type={'submit'}
             style={{opacity: 0, width: 0, height: 0, position: 'absolute', zIndex: -1}}
      />
  </form>)
}

export { useFlakyForm, FlakyForm };
