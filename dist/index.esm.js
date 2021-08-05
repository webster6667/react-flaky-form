import '@babel/runtime/helpers/typeof';
import '@babel/runtime/helpers/asyncToGenerator';
import '@babel/runtime/helpers/defineProperty';
import '@babel/runtime/helpers/slicedToArray';
import '@babel/runtime/regenerator';
import React from 'react';
import 'axios';
import 'use-immer';
import '@const';
import '@add-control-props-layers/add-validators-settings-layers';
import { submitFlukyFormHandler } from '@utils/form-actions';
import '@utils/dynamic-form-actions';

var FlukyForm = function FlukyForm(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? 'form' : _ref$className;
      _ref.id;
      _ref.action;
      var formState = _ref.formState,
      setForm = _ref.setForm;

  formState.formParams.loaded;
      var currentFormName = formState.formSettings.formName,
      submitHandler = function submitHandler(e) {
    e.preventDefault();
    submitFlukyFormHandler(setForm);
  };

  return /*#__PURE__*/React.createElement("form", {
    id: String(currentFormName),
    className: className,
    onSubmit: submitHandler
  }, children, /*#__PURE__*/React.createElement("input", {
    "data-element": 'hidden-submit-trigger',
    type: 'submit',
    style: {
      opacity: 0,
      width: 0,
      height: 0,
      position: 'absolute',
      zIndex: -1
    }
  }));
};

export default FlukyForm;
