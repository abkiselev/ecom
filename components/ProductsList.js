import styles from '../styles/ProductsList.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';
import Select from './UI/Inputs/Select';
import Search from './UI/Inputs/Search';


function ProductsList({ goods, colors, visota, glubina, shirina, dlina }) {
  

  
  
  console.log({ goods, colors, visota, glubina, shirina, dlina })
  return (
      <section className={styles.goods}>

          <h1 className={styles.name}>{goods[0].category.title.toUpperCase()}</h1>


          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
              {colors.length > 0 &&
                <Select name={colors} id={colors}>
                  <option value="reset">Цвет</option>
                  {colors.map(item => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
              }
              {visota.length > 0 &&
                <Select name={visota} id={visota}>
                  <option value="reset">Высота</option>
                  {visota.map(item => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
              }
              {glubina.length > 0 &&
                <Select name={glubina} id={glubina}>
                  <option value="reset">Глубина</option>
                  {glubina.map(item => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
              }
              {shirina.length > 0 &&
                <Select name={shirina} id={shirina}>
                  <option value="reset">Ширина</option>
                  {shirina.map(item => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
              }
              {dlina.length > 0 &&
                <Select name={dlina} id={dlina}>
                  <option value="reset">Длина</option>
                  {dlina.map(item => (
                    <option key={item} value={item}>{item}</option>                    
                  ))}
                </Select>
              }

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

            {goods.map(good => (
              <li key={good._id} className={styles.good}>
                <MiniCard good={good}/>
              </li>
            ))}

            {/* <li className={styles.product}>
              <MiniCard goods={goods}/>
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

          
        
      </section>
   
  );
}

export default ProductsList;
