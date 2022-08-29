import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import Form from './Form';
import Input from './UI/Inputs/Input';
import Select from './UI/Inputs/Select';
import UseValidation from '../hooks/UseValidation';


function Cart() {
  const { isFormValid, values, handleValues, errors } = UseValidation();

  return (
      <section className={styles.cart}>

        <h1>КОРЗИНА</h1>

        <section className={styles.cartWrapper}>

          <ul className={styles.goods}>
            <li className={styles.good}>
                <Image className={styles.img} src="/images/test.jpg" width="100" height="80" alt="Логотип"/>
          
                <div className={styles.spec}>
                  <h2 className={styles.name}>СУМКА</h2>
                  <p className={styles.specItem}>Артикул: 35161461346134</p>
                  <p className={styles.specItem}>Цвет: Белый</p>
                  <p className={styles.specItem}>Размеры: в: 23см, ш: 23см, г: 23см</p>
                </div>
                
                <div className={styles.actions}>
                  <h3 className={styles.price}>9 990 р.</h3>
                  <button className={styles.deleteButton} />
                </div>
                  
            </li>

          </ul>

          <div className={styles.checkout}>
            <h2 className={styles.name}>Оформление заказа</h2>

            <div className={styles.data}>
                <p className={styles.total}>Итого: </p> <p>9 999 р.</p>
                <p>Товары: </p> <p>9 999 р.</p>
                <p>Доставка: </p> <p>0 р.</p>
              </div>
            
            <Form isFormValid={isFormValid} buttonText="Отправить заказ" >

              <div className={styles.addings}>
                <Select onChange={handleValues} value={values.dostavka} name="dostavka" id="" required='true'>
                  <option value=""></option>
                  <option value="pochta">Почта России</option>
                  <option value="curier">Курьером в руки</option>
                </Select>
                <Select onChange={handleValues} value={values.oplata} name="oplata" id="" required='true'>
                  <option value="not">Способ оплаты*</option>
                  <option defaultValue value="online">Картой онлайн</option>
                  <option value="onDelivery">При получении</option>
                </Select>
              </div>

              <Input onChange={handleValues} value={values.fio} error={errors.fio} type="text" name='fio' placeholder='ФИО*' required='true' />
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
