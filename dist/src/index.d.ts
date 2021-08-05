import { UseFlukyForm, FlukyFormComponent, AddFormExampleComponent, RemoveFormComponent, AddControlComponent, RemoveControlComponent } from "@common-types";
import './style.less';
/**
 * @description
 * Хук инициализации формы
 *
 * @param {ControlsProps | ControlsProps[]} controls - массив контролы формы
 * @param {FormConfigProps} customFormConfig - объект с настройками поведения формы, передаваемый с наружи(хуки, тип валидации и тд)
 * @returns {[FormProps, any]} контролы с нужными настройками, функцию для изменения состояния формы
 *
 */
declare const useFlukyForm: UseFlukyForm;
declare const FlukyForm: FlukyFormComponent;
declare const AddFormExample: AddFormExampleComponent;
declare const RemoveForm: RemoveFormComponent;
declare const AddControlExample: AddControlComponent;
declare const RemoveControl: RemoveControlComponent;
export { useFlukyForm, FlukyForm, AddFormExample, RemoveForm, AddControlExample, RemoveControl };
