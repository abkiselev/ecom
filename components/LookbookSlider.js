import styles from '../styles/LookbookSlider.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import Image from 'next/image'


function LookbookSlider({slidesPerView, className}) {
  return (
      <section className={styles.slider}>
        <div className={styles.head}>
          <h3 className={styles.name}>LOOKBOOK</h3>
          <ButtonArrow text="СМОТРЕТЬ ВСЕ" url="/lookbook" font="fz12" />
        </div>

        <Slider slidesPerView={slidesPerView} className={className}>
          <Image className={styles.img} src="/images/test.jpg" width="400" height="300" alt="Фото" />       
          <Image className={styles.img} src="/images/test.jpg" width="400" height="300" alt="Фото" />       
          <Image className={styles.img} src="/images/test.jpg" width="400" height="300" alt="Фото" />       
          <Image className={styles.img} src="/images/test.jpg" width="400" height="300" alt="Фото" />       
        </Slider>

      </section>
  );
}

export default LookbookSlider;
