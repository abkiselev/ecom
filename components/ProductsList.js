import styles from '../styles/ProductsList.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';
import Select from './UI/Inputs/Select';
import Search from './UI/Inputs/Search';
import { useState, useEffect } from 'react';


function ProductsList({ goods, colors }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [searchValue, setSearchValue] = useState('');

  console.log(filterValues)
    
  // useEffect(() => {
  //   setFilteredProducts(
  //     goods.filter((item) => {
  //       Object.entries(filterValues).every(([key, value]) => item[key].includes(value))
  //     })
  //   )
  // }, [filterValues]);

  
  return (
      <section className={styles.goods}>

          <h1 className={styles.name}>{goods[0].category.title.toUpperCase()}</h1>


          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
                <Select onChange={(e) => setFilterValues({ ...filterValues, [e.target.name]: e.target.value })} value={filterValues.color || ''} name='color'>
                  <option value="">Цвет</option>
                  {colors.map((item) => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
            </div>   

            <div className={styles.sort}>
                <Search onChange={(e)=>setFilterValues({ ...filterValues, [e.target.name]: e.target.value })} placeholder='поиск' name='title'/>

                <Select name="" id="">
                  <option value="reset">По популярности</option>
                  <option value="reset">Сначала дешевле</option>
                  <option value="reset">Сначала дороже</option>
                </Select>     
            </div>

          </div>   

          <ul className={styles.productList}>

            {goods.filter((item) => Object.entries(filterValues).every(([key, value]) => item[key].includes(value)))
                  .filter(item => item.title.includes(searchValue))
                  .map(good => (
              <li key={good._id} className={styles.good}>
                <MiniCard good={good}/>
              </li>
            ))}
          </ul>

          
        
      </section>
   
  );
}


export default ProductsList;
