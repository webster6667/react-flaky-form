import { FormConfigProps } from '@common-types';

//Дефолтное имя формы
export const FORM_NAME = 'form';

//Слои настроек формы (из библиотеки + из global проекта)
export const DEFAULT_FORM_SETTINGS: FormConfigProps = {
  formName: FORM_NAME,
  formValidatorsRules: {
    minLength: {
      limit: 0,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
    maxLength: {
      limit: 100,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: true,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
    minValue: {
      limit: 0,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
    maxValue: {
      limit: 1000,
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
    required: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
    number: {
      liveEnable: true,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: true,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
    email: {
      liveEnable: false,
      showLiveErrorAfterFirstSubmit: false,
      shouldLockNotValidWrite: false,
      showErrorTimeout: 0,
      hideErrorTimeout: null,
    },
  },
};
