import styles from '../styles/MainSlider.module.css'
import Image from 'next/image'
import Slider from './Slider';
import ButtonFilled from './UI/Buttons/ButtonFilled';


function MainSlider({slidesPerView}) {
  return (
      <section className={styles.slider}>
        <Slider slidesPerView={slidesPerView}>
          <div className={styles.slider__slide}>
            <Image className={styles.slider__img} src="/images/test.jpg" width="1240" height="600" alt="Логотип" />
            <div className={styles.slider__headers}>
              <div>
                <h2 className={styles.slider__title}>New collection 2022</h2>
                <p className={styles.slider__subtitle}>На сайте уже доступна новая коллекция!</p>
              </div>
              <ButtonFilled text="Смотреть" url="/sumki" font="fz12" padd="p1235" />
              
            </div>
          </div>
          
          <div className={styles.slider__slide}>
            <Image className={styles.slider__img} src="/images/test.jpg" width="1240" height="600" alt="Логотип" />
            <div className={styles.slider__headers}>
              <div>
                <h2 className={styles.slider__title}>New collection 2022</h2>
                <p className={styles.slider__subtitle}>На сайте уже доступна новая коллекция!</p>
              </div>
              <ButtonFilled text="Смотреть" url="/sumki" font="fz12" padd="p1235" />
              
            </div>
          </div>
              
        </Slider>
        
      </section>
   
  );
}

export default MainSlider;
