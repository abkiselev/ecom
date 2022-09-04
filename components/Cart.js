import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import Form from './Form';
import Input from './UI/Inputs/Input';
import Select from './UI/Inputs/Select';
import UseValidation from '../hooks/UseValidation';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import axios from 'axios';


function Cart({ removeFromCart }) {
  const goodsInCart = useSelector((state) => state.cart.goods);
  const totalGoodsCost = useSelector((state) => state.cart.totalSum);
  const { isFormValid, values, setInitialValues, handleValues, errors } = UseValidation();

  useEffect(() => {
    setInitialValues({dostavka: '', oplata: '', firstName: '', secondName: '', surName: '', address: '', tel: '', email: ''}) 
  }, [])

  console.log(goodsInCart)
  console.log(totalGoodsCost)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { dostavka, oplata, firstName, secondName, surName, address, tel, email } = values;
    const goodsIds = [];

    goodsInCart.forEach(item => {
      goodsIds.push(item._id)
    });

    const userData = { firstName, secondName, surName, address, tel, email };

    const configData = {
      headers: { 'content-type': 'application/json' }
    };

    const user = await axios.post('/api/routes/users', userData, configData);
    console.log(user)

    const orderData = { dostavka, oplata, owner: user.data.data._id, goods: goodsIds, total: totalGoodsCost };
    console.log(orderData)
    const order = await axios.post('/api/routes/users', orderData, configData);
    console.log(order)

  }

  return (
      <section className={styles.cart}>

        <h1>КОРЗИНА</h1>

        <section className={styles.cartWrapper}>

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
                <p className={styles.total}>Итого: </p> <p>9 999 р.</p>
                <p>Товары: </p> <p>{`${totalGoodsCost.toLocaleString()} р.`}</p>
                <p>Доставка: </p> <p>0 р.</p>
              </div>
            
            <Form onSubmit={(e)=>handleSubmit(e)} isFormValid={isFormValid} buttonText="Отправить заказ" >

              <div className={styles.addings}>
                <Select onChange={handleValues} value={values.dostavka} error={errors.dostavka} name="dostavka" required='true'>
                  <option value="">Способ доставки*</option>
                  <option value="pochta">Почта России</option>
                  <option value="currier">Курьером в руки</option>
                </Select>
                <Select onChange={handleValues} value={values.oplata} error={errors.oplata} name="oplata" required='true'>
                  <option value="">Способ оплаты*</option>
                  <option value="online">Картой онлайн</option>
                  <option value="onDelivery">При получении</option>
                </Select>
              </div>

              <div className={styles.fio}>
                <Input onChange={handleValues} value={values.surName} error={errors.surName} type="text" name='surName' placeholder='Фамилия*' required='true' />
                <Input onChange={handleValues} value={values.firstName} error={errors.firstName} type="text" name='firstName' placeholder='Имя*' required='true' />
                <Input onChange={handleValues} value={values.secondName} error={errors.secondName} type="text" name='secondName' placeholder='Отчество*' required='true' />
              </div>
              <Input onChange={handleValues} value={values.address} error={errors.address} type="text" name='address' placeholder='Адрес доставки*' required='true' />
              <Input onChange={handleValues} value={values.tel} error={errors.tel} type="tel" name='tel' placeholder='Контактный телефон*' required='true' />
              <Input onChange={handleValues} value={values.email} error={errors.email} type="email" name='email' placeholder='E-mail*' required='true' />

            </Form>

          </div>

        </section>
        
      </section>
   
  );
}

export default Cart;
