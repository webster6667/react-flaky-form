import React, {useEffect, useRef, useState} from "react";

import {blockClassesConcat, bemClassName, elementClassesConcat} from 'bem-components-connector'

import {setFormElementCaretPosition} from 'caret-positions'

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

      let inputRef = useRef<HTMLInputElement>(null),
          [wasBackspaceClick, setWasBackspaceClick] = useState(false),
          {current:$input} = inputRef,

          block = bemClassName('entry-field'),
          blockClasses = blockClassesConcat(block(), {}, className),
          inputClasses = elementClassesConcat(block(), 'input', {}, ''),
          labelClasses = elementClassesConcat(block(), 'label', {}, ''),
          errorClasses = elementClassesConcat(block(), 'error', {}, ''),
          errorAnimatePrefix = block('error', {animate: true}),


          {eventWhenPlaceholderVisible = null, maskPlaceholder, _maskWithPlaceholder} = maskSetting || {},
          hasMaskWithPlaceholder = eventWhenPlaceholderVisible && eventWhenPlaceholderVisible !== 'write',
          hasHoverMask = eventWhenPlaceholderVisible === 'hover',
          hasMaskWithBlur = eventWhenPlaceholderVisible === 'hover' || eventWhenPlaceholderVisible === 'focus',
          passwordClasses = elementClassesConcat(block(), 'password-switch', {}, ''),
          setCaretForMask = () => {


              if (maskPlaceholder) {
                  const caretIndex = String(value).indexOf(maskPlaceholder),
                        caretIndexForBackspace = String(_maskWithPlaceholder).lastIndexOf(maskPlaceholder, caretIndex),
                        shouldPutCaretForBackspace = caretIndexForBackspace === -1 && wasBackspaceClick && _maskWithPlaceholder[caretIndexForBackspace - 2] === maskPlaceholder,
                        shouldPutCaretForWrite = caretIndex != -1




                  if (shouldPutCaretForBackspace) {
                      setFormElementCaretPosition($input, caretIndexForBackspace - 3)
                  } else if (shouldPutCaretForWrite) {
                    setFormElementCaretPosition($input, caretIndex)
                  }

              }

          },
          wrapperClickHandler = (e) => {
              if ($input) $input.focus()
          },
          clickHandler = (e) => {
              if (hasMaskWithPlaceholder) setCaretForMask()
          },
          keyDownHandler = (e) => setWasBackspaceClick(() => e.key === 'Backspace'),
          inputChangeHandler = (e) => {
              const writeValue = $input.value

              setValue(writeValue, controlIndex, formIndex, e.type)
              setCaretForMask()
          },
          hoverHandler = (e) => {
              if (hasHoverMask) setValue(value, controlIndex, formIndex, e.type)
          },
          mouseLeaveHandler = (e) => {
              if (hasHoverMask) setValue(value, controlIndex, formIndex, e.type)
          },
          focusHandler = (e) => {

              if (hasMaskWithPlaceholder) {
                  setValue(value, controlIndex, formIndex, e.type)
                  setCaretForMask()
              }

          },
          blurHandler = (e) => {
              if (hasMaskWithBlur) setValue(value, controlIndex, formIndex, e.type)
          },
          isInputNotEmpty = Boolean(value),
          isPasswordVisible = havePasswordVisibleSwitch && type === 'text',
          concatInputName = `${inputName}${controlIndex !== null ? `[${controlIndex}]` : ''}`.trim()

    //Индекс для групповой формы
    if (formIndex !== null && concatInputName) {
        concatInputName = concatInputName.replace('[', `[${formIndex}][`)
    }

    useEffect(() => {

        if (hasMaskWithPlaceholder) setCaretForMask()

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
            onChange={inputChangeHandler}
            onKeyDown={keyDownHandler}
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