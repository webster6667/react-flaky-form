import axios, { AxiosResponse } from 'axios';

import { controlsCycle } from './../../control-utils/controls-cycle';
import { addControlSetting } from '@utils/add-control-setting';
import { controlsHandlerBeforeSubmit } from '@control-handlers/before-submit-handler';
import { shouldLockSubmitBtnByForm } from '@control-handlers/submit-btn-lock-handler';

import {
  FormConfigProps,
  FormParamsProps,
  FormProps,
  SetFormProps,
} from '@common-types';

import { SubmitFormHandler } from './types';

/**
 * @description
 * Функция обрабатывающая отправку формы на сервер
 *
 * @param {SetFormProps} setForm - Функция обрабрабатывающая глобальный объект формы
 */
export const submitFormHandler: SubmitFormHandler = setForm => {
  setForm(form => {
    form.formParams.errorList = [];
    form.formParams.isFormTriedSubmit = true;

    /**
     * Про валидироват все контролы перед отправкой
     */
    let isAllControlsValid = formCycle(form, controlsHandlerBeforeSubmit);

    if (isAllControlsValid) {
      const {
          action = null,
          afterSuccessSubmit = null,
          afterErrorSubmit = null,
          afterSubmit = null,
        } = form.formSettings,
        initAction = action
          ? typeof action === 'object' && action.toSubmit
            ? action.toSubmit
            : String(action)
          : null;

      if (initAction) {
        axios
          .post(initAction)
          .then(data => {
            const { status } = data;

            /**
             * Хук успешной отправки
             */
            if (status === 200 && typeof afterSuccessSubmit === 'function') {
              afterSuccessSubmit(data);
            }

            /**
             * Хук не успешной отправки
             */
            if (status === 500 && typeof afterErrorSubmit === 'function') {
              afterErrorSubmit(data);
            }

            /**
             * Хук после любой отправки
             */
            if (typeof afterSubmit === 'function') {
              afterSubmit(data);
            }
          })
          .catch(data => {
            const { status } = data;

            /**
             * Хук не успешной отправки
             */
            if (status === 500 && typeof afterErrorSubmit === 'function') {
              afterErrorSubmit(data);
            }

            /**
             * Хук после любой отправки
             */
            if (typeof afterSubmit === 'function') {
              afterSubmit(data);
            }
          });
      }
    }
  });
};
