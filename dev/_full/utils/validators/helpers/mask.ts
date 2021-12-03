export const mask = (value, opts) => {
    var DIGIT = "9",
        ALPHA = "A",
        ALPHANUM = "S",
        addPlaceholdersToOutput = function(output, index, placeholder) {
            for (; index < output.length; index++) {
                if(output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
                    output[index] = placeholder;
                }
            }
            return output;
        }


    var pattern = (typeof opts === 'object' ? opts.pattern : opts),
        patternChars = pattern.replace(/\W/g, ''),
        output = pattern.split(""),
        values = value.toString().replace(/\W/g, ""),
        charsValues = values.replace(/\W/g, ''),
        index = 0,
        i,
        outputLength = output.length,
        placeholder = (typeof opts === 'object' ? opts.placeholder : undefined)
    ;

    for (i = 0; i < outputLength; i++) {
        // Reached the end of input
        if (index >= values.length) {
            if (patternChars.length == charsValues.length) {
                return output.join("");
            }
            else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
                return addPlaceholdersToOutput(output, i, placeholder).join("");
            }
            else {
                break;
            }
        }
        // Remaining chars in input
        else{
            if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
                (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
                (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
                output[i] = values[index++];
            } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
                if(placeholder !== undefined){
                    return addPlaceholdersToOutput(output, i, placeholder).join("");
                }
                else{
                    return output.slice(0, i).join("");
                }
            }
        }
    }
    return output.join("").substr(0, i);
};