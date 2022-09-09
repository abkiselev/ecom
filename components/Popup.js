import styles from '../styles/Popup.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closePopup } from '../redux/slices/popupsSlice'
import UseValidation from '../hooks/UseValidation';


function Popup({ id, title, buttonText }) {
  const isOpen = useSelector((state) => state.popups[id])
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch()

  const { isFormValid, values, isValuesValid, handleValues, errors, setInitialValues } = UseValidation();


  useEffect(() => {
    isOpen && setInitialValues({ tel: '', email: '' });
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsloading(true)

    // дописать функцию ____________________________________________________________
    
    setIsloading(false)
  }
  
  const close = (e) => {
    if(e.target === e.currentTarget){
      dispatch(closePopup())
    }
  }

  return (
    <section id={id} className={`${styles.popup} ${isOpen && styles._active}`} onMouseDown={close}>

      <div className={styles.popup_container}>

        <h1 className={styles.name}>{title}</h1>

        <Form isFormValid={isFormValid} onSubmit={handleSubmit} isloading={isloading} buttonText={buttonText}>
          <Input value={values.tel} error={errors.tel} isValuesValid={isValuesValid.tel} type="tel" name='tel' placeholder='Телефон*' required='true' onChange={handleValues} />
          <Input value={values.email} error={errors.email} isValuesValid={isValuesValid.email} type="email" name='email' placeholder='E-mail*' required='true' onChange={handleValues} />
        </Form>
        
        <button className={styles.closeButton} onClick={close}/>
      </div>

    </section>
   
  );
}

export default Popup;
