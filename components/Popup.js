import styles from '../styles/Popup.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closePopup } from '../redux/popupsSlice'
import Textarea from './UI/Inputs/Textarea';
import UseValidation from '../hooks/UseValidation';


function Popup({ id, title, buttonText }) {
  const isOpen = useSelector((state) => state.popups[id])
  const dispatch = useDispatch()

  const { isFormValid, values, handleValues, errors } = UseValidation();
  
  const close = (e) => {
    if(e.target === e.currentTarget){
      dispatch(closePopup())
    }
  }

  return (
    <section id={id} className={`${styles.popup} ${isOpen && styles._active}`} onMouseDown={close}>

      <div className={styles.popup_container}>

        <h1 className={styles.name}>{title}</h1>

        <Form isFormValid={isFormValid} buttonText={buttonText}>
          <Input value={values.tel} error={errors.tel} pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" type="tel" name='tel' placeholder='Телефон*' required='true' onChange={handleValues} />
          <Input value={values.email} error={errors.email} type="email" name='email' placeholder='E-mail*' required='true' onChange={handleValues} />
          <Textarea />
        </Form>
        
        <button className={styles.closeButton} onClick={close}/>
      </div>


    </section>
   
  );
}

export default Popup;
