import {DEFAULT_FORM_SETTINGS} from "@containers/active-form/const";
import {FormConfigProps} from "./../types";


export function addFormConfigSettingsLayer(formConfig: FormConfigProps = {}):FormConfigProps {

    //Слои настройки формы (Из библиотеки + из global + из самой формы)
    let customFormConfigLayers: FormConfigProps = {
        ...DEFAULT_FORM_SETTINGS,
        ...formConfig,
    }


    return customFormConfigLayers

}