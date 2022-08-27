import styles from '../styles/Login.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';

function Login() {
  return (
    <section className={styles.login}>

      <div className={styles.login_container}>

        <h1>ВОЙТИ</h1>

        <Form buttonText="Войти">
          <Input type="email" name='login' placeholder='E-mail*' required='true' />
          <Input type="password" name='pass' placeholder='Пароль*' required='true' />
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
