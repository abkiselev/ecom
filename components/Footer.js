import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { openPopup } from '../redux/slices/popupsSlice';

function Footer() {
  const isOpen = useSelector((state) => state.popups.zakazPopup)
  const dispatch = useDispatch()

  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(openPopup("writeUsPopup"))
  }

    return (
        <section className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.main}>
                <Link href='/'>
                    <a><Image className={`logo ${styles.logo_footer}`} src="/images/logo_black.svg" width="85" height="30" alt="Логотип"/></a> 
                </Link>
              <p className={styles.text}>Авторские сумки и ремни для сумок </p>
            </div>
            
            <div className={styles.column}>
              <h3 className={styles.column_head}>КАТЕГОРИИ</h3>
              <Link href='/sumki'><a className="link">Сумки</a></Link>
              <Link href='/remni'><a className="link">Ремни</a></Link>
              <Link href='/lookbook'><a className="link">LookBook</a></Link>
            </div>
  
            {/* <div className={styles.column}>
              <h3 className={styles.column_head}>СЕРВИС</h3>
              <Link href='/dostavka'><a className="link">Доставка и оплата</a></Link>
              <Link href='/about'><a className="link">О бренде</a></Link>
              <Link href='/lookbook'><a className="link">LookBook</a></Link>
            </div> */}
  
            <div className={styles.column}>
              <h3 className={styles.column_head}>КОНТАКТЫ</h3>
              <Link href='tel:88000000000'><a className="link">8 800 000 0000</a></Link>
              <Link href='/contacts'><a className="link">Адрес</a></Link>
              <Link href='/opt'><a className="link" onClick={handleClick}>Написать мне</a></Link>
              
            
            <nav className={styles.icons}>
              <ul className={styles.icons__links}>
                <li>
                  <Link href='#'>
                    <a><Image className={styles.icon} src="/images/vk.svg" width="25" height="25" alt="Вконтакте"/></a>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <a><Image className={styles.icon} src="/images/whatsapp.svg" width="25" height="25" alt="WhatsApp"/></a>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <a><Image className={styles.icon} src="/images/viber.svg" width="25" height="25" alt="Viber"/></a>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <a><Image className={styles.icon} src="/images/telegram.svg" width="25" height="25" alt="Telegram"/></a>
                  </Link>
                </li>
              </ul>
            </nav>
  
          </div>
  
          </div>
        </section>
     
    );
  }
  
  export default Footer;
  