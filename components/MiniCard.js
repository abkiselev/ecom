import styles from '../styles/MiniCard.module.css'
import Image from 'next/image'
import Link from 'next/link'


function MiniCard() {
  return (
        <div className={styles.slide}>
          
          <div className={styles.info}>
            <Link href='#'>
              <a className={styles.url}>
                <Image className={styles.img} src="/images/test.jpg" width="250" height="250" alt="Товар" />
                <h3 className={styles.title}>New collection 2022</h3>
              </a>
            </Link>

            <div className={styles.prices}>
              <p className={styles.price}>6 990 р.</p>
              <button className={styles.likeButton}></button>
              <button className={styles.priceButton}></button>
            </div>              
          </div>
        </div>
  );
}

export default MiniCard;
