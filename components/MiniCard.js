import styles from '../styles/MiniCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'


function MiniCard({ pending, good, handleAdd, handleRemove, handleSetLike, handleRemoveLike }) {
  const isAdded = useSelector((state) => state.user.userInfo.cart.some(item => item._id === good._id));
  const isLiked = useSelector((state) => state.user.userInfo.likes.some(item => item._id === good._id));

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
              <button disabled={pending} className={`${styles.likeButton} ${isLiked ? `${styles.isliked}` : `${styles.notliked}`}`} onClick={isLiked ? ()=>handleRemoveLike(good) : ()=>handleSetLike(good)}></button>
              <button disabled={pending} className={`${styles.addButton} ${isAdded ? `${styles.isadded}` : `${styles.notadded}`}`} onClick={isAdded ? ()=>handleRemove(good) : ()=>handleAdd(good)}></button>
            </div>              
          </div>
        </div>
  );
}

export default MiniCard;
