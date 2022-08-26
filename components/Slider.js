import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Slider({slidesPerView, className, children}) {
  return (
    <Swiper
      className={className}
      spaceBetween={30}
      slidesPerView={slidesPerView}
      
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      
    </Swiper>
  );
};

export default Slider;