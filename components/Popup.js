import styles from '../styles/Popup.module.css'
import Form from './Form'
import Input from './UI/Inputs/Input';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closePopup } from '../redux/slices/popupsSlice'
import UseValidation from '../hooks/UseValidation';
import axios from 'axios';


function Popup({ id, title, buttonText }) {
  const isOpen = useSelector((state) => state.popups[id])
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch()
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { isFormValid, values, isValuesValid, handleValues, errors, setInitialValues } = UseValidation();


  useEffect(() => {
    isOpen && setInitialValues({ tel: '', email: '' });
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsloading(true)
    
    const { email, tel } = values;

    const configData = {
      headers: { 'content-type': 'application/json' }
    };

    try {
      await axios.post('/api/routes/users/callback', { email, tel }, configData);
      setIsError(true)
      setErrorText('Заявка отправлена')
      setInitialValues({ tel: '', email: '' });
      setIsloading(false)
    } catch (error) {
      setIsError(true)
      setIsloading(false)
      setErrorText(error.response.data.message)
    }
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

        {isError && <p className={styles.servererror}>{errorText || 'Что-то пошло не так'}</p>}

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
