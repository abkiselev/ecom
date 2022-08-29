import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Slider({slidesPerView, className, children}) {
  return (
    <Swiper
      className={className}
      spaceBetween={30}
      slidesPerView={slidesPerView}
    >

      {children.map(child => (
        <SwiperSlide>{child}</SwiperSlide>

      ))}
      
    </Swiper>
  );
};

export default Slider;