import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import Meta from '../../components/Meta'
import { useState, useEffect } from 'react';
import MiniCard from '../../components/MiniCard';
import Fancybox from '../../components/Fancybox';
import Select from '../../components/UI/Inputs/Select';
import axios from 'axios';
import LookbookAdmin from '../../components/admin/Lookbook_admin';
import GoodsAdmin from '../../components/admin/Goods_admin';
import OrdersAdmin from '../../components/admin/Orders_admin';
import UsersAdmin from '../../components/admin/Users_admin';


export default function Admin() {
  const [isActive, setIsActive] = useState('lookbook');  

  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <section className={styles.admin}>

          <h1 className={styles.name}>АДМИНКА</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${isActive === 'lookbook' && styles.tab_active}`} onClick={() => setIsActive('lookbook')}>Lookbook</button>
            <button className={`${styles.tab} ${isActive === 'goods' && styles.tab_active}`} onClick={() => setIsActive('goods')}>Товары</button>
            <button className={`${styles.tab} ${isActive === 'orders' && styles.tab_active}`} onClick={() => setIsActive('orders')}>Заказы</button>
            <button className={`${styles.tab} ${isActive === 'users' && styles.tab_active}`} onClick={() => setIsActive('users')}>Пользователи</button>
          </div> 

          {isActive === 'lookbook' && <LookbookAdmin />}
          {isActive === 'goods' && <GoodsAdmin />}
          {isActive === 'orders' && <OrdersAdmin />}
          {isActive === 'users' && <UsersAdmin />}
       
      </section>
   

    </>
  )
}
