import Image from 'next/image';
import styles from '../styles/LookbookList.module.css';
import Select from './UI/Inputs/Select';
import Fancybox from './Fancybox';


function LookbookList() {
  return (
      <section className={styles.lookbook}>

          <h1 className={styles.name}>LOOKBOOK</h1>

          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
            </div>   

            <div className={styles.sort}>
                <Select name="" id="">
                  <option value="reset">Все категории</option>
                  <option value="reset">Сумки</option>
                  <option value="reset">Ремни</option>
                </Select>     
                <Select name="" id="">
                  <option value="reset">20 на странице</option>
                  <option value="reset">40 на странице</option>
                  <option value="reset">Все</option>
                </Select>     
            </div>

          </div> 

          <ul className={styles.imageList}>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
            </li>
          </ul>

          
        
      </section>
   
  );
}

export default LookbookList;
