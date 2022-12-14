import styles from '../styles/MiniCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

function MiniCard({ good, handleAdd, handleRemove, handleSetLike, handleRemoveLike }) {
  const isAdded = useSelector((state) => state.user.userInfo.cart.some((item) => item._id === good._id))
  const isLiked = useSelector((state) => state.user.userInfo.likes.some((item) => item._id === good._id))

  return (
    <div className={styles.slide}>
      <div className={styles.info}>
        <Link href={`/${good.category.link}/${good.link}`}>
          <a className={styles.url}>
            <Image
              className={styles.img}
              src={`/images/uploads/${good.images[0]}`}
              width="550"
              height="650"
              alt={good.title}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
            <h3 className={styles.title}>{good.title}</h3>
          </a>
        </Link>

        <div className={styles.prices}>
          <p className={styles.price}>{`${good.price.toLocaleString()} р.`}</p>
          <button
            className={`${styles.likeButton} ${isLiked ? `${styles.isliked}` : `${styles.notliked}`}`}
            onClick={isLiked ? () => handleRemoveLike(good) : () => handleSetLike(good)}
          ></button>
          <button
            className={`${styles.addButton} ${isAdded ? `${styles.isadded}` : `${styles.notadded}`}`}
            onClick={isAdded ? () => handleRemove(good) : () => handleAdd(good)}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default MiniCard
