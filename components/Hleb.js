import Link from 'next/link';
import styles from '../styles/Hleb.module.css'


function Hleb(props) {
  return (
      <div className={styles.wrapper}>
        <Link href="/"><a className={`link ${styles.link}`}>Главная</a></Link>
        {props.category && 
          <span className={styles.comma}>
            / <Link href={`/${props.category}`}>
                <a className={`link ${styles.link}`}>{props.category === 'sumki' ? 'Сумки' : 'Ремни'}</a>
              </Link> /
          </span>
        }
        {props.good && 
          <span className={styles.current}>{props.good.toUpperCase()}</span>
        }
      </div>
   
  );
}

export default Hleb;
