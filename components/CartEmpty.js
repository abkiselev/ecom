import Link from 'next/link'
import styles from '../styles/CartEmpty.module.css'


function CartEmpty() {

  return (
      <section className={styles.cart_empty}>
        <p>Пока тут ничего нет... Давайте начнем поиск с одной из этих страниц:</p>

        <div className={styles.links}>
          <Link href='/sumki'><a className={`link ${styles.link_error}`}>Сумки</a></Link>
          <Link href='/remni'><a className={`link ${styles.link_error}`}>Ремни</a></Link>
          <Link href='/dostavka'><a className={`link ${styles.link_error}`}>Доставка и оплата</a></Link>
          <Link href='/about'><a className={`link ${styles.link_error}`}>О бренде</a></Link>
          <Link href='/lookbook'><a className={`link ${styles.link_error}`}>LookBook</a></Link>
        </div>

      </section>
   
  );
}

export default CartEmpty;
