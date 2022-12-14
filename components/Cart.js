import Image from 'next/image';
import styles from '../styles/Cart.module.css';
import Form from './Form';
import CartEmpty from './CartEmpty';
import ConfirmationOrder from './ConfirmationOrder';
import Input from './UI/Inputs/Input';
import Select from './UI/Inputs/Select';
import UseValidation from '../hooks/UseValidation';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Cart({ removeFromCart, clearCart, user, goodsInCart, totalGoodsCost }) {
  const { isFormValid, values, isValuesValid, setInitialValues, handleValues, errors } = UseValidation();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalOrderCost, setTotalOrderCost] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if(user.loggedIn){
      setInitialValues({dostavka: '', oplata: '', firstName: user?.userInfo.firstName || '', secondName: user?.userInfo.secondName || '', surName: user?.userInfo.surName || '', address: user?.address || '', tel: user?.userInfo.tel || '', email: user?.userInfo.email || ''});
    } else {
      setInitialValues({password: '', dostavka: '', oplata: '', firstName: user?.firstName || '', secondName: user?.secondName || '', surName: user?.surName || '', address: user?.address || '', tel: user?.tel || '', email: user?.email || ''});
    }
  }, []);  
 
  useEffect(() => {    
    if(values.dostavka === 'pochta'){
      setDeliveryCost(250)
      setTotalOrderCost(totalGoodsCost + 250)
    } else if (values.dostavka === 'currier') {
      setDeliveryCost(400)
      setTotalOrderCost(totalGoodsCost + 400)
    } else {
      setDeliveryCost(0)
      setTotalOrderCost(totalGoodsCost)
    }
  }, [values.dostavka, totalGoodsCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true)

    const { dostavka, oplata, firstName, secondName, surName, address, tel, email, password } = values;
    const goodsIds = [];

    goodsInCart.forEach(item => {
      goodsIds.push(item._id)
    });

    const userData = { firstName, secondName, surName, address, tel, email, password };

    const configData = {
      headers: { 'content-type': 'application/json' }
    };
    

    try {
      if(user.loggedIn){
        const userUpdated = await axios.post(`/api/routes/users/${user.userInfo._id}`, { firstName, secondName, surName, address, tel, email }, configData);
        const orderData = { dostavka, oplata, owner: user.userInfo._id, goods: goodsIds, total: totalOrderCost };
        const order = await axios.post('/api/routes/orders', orderData, configData);
      } else {        
        const userCreated = await axios.post('/api/routes/users', userData, configData);
        const orderData = { dostavka, oplata, owner: userCreated.data.data._id, goods: goodsIds, total: totalOrderCost };
        const order = await axios.post('/api/routes/orders', orderData, configData);
      }
      setIsloading(false)
      setOrderConfirmed(true)
      clearCart(user.userInfo._id, user.userInfo.cart)
    } catch (error) {
      setIsError(true)
      setIsloading(false)
      setErrorText(error.response.data.message)
    }    
  }
  

  return (
      <section className={styles.cart}>

        <h1>??????????????</h1>

        {isOrderConfirmed
          ? <ConfirmationOrder email={values.email}/>
          : goodsInCart.length === 0 
            ? <CartEmpty />
            : <section className={styles.cartWrapper}>

              <ul className={styles.goods}>

                {goodsInCart.map(item => (
                  <li key={item._id} className={styles.good}>
                    
                    <Image className={styles.img} src={`/images/uploads/${item.images[0]}`} width="100" height="100" alt={item.title}/>
              
                    <div className={styles.spec}>
                      <h2 className={styles.name}>{item.title.toUpperCase()}</h2>
                      <p className={styles.specItem}>{`??????????????: ${item._id}`}</p>
                      <p className={styles.specItem}>{`????????: ${item.color}`}</p>
                      <p className={styles.specItem}>{`??????????????: ??: ${item.visota}, ??: ${item.shirina}, ??: ${item.glubina}`}</p>
                    </div>
                    
                    <div className={styles.actions}>
                      <h3 className={styles.price}>{`${item.price.toLocaleString()} ??.`}</h3>
                      <button className={styles.deleteButton} onClick={() => removeFromCart(item)} />
                    </div>
                      
                  </li>
                ))}

              </ul>

              <div className={styles.checkout}>
                <h2 className={styles.name}>???????????????????? ????????????</h2>

                {isError && <p className={styles.servererror}>{errorText || '??????-???? ?????????? ???? ??????'}</p>}

                <div className={styles.data}>
                    <span className={styles.total}>??????????:  <span>{`${totalOrderCost.toLocaleString()} ??.`}</span></span>
                    <span>????????????:  <span>{`${totalGoodsCost.toLocaleString()} ??.`}</span></span>
                    <span>????????????????:  <span>{deliveryCost} ??.</span></span>
                </div>
                
                <Form onSubmit={(e)=>handleSubmit(e)} isFormValid={isFormValid} isloading={isloading} buttonText="?????????????????? ??????????" >

                  <div className={styles.addings}>
                    <Select onChange={handleValues} value={values.dostavka} error={errors.dostavka} name="dostavka" required='true'>
                      <option value="">???????????? ????????????????*</option>
                      <option value="pochta">?????????? ???????????? (250??.)</option>
                      <option value="currier">???????????????? ?? ???????? (400??.)</option>
                    </Select>
                    <Select onChange={handleValues} value={values.oplata} error={errors.oplata} name="oplata" required='true'>
                      <option value="">???????????? ????????????*</option>
                      <option value="online">???????????? ????????????</option>
                      <option value="onDelivery">?????? ??????????????????</option>
                    </Select>
                  </div>

                  <div className={styles.fio}>
                    <Input onChange={handleValues} value={values.surName} isValuesValid={isValuesValid.surName} error={errors.surName} type="text" name='surName' placeholder='??????????????*' required='true' />
                    <Input onChange={handleValues} value={values.firstName} isValuesValid={isValuesValid.firstName} error={errors.firstName} type="text" name='firstName' placeholder='??????*' required='true' />
                    <Input onChange={handleValues} value={values.secondName} isValuesValid={isValuesValid.secondName} error={errors.secondName} type="text" name='secondName' placeholder='????????????????*' required='true' />
                  </div>
                  <Input onChange={handleValues} value={values.address} isValuesValid={isValuesValid.address} error={errors.address} type="text" name='address' placeholder='?????????? ????????????????*' required='true' />
                  <Input onChange={handleValues} value={values.tel} isValuesValid={isValuesValid.tel} error={errors.tel} type="tel" name='tel' placeholder='???????????????????? ??????????????*' required='true' />
                  <Input onChange={handleValues} value={values.email} isValuesValid={isValuesValid.email} error={errors.email} type="email" name='email' placeholder='E-mail*' required='true' />

                  {!user.loggedIn &&
                    <Input onChange={handleValues} value={values.password} isValuesValid={isValuesValid.password} error={errors.password} type="password" name='password' placeholder='???????????????????? ???????????? ?????? ?????????????? ????????????????*' required='true' />
                  }

                </Form>

              </div>

            </section>
        
        }
        

        
      </section>
   
  );
}

export default Cart;
