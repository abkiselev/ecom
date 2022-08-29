import styles from '../styles/Zakaz.module.css'
import Image from 'next/image'
import ButtonArrow from './UI/Buttons/ButtonArrow';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { openPopup } from '../redux/popupsSlice'

function Zakaz() {
  const isOpen = useSelector((state) => state.popups.zakazPopup)
  const dispatch = useDispatch()

  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(openPopup("zakazPopup"))
  }

  return (
    <section className={styles.zakaz}>

      <div className={styles.zakaz_container}>
          <Image className={styles.zakaz__img} src="/images/test.jpg" width="1950" height="350" alt="Товар" /> 
          
          <div className={styles.zakaz_descr}>
            <h3 className={styles.zakaz_title}>ИНДИВИДУАЛЬНЫЙ ПОШИВ</h3>
            <p className={styles.zakaz_text}>Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью</p>
            <p className={styles.zakaz_text}>Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью</p>
            <ButtonArrow text="ОБСУДИТЬ ИДЕИ" url="#" font="fz12" onClick={handleClick}/>  
          </div>
        
      </div>

    </section>
   
  );
}

export default Zakaz;
