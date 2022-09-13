import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/core';
import 'swiper/css';

function Slider({slidesPerView, className, children, auto = false}) {
  const slidesPerView650 = slidesPerView > 1 && slidesPerView - 1;
  const slidesPerView425 = slidesPerView > 1 && slidesPerView - 2;
  const slidesPerView320 = slidesPerView > 1 && slidesPerView - 2.5;

  return (
    <Swiper
      modules={auto && [Autoplay]}
      className={className}
      // spaceBetween={30}
      // slidesPerView={slidesPerView}
      autoplay={{
        "delay": 5000,
        "disableOnInteraction": true
      }}
      breakpoints={{
        320: {
          slidesPerView: `${slidesPerView320.toString()}`,
          spaceBetween: 15,
        },
        425: {
          slidesPerView: `${slidesPerView425.toString()}`,
          spaceBetween: 15,
        },
        650: {
          slidesPerView: `${slidesPerView650.toString()}`,
          spaceBetween: 15,
        },
        770: {
          slidesPerView: `${slidesPerView.toString()}`,
          spaceBetween: 30,
        },
      }}
    >

      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>

      ))}
      
    </Swiper>
  );
};

export default Slider;