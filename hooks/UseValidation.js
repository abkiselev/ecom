import { useEffect, useState } from 'react';
import { namesRegexp, telRegexp, addressRegexp, passwordRegexp, emailRegexp } from '../utils/regexp';

function UseValidation() {
    const [values, setValues] = useState({});
    const [isValuesValid, setIsValuesValid] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    function handleValues(e) {
        setValues({...values, [e.target.name]: e.target.value})

        switch (e.target.name) {
            case 'email':
                validateEmail(e.target.value)
                break;
            case 'password':
                validatePass(e.target.value)
                break;
            case 'passwordRepeat':
                validatePassRepeat(e.target.value)
                break;
            case 'loginPass':
                validateLoginPass(e.target.value)
                break;
            case 'address':
                validateAddress(e.target.value)
                break;      
            case 'tel':
                validateTel(e.target.value)
                break;      
            case 'firstName':
                validateNames(e.target.name, e.target.value)
                break;      
            case 'secondName':
                validateNames(e.target.name, e.target.value)
                break;      
            case 'surName':
                validateNames(e.target.name, e.target.value)
                break;      
            default:
                setErrors({...errors, [e.target.name]: e.target.validationMessage})
                setIsValuesValid({...isValuesValid, [e.target.name]: e.target.validity.valid})
                break;
        }
        
    }

    function setInitialValues(initialInputs) {
        setValues(initialInputs)

        const errs = {}
        const valids = {}

        Object.entries(initialInputs).forEach(([key, value]) => {
            errs[key] = '';
            valids[key] = initialInputs[key].length > 0;
        })

        setErrors(errs);
        setIsValuesValid(valids);
    }
    
    useEffect(() => {
        if((Object.values(isValuesValid).every(i => i === true) && Object.values(isValuesValid).length !== 0)){
            setIsFormValid(true)
        }
        else {
            setIsFormValid(false)
        }
    },  [isValuesValid])

    function validateEmail(inputText){
        if(!String(inputText).toLowerCase().match(emailRegexp)) {
                setErrors({...errors, email: '???????? ?????? ???? ???????????? ???? e-mail...'})
                setIsValuesValid({...isValuesValid, email: false})
            } else {
                setErrors({...errors, email: ''})
                setIsValuesValid({...isValuesValid, email: true})
            }
    }

    function validatePass(inputText){
        if(!String(inputText).match(passwordRegexp)) {
                setErrors({...errors, password: '?????????????? 5 ????????????????. ???? ?????? ???????? ?????????????? ?????????? ?? 1 ??????????'})
                setIsValuesValid({...isValuesValid, password: false})
            } else {
                setErrors({...errors, password: ''})
                setIsValuesValid({...isValuesValid, password: true})
            }
    }

    function validatePassRepeat(inputText){
        if(inputText !== values.password) {
                setErrors({...errors, passwordRepeat: '???????? ???????????? ???? ??????????????????...'})
                setIsValuesValid({...isValuesValid, passwordRepeat: false})
            } else {
                setErrors({...errors, passwordRepeat: ''})
                setIsValuesValid({...isValuesValid, passwordRepeat: true})
            }
    }

    function validateLoginPass(inputText){
        if(inputText.length > 0) {
                setIsValuesValid({...isValuesValid, loginPass: true})
            } else setIsValuesValid({...isValuesValid, loginPass: false})
    }

    function validateAddress(inputText){
        if((inputText.length < 5) && (!inputText.match(addressRegexp)) ) {
            setErrors({...errors, address: '?????????????? ?? ??????????????, ???? ?????????????? ???? 6 ????????'})
            setIsValuesValid({...isValuesValid, address: false})
        } else if((inputText.length < 33) && (inputText.match(addressRegexp)) ){
            setErrors({...errors, address: '???????????????????? ???????????? ??????????, ?????????? ???????????????? ???? ????????????????????'})
            setIsValuesValid({...isValuesValid, address: false})
        } else if((inputText.length < 34) && (inputText.match(addressRegexp)) ){
            setErrors({...errors, address: ''})
            setIsValuesValid({...isValuesValid, address: true})
        }
    }

    function validateTel(inputText){
        if(!inputText.match(telRegexp)) {
                setErrors({...errors, tel: '???????? ?????? ???? ???????????? ???? ??????????????...'})
                setIsValuesValid({...isValuesValid, tel: false})
            } else {
                setErrors({...errors, tel: ''})
                setIsValuesValid({...isValuesValid, tel: true})
            }
    }

    function validateNames(inputName, inputText){
        if(!inputText.match(namesRegexp)) {
                setErrors({...errors, [inputName]: '?????????????? 2 ?????????????? ???? ?????????????? ??????????'})
                setIsValuesValid({...isValuesValid, [inputName]: false})
            } else {
                setErrors({...errors, [inputName]: ''})
                setIsValuesValid({...isValuesValid, [inputName]: true})
            }
    }


    return ({
        isFormValid,
        values,
        handleValues, 
        isValuesValid,
        errors,
        setInitialValues,
        setIsFormValid,
        setErrors,
        setValues

    });
}

export default UseValidation;
