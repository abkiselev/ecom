import styles from '../styles/Login.module.css';
import Form from './Form';
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import UseValidation from '../hooks/UseValidation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


function Login() {
  const router = useRouter();
  const { isFormValid, values, isValuesValid, handleValues, errors, setInitialValues } = UseValidation();
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');


  useEffect(() => {
    setInitialValues({ email: '', loginPass: '' })
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsloading(true)
    
    const { email, loginPass } = values;

    const configData = {
      headers: { 'content-type': 'application/json' }
    };
    
    try {
      await axios.post('/api/routes/users/login', { email, password: loginPass }, configData);
      router.push("/lk")
    } catch (error) {
      setIsError(true)
      setErrorText(error.response.data.message)
      setIsloading(false)
    }
  }
  
  return (
    <section className={styles.login}>

      <div className={styles.login_container}>

        <h1>ВОЙТИ</h1>

        {isError && <p className={styles.servererror}>{errorText || 'Что-то пошло не так'}</p>}

        <Form isFormValid={isFormValid} onSubmit={handleRegister} isloading={isloading} buttonText="Войти">
          <Input value={values.email} error={errors.email} isValuesValid={isValuesValid.email} type="email" name='email' placeholder='E-mail*' required='true' onChange={handleValues} />
          <Input value={values.loginPass} isValuesValid={isValuesValid.loginPass} type="password" name='loginPass' placeholder='Пароль*' required='true' onChange={handleValues} />
        </Form>

        <div className={styles.info}>
        <p>Нет аккаунта?</p>
        <ButtonArrow text="ЗАРЕГИСТРИРОВАТЬСЯ" url="/auth/register" />
        </div>
      </div>


    </section>
   
  );
}

export default Login;
