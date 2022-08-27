import styles from '../styles/Popup.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import Image from 'next/image';
import { useState } from 'react';

function Popup({isOpen, setIsOpen}) {
  
  const close = (e) => {
    if(e.target === e.currentTarget){
      setIsOpen(false)
    }
  }

  return (
    <section className={`${styles.popup} ${isOpen && styles._active}`} onClick={close}>

      <div className={styles.popup_container}>

        <h1 className={styles.name}>ВОЙТИ</h1>

        <Form buttonText="Войти">
          <Input type="email" name='login' placeholder='E-mail*' required='true' />
          <Input type="password" name='pass' placeholder='Пароль*' required='true' />
        </Form>

        <div className={styles.info}>
        <p>Нет аккаунта?</p>
        <ButtonArrow text="ЗАРЕГИСТРИРОВАТЬСЯ" url="/auth/register" />
        </div>

        <button className={styles.closeButton} onClick={()=>setIsOpen(false)}/>
      </div>


    </section>
   
  );
}

export default Popup;
