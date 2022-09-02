import styles from '../../styles/Admin.module.css'
import Meta from '../../components/Meta'
import { useState } from 'react';
import LookbookAdmin from '../../components/admin/Lookbook_admin';
import GoodsAdmin from '../../components/admin/Goods_admin';
import OrdersAdmin from '../../components/admin/Orders_admin';
import UsersAdmin from '../../components/admin/Users_admin';
import CategoriesAdmin from '../../components/admin/Categories_admin';


export default function Admin() {
  const [isActive, setIsActive] = useState('goods');  

  return (
    <>
      <Meta
        title="Админ-панель"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <section className={styles.admin}>

        <div className={styles.header}>

          <h1 className={styles.name}>АДМИНКА</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${isActive === 'lookbook' && styles.tab_active}`} onClick={() => setIsActive('lookbook')}>Lookbook</button>
            <button className={`${styles.tab} ${isActive === 'goods' && styles.tab_active}`} onClick={() => setIsActive('goods')}>Товары</button>
            <button className={`${styles.tab} ${isActive === 'categories' && styles.tab_active}`} onClick={() => setIsActive('categories')}>Категории</button>
            <button className={`${styles.tab} ${isActive === 'orders' && styles.tab_active}`} onClick={() => setIsActive('orders')}>Заказы</button>
            <button className={`${styles.tab} ${isActive === 'users' && styles.tab_active}`} onClick={() => setIsActive('users')}>Пользователи</button>
          </div> 

          </div>

          {isActive === 'lookbook' && <LookbookAdmin />}
          {isActive === 'goods' && <GoodsAdmin />}
          {isActive === 'categories' && <CategoriesAdmin />}
          {isActive === 'orders' && <OrdersAdmin />}
          {isActive === 'users' && <UsersAdmin />}
       
      </section>
   

    </>
  )
}
