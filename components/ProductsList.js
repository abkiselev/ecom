import styles from '../styles/ProductsList.module.css'
import MiniCard from './MiniCard';
import Select from './UI/Inputs/Select';
import Search from './UI/Inputs/Search';


function ProductsList({ category, mainGoods, colors, filters, filterValues, setFilterValues, sortValue, setSortValue }) {
  
  return (
      <section className={styles.goods}>

          <h1 className={styles.name}>{category}</h1>

          <form ref={filters} className={styles.filters_wrapper}>
            <div className={styles.filter}>
                <Select onChange={(e) => setFilterValues({ ...filterValues, [e.target.name]: e.target.value })} value={filterValues.color || ''} name='color'>
                  <option value="">Цвет</option>
                  {colors.map((item) => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
            </div>   

            <div className={styles.sort}>
                <Search
                  onChange={(e)=>setFilterValues({ ...filterValues, [e.target.name]: e.target.value })}
                  onClick={(e)=>setFilterValues({ ...filterValues, title: '' })}
                  value={filterValues.title || ''}
                  placeholder='поиск'
                  name='title'
                />

                <Select onChange={(e) => setSortValue( e.target.value )} value={sortValue} name='sort'>
                  <option value="popular">По популярности</option>
                  <option value="cheap">Сначала дешевле</option>
                  <option value="expencive">Сначала дороже</option>
                </Select>     
            </div>

          </form>   

          <ul className={styles.productList}>

            {mainGoods
              .filter((item) => Object.entries(filterValues).every(([key, value]) => item[key].includes(value)))
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
