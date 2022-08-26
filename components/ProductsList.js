import styles from '../styles/ProductsList.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';


function ProductsList() {
  return (
      <section className={styles.goods}>

          <h1 className={styles.name}>СУМКИ</h1>


          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
                <select className={styles.select} name="" id="">
                  <option value="reset">Цвет</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </select>

                <select className={styles.select} name="" id="">
                  <option value="reset">Размер</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </select>

                <select className={styles.select} name="" id="">
                  <option value="reset">Цвет</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </select>          
            </div>   

            <div className={styles.sort}>
              <input className={styles.search} type="text" />

                <select className={styles.select} name="" id="">
                  <option value="reset">По популярности</option>
                  <option value="reset">По цене</option>
                </select>     
            </div>

          </div>   

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

          
        
      </section>
   
  );
}

export default ProductsList;
