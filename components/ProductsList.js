import styles from '../styles/ProductsList.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';
import Select from './UI/Inputs/Select';
import Search from './UI/Inputs/Search';


function ProductsList() {
  return (
      <section className={styles.goods}>

          <h1 className={styles.name}>СУМКИ</h1>


          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
                <Select name="" id="">
                  <option value="reset">Цвет</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </Select>

                <Select name="" id="">
                  <option value="reset">Размер</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </Select>

                <Select name="" id="">
                  <option value="reset">Цвет</option>
                  <option value="reset">Белый</option>
                  <option value="reset">Синий</option>
                  <option value="reset">Красный</option>
                </Select>          
            </div>   

            <div className={styles.sort}>
                <Search />

                <Select name="" id="">
                  <option value="reset">По популярности</option>
                  <option value="reset">По цене</option>
                </Select>     
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
