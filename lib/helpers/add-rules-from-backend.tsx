export function addRulesFromBackend(rules, formControls) {
    
    rules.forEach(inputsGroupToRules => {

        inputsGroupToRules.fields.forEach( (input) => {
            let controlForValidate = formControls[input],
                rulesForInputs = inputsGroupToRules.rule,
                hasRule = controlForValidate && rulesForInputs,
                optionsToSelect = inputsGroupToRules.options,
                hasOptionsToSelect = controlForValidate && optionsToSelect


            //Пункты для выбора
            if (hasOptionsToSelect) {
                formControls[input].options = optionsToSelect
            }

            //Правила
            if (hasRule) {
                Object.keys(rulesForInputs).forEach(ruleName => {
                    let rule = rulesForInputs[ruleName];
                    controlForValidate.validateRules = {...controlForValidate.validateRules, [ruleName]: rule}
                })


            }

        })
        
    })
    
}