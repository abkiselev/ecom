import styles from '../styles/MiniCard.module.css'
import Image from 'next/image'
import Link from 'next/link'


function MiniCard({good}) {
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
              <p className={styles.price}>{`${good.price} р.`}</p>
              <button className={styles.likeButton}></button>
              <button className={styles.priceButton}></button>
            </div>              
          </div>
        </div>
  );
}

export default MiniCard;
