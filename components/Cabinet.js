import styles from '../styles/Cabinet.module.css'
import MiniCard from './MiniCard';
import { useState } from 'react'
import Image from 'next/image';


function Cabinet() {
  const [isActive, setIsActive] = useState('zakazy');

console.log(isActive)
  return (
      <section className={styles.cabinet}>

          <h1 className={styles.name}>ЛИЧНЫЙ КАБИНЕТ</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${isActive === 'zakazy' && styles.tab_active}`} onClick={() => setIsActive('zakazy')}>Заказы</button>
            <button className={`${styles.tab} ${isActive === 'favorites' && styles.tab_active}`} onClick={() => setIsActive('favorites')}>Избранное</button>
            <button className={`${styles.tab} ${isActive === 'info' && styles.tab_active}`} onClick={() => setIsActive('info')}>Личные данные</button>
          </div> 

          <ul className={`${styles.productList} ${isActive === 'favorites' && styles.content_active}`}>
            {/* <li className={styles.product}>
              <MiniCard />
            </li>
            <li className={styles.product}>
              <MiniCard />
            </li>
            <li className={styles.product}>
              <MiniCard />
            </li>
            <li className={styles.product}>
              <MiniCard />
            </li>
            <li className={styles.product}>
              <MiniCard />
            </li> */}
          </ul>


          <ul className={`${styles.zakazList} ${isActive === 'zakazy' && styles.content_active}`}>
            <li className={styles.good_wrapper}>
              <h3>Заказ № 0000000 / 12.12.2022</h3>
              <div className={styles.good}>
                  <Image className={styles.img} src="/images/test.jpg" width="100" height="80" alt="Логотип"/>
            
                  <div className={styles.spec}>
                    <h2 className={styles.good_name}>СУМКА</h2>
                    <p className={styles.specItem}>Артикул: 35161461346134</p>
                    <p className={styles.specItem}>Цвет: Белый</p>
                    <p className={styles.specItem}>Размеры: в: 23см, ш: 23см, г: 23см</p>
                  </div>
                  
                  <h3 className={styles.price}>9 990 р.</h3>
              </div>
              <div className={styles.good}>
                  <Image className={styles.img} src="/images/test.jpg" width="100" height="80" alt="Логотип"/>
            
                  <div className={styles.spec}>
                    <h2 className={styles.good_name}>СУМКА</h2>
                    <p className={styles.specItem}>Артикул: 35161461346134</p>
                    <p className={styles.specItem}>Цвет: Белый</p>
                    <p className={styles.specItem}>Размеры: в: 23см, ш: 23см, г: 23см</p>
                  </div>
                  
                  <h3 className={styles.price}>9 990 р.</h3>
              </div>
                  
            </li>
            <li className={styles.good_wrapper}>
              <h3>Заказ № 0000000 / 12.12.2022</h3>
              <div className={styles.good}>
                  <Image className={styles.img} src="/images/test.jpg" width="100" height="80" alt="Логотип"/>
            
                  <div className={styles.spec}>
                    <h2 className={styles.good_name}>СУМКА</h2>
                    <p className={styles.specItem}>Артикул: 35161461346134</p>
                    <p className={styles.specItem}>Цвет: Белый</p>
                    <p className={styles.specItem}>Размеры: в: 23см, ш: 23см, г: 23см</p>
                  </div>
                  
                  <h3 className={styles.price}>9 990 р.</h3>
              </div>
              <div className={styles.good}>
                  <Image className={styles.img} src="/images/test.jpg" width="100" height="80" alt="Логотип"/>
            
                  <div className={styles.spec}>
                    <h2 className={styles.good_name}>СУМКА</h2>
                    <p className={styles.specItem}>Артикул: 35161461346134</p>
                    <p className={styles.specItem}>Цвет: Белый</p>
                    <p className={styles.specItem}>Размеры: в: 23см, ш: 23см, г: 23см</p>
                  </div>
                  
                  <h3 className={styles.price}>9 990 р.</h3>
              </div>
                  
            </li>
            
          </ul>


          <ul className={`${styles.infoList} ${isActive === 'info' && styles.content_active}`}>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>ФИО</h3>
              <p className={styles.subtitle}>ФИОФИО ФИОФИОФИО ФИОФИО</p>
            </li>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>E-mail</h3>
              <p className={styles.subtitle}>ФИОФИО ФИОФИОФИО ФИОФИО</p>
            </li>
            <li className={styles.infoItem}>
              <button className={styles.button}>Изменить</button>
            </li>
          </ul>
       
      </section>
   
  );
}

export default Cabinet;
