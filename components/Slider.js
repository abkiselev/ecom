import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/core';
import 'swiper/css';

function Slider({slidesPerView, className, children, auto = false}) {
  return (
    <Swiper
      modules={auto && [Autoplay]}
      className={className}
      spaceBetween={30}
      slidesPerView={slidesPerView}
      autoplay={{
        "delay": 4000,
        "disableOnInteraction": true
      }}
    >

      {children.map(child => (
        <SwiperSlide>{child}</SwiperSlide>

      ))}
      
    </Swiper>
  );
};

export default Slider;