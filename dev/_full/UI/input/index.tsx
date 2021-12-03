import React, {useEffect, useRef} from "react";

import {blockClassesConcat, bemClassName, elementClassesConcat} from 'bem-components-connector'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import {FlakyInputComponent} from "./types"

export const FlakyInput:FlakyInputComponent = ({
                          className = '',
                          elementsClassName = {
                              input: '',
                              label: '',
                              error: ''
                          },
                          labelProps = {},
                          errorProps = {},
                          inputProps = {},
                          style = {},
                          type = 'text',
                          havePasswordVisibleSwitch = false,
                          label = '',
                          error = '',
                          placeholder = null,
                          hasError = false,
                          inputName = null,
                          value = '',
                          setValue = () => {console.error('(Input-component) add handler to prop: setValue');},
                          controlIndex = null,
                          formIndex = null,
                          maskSetting = null,
                          togglePasswordVisibility = () => console.log('password visibility switch is empty')
                      }) => {

      let inputRef = useRef(null),

          block = bemClassName('entry-field'),
          blockClasses = blockClassesConcat(block(), {}, className),
          inputClasses = elementClassesConcat(block(), 'input', {}, ''),
          labelClasses = elementClassesConcat(block(), 'label', {}, ''),
          errorClasses = elementClassesConcat(block(), 'error', {}, ''),

          hasMask = maskSetting && maskSetting.eventWhenPlaceholderVisible !== 'write' && maskSetting.eventWhenPlaceholderVisible,
          passwordClasses = elementClassesConcat(block(), 'password-switch', {}, ''),
          wrapperClickHandler = (e) => {
          
              let target = e.target,
                  {element} = target.dataset || {},
                  $input = target.closest(`[data-element="input-wrapper"]`).querySelector('input')


              if (element === 'mask-input') {

              } else {
                  $input.focus()
              }

          },
          setCaretForMask = () => {
              let clearValue = maskSetting.clearValue,
                  clearValueLength = clearValue ? maskSetting.clearValue.length : 0,
                  symbolForSearch = clearValueLength > 0 ? clearValue[clearValueLength - 1] : maskSetting.eventWhenPlaceholderVisible,
                  caretIndex = clearValueLength > 0 ? +String(value).lastIndexOf(symbolForSearch) + 1 : +String(value).indexOf(symbolForSearch)

              if (~caretIndex) {
                  // setCaret(inputRef.current, caretIndex, caretIndex)
              }

          },
          clickHandler = (e) => {

              if (hasMask) {
                  setCaretForMask()
              }

          },
          writeInputChange = (e, value) => {
              setValue(value, controlIndex, formIndex, e.type)
          },
          hoverHandler = (e) => {

              if (hasMask && maskSetting.eventWhenPlaceholderVisible === "hover") {
                  setValue(value, controlIndex, formIndex, e.type)
              }

          },
          mouseLeaveHandler = (e) => {
              if (hasMask && maskSetting.eventWhenPlaceholderVisible === "hover") {
                  setValue(value, controlIndex, formIndex, e.type)
              }
          },
          focusHandler = (e) => {

              if (hasMask && maskSetting.eventWhenPlaceholderVisible !== "write") {
                  setValue(value, controlIndex, formIndex, e.type)
              }
          },
          blurHandler = (e) => {

              if (hasMask && maskSetting.eventWhenPlaceholderVisible !== "always" && maskSetting.eventWhenPlaceholderVisible !== "write") {
                  setValue(value, controlIndex, formIndex, e.type)
              }

          },
          isInputNotEmpty = Boolean(value),
          isPasswordVisible = havePasswordVisibleSwitch && type === 'text',
          errorAnimatePrefix = block('error', {animate: true}),
          concatInputName = `${inputName}${controlIndex !== null ? `[${controlIndex}]` : ''}`.trim()

    //Индекс для групповой формы
    if (formIndex !== null && concatInputName) {
        concatInputName = concatInputName.replace('[', `[${formIndex}][`)
    }

    useEffect(() => {

        if (hasMask) {
            // setCaretForMask()
        }

    }, [value])


    type = type === 'number' || type === 'date' ? 'phone' : type

    return (<div
        onClick={(e) => wrapperClickHandler(e)}
        className={blockClasses}
        data-element="input-wrapper"
        style={style}
    >

        <CSSTransition
            in={hasError}
            timeout={500}
            classNames={errorAnimatePrefix}
            mountOnEnter
            unmountOnExit
        >
            <p className={errorClasses}
               {...errorProps}
            >
                {error || ''}
            </p>
        </CSSTransition>

        <label className={labelClasses}
               {...labelProps}
        >
            {label}
        </label>

        <input
            data-is-not-empty={isInputNotEmpty}
            type={type}
            name={concatInputName}
            value={value || ''.trim()}
            className={inputClasses}
            onChange={(e) => writeInputChange(e, e.target.value)}
            onMouseOver={hoverHandler}
            onMouseLeave={mouseLeaveHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onClick={clickHandler}
            autoComplete="off"
            placeholder={placeholder}
            ref={inputRef}
            {...inputProps}
        />

        {havePasswordVisibleSwitch
            ?
            <div data-is-password-visible={isPasswordVisible}
                 onClick={() => togglePasswordVisibility(type)}
                 className={passwordClasses} >
            </div>
            : ''}
    </div>)
}