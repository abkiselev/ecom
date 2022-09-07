import styles from '../styles/MiniCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'


function MiniCard({ good, handleAdd, handleRemove, handleSetLike, handleRemoveLike }) {
  const isAdded = useSelector((state) => state.cart.goods.some(item => item._id === good._id));
  const isLiked = useSelector((state) => state.likes.likes.some(item => item._id === good._id));

  return (
        <div className={styles.slide}>
          
          <div className={styles.info}>
            <Link href={`/${good.category.link}/${good.link}`}>
              <a className={styles.url}>
                <Image className={styles.img} src={`/images/uploads/${good.images[0]}`} width="550" height="650" alt={good.title} />
                <h3 className={styles.title}>{good.title}</h3>
              </a>
            </Link>

            <div className={styles.prices}>
              <p className={styles.price}>{`${good.price.toLocaleString()} р.`}</p>
              {isLiked 
              ? <button className={styles.unlikeButton} onClick={()=>handleRemoveLike(good)}></button>
              : <button className={styles.likeButton} onClick={()=>handleSetLike(good)}></button>
              }
              {isAdded 
              ? <button className={styles.removeButton} onClick={()=>handleRemove(good)}></button>
              : <button className={styles.addButton} onClick={()=>handleAdd(good)}></button>
              }
            </div>              
          </div>
        </div>
  );
}

export default MiniCard;
