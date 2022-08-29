import styles from '../styles/Popup.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closePopup } from '../redux/popupsSlice'
import Textarea from './UI/Inputs/Textarea';

function Popup({ id, title, buttonText }) {
  const isOpen = useSelector((state) => state.popups[id])
  const dispatch = useDispatch()
  
  const close = (e) => {
    if(e.target === e.currentTarget){
      dispatch(closePopup())
    }
  }

  return (
    <section id={id} className={`${styles.popup} ${isOpen && styles._active}`} onClick={close}>

      <div className={styles.popup_container}>

        <h1 className={styles.name}>{title}</h1>

        <Form buttonText={buttonText}>
          <Input type="tel" name='login' placeholder='Телефон*' required='true' />
          <Input type="email" name='pass' placeholder='E-mail*' required='true' />
          <Textarea />
        </Form>
        
        <button className={styles.closeButton} onClick={close}/>
      </div>


    </section>
   
  );
}

export default Popup;
