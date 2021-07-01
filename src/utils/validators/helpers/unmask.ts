//Снять маску
export function unmask(pattern: string, placeholder, textAfterMask: string | number) {
    let patternElements = pattern.replace(/[9|A]/ig, '').split(''),
        valueToClear = String(textAfterMask)

    if (placeholder) {
        patternElements.push(placeholder)
    }

    patternElements.forEach((item) => {
        valueToClear = valueToClear.replace(new RegExp(`[${item}]`, 'g'), '')
    })

    return valueToClear
}