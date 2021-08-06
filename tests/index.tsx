import {useFlukyForm} from './../src/index'

export const SingleForm = () => {

    let [myForm, setMyForm] = useFlukyForm({
            username: {
                type: 'text',
                validatorsSetting: {
                    maxLength: {liveEnable: true}
                }
            }
        },
        {
            action: '/api/multi-form',
            formName: 'SingleForm'
        })

    // myForm.controls.map((item) => item.username.type)
    // myForm.controls.username.type

    return <>

    </>


}