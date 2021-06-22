// import {ControlsProps, FormValuesProps} from "./../types";
// import {AxiosResponse} from "axios";
//
// export function initActiveValues(apiResponse: AxiosResponse, formControls: ControlsProps) {
//
//   const {data = {}} = apiResponse
//
//   //Если есть переменная с инит данными
//   if (data.formValues) {
//       const formValues:FormValuesProps = data.formValues
//
//     console.log(formValues);
//
//   }

  // if (fields) {
  //
  //   console.log(fields);
  //
  //   Object.keys(fields).forEach(fieldName => {
  //     const isFieldsExistInFormControl = formControls[fieldName],
  //           writeInputTypes = ['text', 'password', 'number', 'phone'],
  //           clickedInputTypes = ['radio', 'checkbox', 'checkboxList', 'drop-down']
  //
  //
  //     //Если переданое поле есть в контролах
  //     if (isFieldsExistInFormControl) {
  //
  //       let control = formControls[fieldName],
  //           {type = null, isGroup} = control,
  //           fieldValue: string | number | [] = fields[fieldName],
  //           isWriteInput: boolean = writeInputTypes.includes(type),
  //           isFieldValueArray: boolean = Array.isArray(fieldValue)
  //
  //
  //
  //
  //
  //       //Текстовый инпут
  //       // if (isWriteInput) {
  //       //
  //       //   if (isGroup) {
  //       //
  //       //     if (isFieldValueArray) {
  //       //
  //       //       control = fieldValue.map((value, index) => {
  //       //         return {...control, value, inputName: fieldName}
  //       //       })
  //       //
  //       //     } else {
  //       //       control = [{...control, value: fieldValue, inputName: fieldName}]
  //       //     }
  //       //
  //       //   } else {
  //       //
  //       //     if (isFieldValueArray) {
  //       //
  //       //       control = fieldValue.map((value, index) => {
  //       //         return {...control, value, inputName: fieldName}
  //       //       })
  //       //
  //       //     } else {
  //       //
  //       //       //Название инпута
  //       //       control.inputName = fieldName
  //       //       control.value = fieldValue
  //       //     }
  //       //
  //       //   }
  //       //
  //       // }
  //
  //
  //
  //
  //       //Остальные инпуты
  //       // else if(isClickedInput) {
  //       //
  //       //   let isCheckbox = controlType === 'checkbox',
  //       //       checkedValue = control.activeValue || '',
  //       //       isChecked = checkedValue == activeAttributeValue
  //       //
  //       //   if (isCheckbox) {
  //       //     isChecked ? control.checked = true : ''
  //       //   } else {
  //       //     control.activeValue = activeAttributeValue || ''
  //       //     // console.log(JSON.parse(JSON.stringify(activeAttributeValue)))
  //       //   }
  //       //
  //       // }
  //
  //     }
  //
  //
  //   });
  //
  //
  // }
  

// }
