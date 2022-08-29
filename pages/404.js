import Link from 'next/link'
import Meta from '../components/Meta'
import styles from '../styles/NotFound.module.css'



export default function Error() {
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <section className={styles.cabinet}>
        <h1 className={styles.name}>404 - кажется все потерялось...</h1>
        <p className={styles.text}>Наверняка то, что вы искали находится на одной из этих страниц:</p>

        <div className={styles.links}>
          <Link href='/sumki'><a className={`link ${styles.link_error}`}>Сумки</a></Link>
          <Link href='/remni'><a className={`link ${styles.link_error}`}>Ремни</a></Link>
          <Link href='/dostavka'><a className={`link ${styles.link_error}`}>Доставка и оплата</a></Link>
          <Link href='/about'><a className={`link ${styles.link_error}`}>О бренде</a></Link>
          <Link href='/lookbook'><a className={`link ${styles.link_error}`}>LookBook</a></Link>
        </div>


      </section>
    </>
  )
}
