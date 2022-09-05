import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/ConfirmationOrder.module.css'


function ConfirmationOrder({ email }) {

  return (
      <section className={styles.confirmation}>
        <div className={styles.img_ok}>
          <Image src="/images/check_green.svg" width="50" height="50" alt="Логотип"/>
          <h2 className={styles.title}>Заказ оформлен!</h2>
        </div>
          <p>Мы свяжемся с вами для подтверждения.</p>
          <p>Чтобы отслеживать заказ - зарегистрируйтесь с вашей почтой ({email}) &#160;
            <Link href="/register"><a className={styles.link}>здесь</a></Link>
          </p>

      </section>
   
  );
}

export default ConfirmationOrder;
