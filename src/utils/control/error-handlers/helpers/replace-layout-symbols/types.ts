type LayoutSymbolsValues = {
    limit: number,
    controlLabel: string,
    writeToControlValue: string | number | any[]
}

export type ReplaceLayoutSymbols = (message: string, layoutSymbolsValues: LayoutSymbolsValues) => string
