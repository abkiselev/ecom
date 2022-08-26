import Link from 'next/link';
import styles from '../styles/Hleb.module.css'


function Hleb() {
  return (
      <div className={styles.wrapper}>
        <Link href="/"><a className={`link ${styles.link}`}>Главная</a></Link>
        <span className={styles.current}>/</span>
        <span className={styles.current}>Сумки</span>
      </div>
   
  );
}

export default Hleb;
