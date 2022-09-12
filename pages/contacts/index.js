import styles from '../../styles/Contacts.module.css'
import Meta from '../../components/Meta'
import Hleb from '../../components/Hleb';
import { checkAuth } from '../api/middlewares/checkAuth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice';
import Form from '../../components/Form';
import Input from '../../components/UI/Inputs/Input';
import UseValidation from '../../hooks/UseValidation';
import axios from 'axios';

export default function Contacts({ userProps }) {
  const user = useSelector((state) => state.user);
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');  

  const { isFormValid, values, isValuesValid, handleValues, errors, setInitialValues } = UseValidation();

  useEffect(() => {
    if(userProps && !user.loggedIn){
      dispatch(setUser(userProps))
    } else if (!userProps && user.loggedIn){
      dispatch(removeUser())
    }

    setInitialValues({ tel: '', email: '' });
  }, []);


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


  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb category='contacts' />

      <section className={styles.contacts}>

          <h1 className={styles.name}>КОНТАКТЫ</h1>

          <div className={styles.wrapper}>

            <div className={styles.info}>

              <div className={styles.info_data}>
                <h2 className={styles.address}>Нижний Новгород,<br/>ул. Панина, дом 3, офис 12</h2>
                <p className={styles.text}>8 000 000 0000</p>
                <p className={styles.text}>hello@leton-shop.ru</p>
              </div>

              <div className={styles.callback}>
                <h2 className={styles.address}>Заказать звонок</h2>

                {isError && <p className={styles.servererror}>{errorText || 'Что-то пошло не так'}</p>}

                <Form isFormValid={isFormValid} onSubmit={handleSubmit} isloading={isloading} buttonText='Заказать звонок'>
                  <Input value={values.tel} error={errors.tel} isValuesValid={isValuesValid.tel} type="tel" name='tel' placeholder='Телефон*' required='true' onChange={handleValues} />
                  <Input value={values.email} error={errors.email} isValuesValid={isValuesValid.email} type="email" name='email' placeholder='E-mail*' required='true' onChange={handleValues} />
                </Form>
              </div>

            </div>

            <div className={styles.map_wrapper}>
              <iframe className={styles.map} src="https://yandex.ru/map-widget/v1/?um=constructor%3Abb564da5a491b401939b2add679e3345d84c2f13655a898389e0d0eb9e3ec525&amp;source=constructor" width="100%" height="500" frameBorder="0"></iframe>
            </div>

          </div>

          
        
      </section>


    </>
  )
}

export async function getServerSideProps(context) {
  const user = await checkAuth(context.req);

  return { props: { userProps: JSON.parse(JSON.stringify(user)) } }
}
