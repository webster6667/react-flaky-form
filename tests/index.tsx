import {useFlukyForm} from './../src/index'

export const SingleForm = () => {

    let [myForm, setMyForm] = useFlukyForm({
            username: {
                type: 'text'
            }
        },
        {
            lockSubmitBtnEvent: false,
            action: '/api/multi-form',
            formName: 'SingleForm'
        })

    // myForm.controls.map((item) => item.username.type)
    // myForm.controls.username.type

    return <>

    </>


}