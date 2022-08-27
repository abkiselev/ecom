import styles from '../styles/Login.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';

function Register() {
  return (
    <section className={styles.login}>

      <div className={styles.login_container}>

        <h1>РЕГИСТРАЦИЯ</h1>

        <Form buttonText="Войти">
          <Input type="email" name='login' placeholder='E-mail*' required='true' />
          <Input type="password" name='pass' placeholder='Пароль*' required='true' />
          <Input type="password" name='pass' placeholder='Повторите пароль*' required='true' />
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
