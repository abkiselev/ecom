import styles from '../styles/ProductsList.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';
import Select from './UI/Inputs/Select';
import Search from './UI/Inputs/Search';
import { useState } from 'react';


function ProductsList({ goods, colors }) {
  const [filterValue, setFilterValues] = useState('');

  console.log(filterValue)
  
  return (
      <section className={styles.goods}>

          <h1 className={styles.name}>{goods[0].category.title.toUpperCase()}</h1>


          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
                <Select onChange={(e) => setFilterValues(e.target.value)} value={filterValue.color || ''} name='color'>
                  <option value="">Цвет</option>
                  {colors.map((item) => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
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

            {goods.filter(item => item.color.startsWith(filterValue)).map(good => (
              <li key={good._id} className={styles.good}>
                <MiniCard good={good}/>
              </li>
            ))}
          </ul>

          
        
      </section>
   
  );
}

export default ProductsList;
