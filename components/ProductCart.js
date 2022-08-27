import { Navigation, Pagination, Controller,Thumbs  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Button from './UI/Buttons/Button';
import styles from '../styles/ProductCart.module.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Fancybox from './Fancybox';
import MiniCard from './MiniCard';
import Form from './Form';
import Input from './UI/Inputs/Input';
import Select from './UI/Inputs/Select';


function ProductCart() {
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
            
            <Form buttonText="Отправить заказ" >

              <div className={styles.addings}>
                <Select name="" id="">
                  <option value="reset">Способ доставки*</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </Select>
                <Select name="" id="">
                  <option value="reset">Способ оплаты*</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </Select>
              </div>

              <Input type="text" name='fio' placeholder='ФИО*' required='true' />
              <Input type="text" name='address' placeholder='Адрес доставки*' required='true' />
              <Input type="text" name='tel' placeholder='Контактный телефон*' required='true' />
              <Input type="text" name='email' placeholder='E-mail*' required='true' />

            </Form>

          </div>

        </section>
        
      </section>
   
  );
}

export default ProductCart;
