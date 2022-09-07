import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const totalInCart = useSelector((state) => state.cart.quantity)
    const totalLikes = useSelector((state) => state.likes.quantity)
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
                    <Link href='/lk#favorites'>
                        <a><Image src="/images/heart.svg" width="22" height="25" alt="ЛК"/></a>
                    </Link>
                    {totalLikes && <span className={styles.counter}>{totalLikes}</span>}
                </li>
                <li className={styles.icon}>
                    <Link href='/cart'>
                        <a><Image src="/images/cart.svg" width="25" height="25" alt="Корзина"/></a>
                    </Link>
                    {totalInCart && <span className={styles.counter}>{totalInCart}</span>}                    
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
