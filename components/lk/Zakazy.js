import styles from '../../styles/Lk/Zakazy.module.css'
import { useEffect } from 'react';

function Zakazy({ goods, setUserOrders }) {
  useEffect(() => {
    // СДЕЛАТЬ ЗАПРОС ЗА СПИСКОМ ЗАКАЗОВ
  }, []);
  
  return (
    <>
      {(goods.length === 0)
        ? <p>Вы пока ничего не заказывали</p>
        : <ul className={styles.productList}>
            
              {goods.map(good => (
                  <li key={good._id} className={styles.good}>
                      {/* // ВЫВЕСТИ СПИСОК ЗАКАЗОВ */}
                  </li>
              ))}
              
          </ul>
        }
    </>
  );
}


export default Zakazy;
