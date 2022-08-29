import styles from '../styles/Cabinet.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';
import Select from './UI/Inputs/Select';
import Search from './UI/Inputs/Search';
import Button from './UI/Buttons/Button';


function Cabinet() {
  return (
      <section className={styles.cabinet}>

          <h1 className={styles.name}>ЛИЧНЫЙ КАБИНЕТ</h1>

          <h2 className={styles.wrapper}>Избранное</h2>   

          <ul className={styles.productList}>
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
            </li>
            <li className={styles.product}>
              <MiniCard />
            </li>
          </ul>


          <h2 className={styles.wrapper}>Заказы</h2>   

          <ul className={styles.zakazList}>
            <li className={styles.zakaz}>
              <MiniCard />
            </li>
          </ul>


          <h2 className={styles.wrapper}>Личные данные</h2>   

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>ФИО</h3>
              <p className={styles.subtitle}>ФИОФИО ФИОФИОФИО ФИОФИО</p>
            </li>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>E-mail</h3>
              <p className={styles.subtitle}>ФИОФИО ФИОФИОФИО ФИОФИО</p>
            </li>
            <li className={styles.infoItem}>
              <Button text="Изменить"/>
            </li>
          </ul>

          
        
      </section>
   
  );
}

export default Cabinet;
