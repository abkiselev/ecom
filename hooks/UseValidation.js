import { useEffect, useState } from 'react';

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
            default:
                setIsValuesValid({...isValuesValid, [e.target.name]: e.target.validity.valid})
                break;
        }
        
        // setErrors({...errors, [e.target.name]: e.target.validationMessage})
        // setIsValuesValid({...isValuesValid, [e.target.name]: e.target.validity.valid})
        
    }

    function setInitialValues(initialInputs) {
        setValues(initialInputs)
        Object.keys(initialInputs).forEach((key) => {
            setErrors( { ...initialInputs, [key]: '' } );
            setIsValuesValid( { ...initialInputs, [key]: initialInputs[key] !== '' } );
        })
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
        if(!String(inputText)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setErrors({...errors, email: 'Пока это не похоже на e-mail...'})
                setIsValuesValid({...isValuesValid, email: false})
            } else {
                setErrors({...errors, email: ''})
                setIsValuesValid({...isValuesValid, email: true})
            }
    }

    function validatePass(inputText){
        if(!String(inputText)
            .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/)) {
                setErrors({...errors, password: 'Минимум 5 символов. Из них одна большая буква и 1 цифра'})
                setIsValuesValid({...isValuesValid, password: false})
            } else {
                setErrors({...errors, password: ''})
                setIsValuesValid({...isValuesValid, password: true})
            }
    }

    function validatePassRepeat(inputText){
        if(inputText !== values.password) {
                setErrors({...errors, passwordRepeat: 'Пока пароли не совпадают...'})
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
        if((inputText.length < 5) && (!inputText.match(/^\d{6,}/)) ) {
            setErrors({...errors, address: 'Начните с индекса, он состоит из 6 цифр'})
            setIsValuesValid({...isValuesValid, address: false})
        } else if((inputText.length < 33) && (inputText.match(/^\d{6,}/)) ){
            setErrors({...errors, address: 'Указывайте полный адрес, чтобы доставка не потерялась'})
            setIsValuesValid({...isValuesValid, address: false})
        } else if((inputText.length < 34) && (inputText.match(/^\d{6,}/)) ){
            setErrors({...errors, address: ''})
            setIsValuesValid({...isValuesValid, address: true})
        }
    }

    // console.log(values)

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
