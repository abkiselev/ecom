import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useState } from 'react'

const Navbar = () => {
    const [isMenuChecked, setIsMenuChecked] = useState(false);

    return (
        <header className={styles.navbar}>
            <div className={styles.wrapper}>
          <Link href='/'>
            <a className={styles.logo_navbar}><Image src="/images/logo_black.svg" width="85" height="30" alt="Логотип"/></a>
          </Link>

          <nav>
            <ul className={`${styles.links} ${isMenuChecked ? styles.nav_place_header_active : ''}`}>
                <li className={`${styles.link} link`}>
                    <Link href='/sumki'>Сумки</Link>
                </li>
                <li className={`${styles.link} link`}>
                    <Link href='/remni'>Ремни</Link>
                </li>
                <li className={`${styles.link} link`}>
                    <Link href='/poshiv'>Пошив на заказ</Link>
                </li>
                <li className={`${styles.link} link`}>
                    <Link href='/opt'>Опт</Link>
                </li>
                <li className={`${styles.link} link`}>
                    <Link href='/contact'>Контакты</Link>
                </li>
            </ul>
          </nav>

          <nav>
            <ul className={styles.icons}>
                <li className={styles.icon}>
                    <Link href='/lk'>
                        <a><Image src="/images/lk.svg" width="25" height="25" alt="Логотип"/></a>
                    </Link>
                </li>
                <li className={styles.icon}>
                    <Link href='/cart'>
                        <a><Image src="/images/cart.svg" width="25" height="25" alt="Логотип"/></a>
                    </Link>
                    <span className={styles.counter}>2</span>
                </li>                
            </ul>
          </nav>
          
            <div className={styles.hamburger_menu}>
                <input id={styles.menu__toggle} type="checkbox" onChange={() => setIsMenuChecked(!isMenuChecked)}/>
                <label className={styles.menu__btn} htmlFor={styles.menu__toggle}>
                    <span></span>
                </label>
            </div>

  
            </div>
        </header>
     
    );
}



export default Navbar;
