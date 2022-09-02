import styles from '../styles/MiniCard.module.css'
import Image from 'next/image'
import Link from 'next/link'


function MiniCard({product}) {
  return (
        <div className={styles.slide}>
          
          <div className={styles.info}>
            <Link href={`/${product.category.link}/${product.link}`}>
              <a className={styles.url}>
                <Image className={styles.img} src={`/images/uploads/${product.images[0]}`} width="550" height="650" alt={product.title} />
                <h3 className={styles.title}>{product.title}</h3>
              </a>
            </Link>

            <div className={styles.prices}>
              <p className={styles.price}>{`${product.price} р.`}</p>
              <button className={styles.likeButton}></button>
              <button className={styles.priceButton}></button>
            </div>              
          </div>
        </div>
  );
}

export default MiniCard;
