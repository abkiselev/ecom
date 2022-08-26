import styles from '../styles/GoodsSlider.module.css'
import Slider from './Slider';
import ButtonArrow from './UI/Buttons/ButtonArrow';
import MiniCard from './MiniCard';


function GoodsSlider({slidesPerView, className}) {
  return (
      <section className={styles.goods_slider}>

        <div className={styles.head}>
          <h3 className={styles.name}>НОВИНКИ</h3>
          <ButtonArrow text="СМОТРЕТЬ ВСЕ" url="/sumki" font="fz12" />          
        </div>

        <Slider slidesPerView={slidesPerView} className={className}>
          <MiniCard />
        </Slider>
        
      </section>
   
  );
}

export default GoodsSlider;
