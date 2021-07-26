import {declOfNum} from '@helpers/text'
import {ReactText} from "react";

//Парсер ошибок
export const messageParser = (message: string = '', controlName: string | number = '', writeValue: string | number | any[] = '', limit: number | null = null):string => {
    let parseMessage = String(message),
        label = String(controlName)

    //Если есть что парсить
    if (parseMessage) {

        //Если есть цифры для склонения, склоняем
        if (limit) {

            parseMessage = parseMessage.replace(/\[([\s\S]+?)\]/g, str => {
                const arrayOfDeclinedWords = str.replace(/[\[\]]/g, '').split(','),
                      declinedWord = declOfNum(limit, wordsArray)

                return decOfNumResult
            })

            parseMessage = parseMessage.replace('{limit}', String(limit))

        }

        parseMessage = parseMessage.replace('{label}', label)

        parseMessage = parseMessage.replace('{writeValue}', Array.isArray(writeValue) ? '' : String(writeValue))



        return parseMessage
    }

    return ''
}