import './Lookbook_slider.css';
import test from '../../images/test.jpg';
import Swiper from '../Swiper/Swiper';


function Lookbook_slider({slidesPerView, className}) {
  return (
      <section className="goods_slider">
        <div className="goods_slider__head">
          <h3 className="goods_slider__name">LOOKBOOK</h3>
          <a className="button goods_slider__button" href='#'>СМОТРЕТЬ ВСЕ</a>
          
        </div>
        <Swiper slidesPerView={slidesPerView}  className={className}>
          <div className="goods_slider__slide">
            
            <div className="goods_slider__info">
                <img className="lookbook_slider__img" src={test} alt="Leton" />
             
            </div>
          </div>
              
        </Swiper>

        
        
      </section>
   
  );
}

export default Lookbook_slider;
