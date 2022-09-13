import styles from '../styles/Login.module.css';
import Form from './Form';
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import UseValidation from '../hooks/UseValidation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function Register() {
  const router = useRouter();
  const { isFormValid, values, isValuesValid, handleValues, errors, setInitialValues } = UseValidation();
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setInitialValues({ email: '', password: '', passwordRepeat: '', })
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsloading(true)
    const { email, password } = values;

    const configData = {
      headers: { 'content-type': 'application/json' }
    };

    try {
      const user = await axios.post('/api/routes/users/register', { email, password }, configData);    
      const login = await axios.post('/api/routes/users/login', { email, password }, configData);
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

        <h1>РЕГИСТРАЦИЯ</h1>

        {isError && <p className={styles.servererror}>{errorText || 'Что-то пошло не так'}</p>}

        <Form isFormValid={isFormValid} onSubmit={handleRegister} isloading={isloading} buttonText="Отправить">
          <Input value={values.email} error={errors.email} isValuesValid={isValuesValid.email} type="email" name='email' placeholder='E-mail*' required='true' onChange={handleValues} />
          <Input value={values.password} error={errors.password} isValuesValid={isValuesValid.password} type="password" name='password' placeholder='Пароль*' required='true' onChange={handleValues} />
          <Input value={values.passwordRepeat} error={errors.passwordRepeat} isValuesValid={isValuesValid.passwordRepeat} type="password" name='passwordRepeat' placeholder='Повторите пароль*' required='true' onChange={handleValues} />
        </Form>

        <div className={styles.info}>
        <p>Уже есть аккаунт?</p>
        <ButtonArrow text="ВОЙТИ" url="/auth/login" />
        </div>
      </div>


    </section>
   
  );
}

export default Register;
