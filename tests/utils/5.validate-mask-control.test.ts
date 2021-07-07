import {maskWriteValue} from '@validators/mask-validator'
import {unmask} from '@validators/helpers/unmask'

import {ControlProps, MaskSettingProps} from "@common-types";

describe('unmask function cleat text from mask and placeholder', () => {

    test('function return clear value, if text to clear has single-symbol and placeholder has null', () => {

        const maskPattern = '+7(999)-999-99-99',
              maskPlaceholder = null,
              textCoveredMask = '1',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '1'

        expect(unmaskText).toEqual(expectText);

    })

    test('function return clear value, if text to clear has single-symbol and placeholder not empty', () => {

        const maskPattern = '+7(999)-999-99-99',
              maskPlaceholder = '_',
              textCoveredMask = '1',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '1'

        expect(unmaskText).toEqual(expectText);

    })

    test('function return clear value, when clear text symbols include mask pattern elements', () => {

        const maskPattern = '+7(999)-999-99-99',
              maskPlaceholder = '_',
              textCoveredMask = '+7(977)-124-34-77',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '9771243477'

        
        expect(unmaskText).toEqual(expectText);

    })

    test('function return clear value, when clear text symbols include mask pattern elements and has similar symbols on pattern finish', () => {

        const maskPattern = '+7(999)-999-99-9977',
              maskPlaceholder = '_',
              textCoveredMask = '+7(977)-124-34-7777',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '9771243477'


        expect(unmaskText).toEqual(expectText);

    })

    test('function return clear value, when clear text has not full placeholder', () => {

        const maskPattern = '+7(999)-999-99-99',
              maskPlaceholder = null,
              textCoveredMask = '+7(98',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '98'


        expect(unmaskText).toEqual(expectText);
    })

    test('function return clear value, when clear text has not full placeholder, but has value maskPlaceholder', () => {

        const maskPattern = '+7(999)-999-99-99',
              maskPlaceholder = '_',
              textCoveredMask = '+7(98',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '98'


        expect(unmaskText).toEqual(expectText);
    })

    test('function return clear value, when clear text has not full placeholder and include mask pattern elements', () => {

        const maskPattern = '+7(999)-999-99-99',
              maskPlaceholder = null,
              textCoveredMask = '+7(797',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '797'


        expect(unmaskText).toEqual(expectText);
    })

    test('function return clear value, when clear text has not full placeholder, include mask pattern elements and has similar symbols on pattern finish', () => {

        const maskPattern = '+7(999)-999-99-9977',
              maskPlaceholder = null,
              textCoveredMask = '+7(797',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '797'

        expect(unmaskText).toEqual(expectText);
    })

    test('function return clear value, when clear text has not placeholder, full filled, include mask pattern elements and has similar symbols on pattern finish', () => {

        const maskPattern = '+7(999)-999-99-9977',
              maskPlaceholder = null,
              textCoveredMask = '+7(797)-111-32-99',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '7971113299'

        expect(unmaskText).toEqual(expectText);
    })

    test('function return clear value, when clear text has not placeholder, full filled with full mask, include mask pattern elements and has similar symbols on pattern finish', () => {

        const maskPattern = '+7(999)-999-99-9977',
              maskPlaceholder = null,
              textCoveredMask = '+7(797)-111-32-9977',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '7971113299'

        expect(unmaskText).toEqual(expectText);
    })

    test('function return clear value, when clear text has number and string', () => {

        const maskPattern = '+7(999)-999-99-AAAA',
              maskPlaceholder = '_',
              textCoveredMask = '+7(797)-111-32-abcd',
              unmaskText = unmask(maskPattern, textCoveredMask, maskPlaceholder),
              expectText = '79711132abcd'

        expect(unmaskText).toEqual(expectText);
    })

})


describe('cases with eventWhenPlaceholderVisible !== "write"', () => {

    test('function return masked value', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)-999-99-99',
                eventWhenPlaceholderVisible: "always"
            },
            controlProps: ControlProps = {
                type: 'text',
                maskSetting
            },
            writtenValue = '1',
            eventType = 'change',
            expectValue = '+7(1__)-___-__-__'

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.value).toEqual(expectValue)
    })

    test('function return empty value, if masked event is "blur || mouseleave" and written value === empty mask with placeholder(+7(___)___-__-__)', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)999-99-99',
                eventWhenPlaceholderVisible: "hover"
            },
            controlProps: ControlProps = {
                type: 'text',
                maskSetting
            },
            writtenValue = '+7(___)___-__-__',
            eventType = 'blur',
            expectValue = ''

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.value).toEqual(expectValue)
    })

    test('controller.hasError === true, if writtenValue has placeholder symbol', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)999-99-99',
                eventWhenPlaceholderVisible: "hover"
            },
            controlProps: ControlProps = {
                type: 'text',
                maskSetting
            },
            writtenValue = '+7(432)123-123-__',
            eventType = 'change'

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.hasError).toBeTruthy()
    })

    test('controller.hasError === false, if writtenValue has not placeholder symbol', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)999-99-99',
                eventWhenPlaceholderVisible: "hover"
            },
            controlProps: ControlProps = {
                type: 'text',
                maskSetting
            },
            writtenValue = '+7(432)123-123-11',
            eventType = 'change'

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.hasError).toBeFalsy()
    })

})

describe('cases with eventWhenPlaceholderVisible === "write"', () => {

    test('function return not full masked value', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)999-99-99',
                eventWhenPlaceholderVisible: "write"
              },
              controlProps: ControlProps = {
                  type: 'text',
                  maskSetting
              },
              writtenValue = '1',
              eventType = 'change',
              expectValue = '+7(1'

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.value).toEqual(expectValue)
    })

    test('controller.hasError === true if writtenValue.length !== maskPattern.length', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)999-99-99',
                eventWhenPlaceholderVisible: "write"
            },
            controlProps: ControlProps = {
                type: 'text',
                maskSetting
            },
            writtenValue = '1',
            eventType = 'change'

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.hasError).toBeTruthy()
    })

    test('controller.hasError === false if writtenValue.length === maskPattern.length', () => {

        const maskSetting: MaskSettingProps = {
                maskPattern: '+7(999)999-99-99',
                eventWhenPlaceholderVisible: "write"
            },
            controlProps: ControlProps = {
                type: 'text',
                maskSetting
            },
            writtenValue = '+7(123)432-44-55',
            eventType = 'change'

        maskWriteValue(maskSetting, controlProps, writtenValue, eventType)

        expect(controlProps.hasError).toBeFalsy()
    })

})