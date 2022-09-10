import Image from 'next/image'
import styles from '../styles/Cart.module.css'
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
  
  useEffect(() => {
    if(user === null){
      setInitialValues({password: '', dostavka: '', oplata: '', firstName: user?.firstName || '', secondName: user?.secondName || '', surName: user?.surName || '', address: user?.address || '', tel: user?.tel || '', email: user?.email || ''});
    } else {
      setInitialValues({dostavka: '', oplata: '', firstName: user?.firstName || '', secondName: user?.secondName || '', surName: user?.surName || '', address: user?.address || '', tel: user?.tel || '', email: user?.email || ''});
    }
  }, []);  

  // console.log(isValuesValid)
  // console.log(Boolean(user === null))
 
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
      if(user !== null){
        const userUpdated = await axios.post(`/api/routes/users/${user._id}`, { firstName, secondName, surName, address, tel, email }, configData);
        const orderData = { dostavka, oplata, owner: user._id, goods: goodsIds, total: totalOrderCost };
        const order = await axios.post('/api/routes/orders', orderData, configData);
      } else {
        const userCreated = await axios.post('/api/routes/users', userData, configData);
        const orderData = { dostavka, oplata, owner: userCreated.data.data._id, goods: goodsIds, total: totalOrderCost };
        const order = await axios.post('/api/routes/orders', orderData, configData);
      }
      setIsloading(false)
      setOrderConfirmed(true)
      clearCart()
    } catch (error) {
      setIsloading(false)
    }    
  }
  

  return (
      <section className={styles.cart}>

        <h1>КОРЗИНА</h1>

        {isOrderConfirmed
          ? <ConfirmationOrder email={values.email}/>
          : goodsInCart.length === 0 
            ? <CartEmpty />
            : <section className={styles.cartWrapper}>

              <ul className={styles.goods}>

                {goodsInCart.map(item => (
                  <li key={item._id} className={styles.good}>
                    
                    <Image className={styles.img} src={`/images/uploads/${item.images[0]}`} width="100" height="80" alt={item.title}/>
              
                    <div className={styles.spec}>
                      <h2 className={styles.name}>{item.title.toUpperCase()}</h2>
                      <p className={styles.specItem}>{`Артикул: ${item._id}`}</p>
                      <p className={styles.specItem}>{`Цвет: ${item.color}`}</p>
                      <p className={styles.specItem}>{`Размеры: в: ${item.visota}, ш: ${item.shirina}, г: ${item.glubina}`}</p>
                    </div>
                    
                    <div className={styles.actions}>
                      <h3 className={styles.price}>{`${item.price.toLocaleString()} р.`}</h3>
                      <button className={styles.deleteButton} onClick={() => removeFromCart(item)} />
                    </div>
                      
                  </li>
                ))}

              </ul>

              <div className={styles.checkout}>
                <h2 className={styles.name}>Оформление заказа</h2>

                <div className={styles.data}>
                    <p className={styles.total}>Итого: </p> <p>{`${totalOrderCost.toLocaleString()} р.`}</p>
                    <p>Товары: </p> <p>{`${totalGoodsCost.toLocaleString()} р.`}</p>
                    <p>Доставка: </p> <p>{deliveryCost} р.</p>
                  </div>
                
                <Form onSubmit={(e)=>handleSubmit(e)} isFormValid={isFormValid} isloading={isloading} buttonText="Отправить заказ" >

                  <div className={styles.addings}>
                    <Select onChange={handleValues} value={values.dostavka} error={errors.dostavka} name="dostavka" required='true'>
                      <option value="">Способ доставки*</option>
                      <option value="pochta">Почта России (250р.)</option>
                      <option value="currier">Курьером в руки (400р.)</option>
                    </Select>
                    <Select onChange={handleValues} value={values.oplata} error={errors.oplata} name="oplata" required='true'>
                      <option value="">Способ оплаты*</option>
                      <option value="online">Картой онлайн</option>
                      <option value="onDelivery">При получении</option>
                    </Select>
                  </div>

                  <div className={styles.fio}>
                    <Input onChange={handleValues} value={values.surName} isValuesValid={isValuesValid.surName} error={errors.surName} type="text" name='surName' placeholder='Фамилия*' required='true' />
                    <Input onChange={handleValues} value={values.firstName} isValuesValid={isValuesValid.firstName} error={errors.firstName} type="text" name='firstName' placeholder='Имя*' required='true' />
                    <Input onChange={handleValues} value={values.secondName} isValuesValid={isValuesValid.secondName} error={errors.secondName} type="text" name='secondName' placeholder='Отчество*' required='true' />
                  </div>
                  <Input onChange={handleValues} value={values.address} isValuesValid={isValuesValid.address} error={errors.address} type="text" name='address' placeholder='Адрес доставки*' required='true' />
                  <Input onChange={handleValues} value={values.tel} isValuesValid={isValuesValid.tel} error={errors.tel} type="tel" name='tel' placeholder='Контактный телефон*' required='true' />
                  <Input onChange={handleValues} value={values.email} isValuesValid={isValuesValid.email} error={errors.email} type="email" name='email' placeholder='E-mail*' required='true' />

                  {user === null &&
                    <Input onChange={handleValues} value={values.password} isValuesValid={isValuesValid.password} error={errors.password} type="password" name='password' placeholder='Придумайте пароль для личного кабинета*' required='true' />
                  }

                </Form>

              </div>

            </section>
        
        }
        

        
      </section>
   
  );
}

export default Cart;
