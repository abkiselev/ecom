import styles from '../styles/Login.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import UseValidation from '../hooks/UseValidation';

function Register() {
  const { isFormValid, values, handleValues, errors } = UseValidation();
  
  return (
    <section className={styles.login}>

      <div className={styles.login_container}>

        <h1>РЕГИСТРАЦИЯ</h1>

        <Form isFormValid={isFormValid} buttonText="Войти">
          <Input value={values.email} error={errors.email} type="email" name='email' placeholder='E-mail*' required='true' onChange={handleValues} />
          <Input value={values.password} error={errors.password} type="password" name='password' placeholder='Пароль*' required='true' onChange={handleValues} />
          <Input value={values.passwordRepeat} error={errors.passwordRepeat} type="password" name='passwordRepeat' placeholder='Повторите пароль*' required='true' onChange={handleValues} />
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
