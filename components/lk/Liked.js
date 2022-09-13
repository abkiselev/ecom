import styles from '../../styles/Lk/Liked.module.css'
import MiniCard from '../MiniCard';

function Liked({ goods, handleAdd, handleRemove, handleSetLike, handleRemoveLike }) {
  
  return (
    <>
      {(goods.length === 0)
        ? <p>В избранном пока ничего нет...</p>
        : <ul className={styles.productList}>
            
              {goods.map(good => (
                  <li key={good._id} className={styles.good}>
                    <MiniCard good={good} handleAdd={handleAdd} handleRemove={handleRemove} handleSetLike={handleSetLike} handleRemoveLike={handleRemoveLike}/>
                  </li>
              ))}
              
          </ul>
        }
    </>
  );
}


export default Liked;
