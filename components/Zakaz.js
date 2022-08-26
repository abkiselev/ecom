import styles from '../styles/Zakaz.module.css'
import Image from 'next/image'
import ButtonArrow from './UI/Buttons/ButtonArrow';

function Zakaz() {
  return (
    <section className={styles.zakaz}>

      <div className={styles.zakaz_container}>
          <Image className={styles.zakaz__img} src="/images/test.jpg" width="1950" height="350" alt="Товар" /> 
          
          <div className={styles.zakaz_descr}>
            <h3 className={styles.zakaz_title}>ИНДИВИДУАЛЬНЫЙ ПОШИВ</h3>
            <p className={styles.zakaz_text}>Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью</p>
            <p className={styles.zakaz_text}>Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью ШьюШью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью Шью</p>
            <ButtonArrow text="ОБСУДИТЬ ИДЕИ" url="/sumki" font="fz12" />  
          </div>
        
      </div>

    </section>
   
  );
}

export default Zakaz;
