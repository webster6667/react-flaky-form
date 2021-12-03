import messageLayoutsReplacer from "message-layouts-replacer";

import {ReplaceLayoutSymbols} from "./types"

export const replaceLayoutSymbols:ReplaceLayoutSymbols = (message, {limit, controlLabel, writeToControlValue}) => messageLayoutsReplacer(message, [
    {
        searchLayout: '{limit}',
        valueToReplace: limit
    },
    {
        searchLayout: 'limitForDecline',
        valueToReplace: limit
    },
    {
        searchLayout: '{label}',
        valueToReplace: controlLabel
    },
    {
        searchLayout: '{writeValue}',
        valueToReplace: writeToControlValue
    }
])