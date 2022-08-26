import { Navigation, Pagination, Controller,Thumbs  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Button from './UI/Buttons/Button';
import styles from '../styles/Product.module.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function Product() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
      <section className={styles.good}>

        <div className={styles.imgs}>

        <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} >
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
        </Swiper>

        <Swiper
          slidesPerView='5'
          spaceBetween={20}
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="50" height="50" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="50" height="50" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="50" height="50" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="50" height="50" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="50" height="50" alt="Логотип"/></SwiperSlide>
        </Swiper>
        
          {/* <Swiper
              modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView='1'
                loop
                navigation
                pagination
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-navigation-size": "20px",
                  "--swiper-pagination-color": "#fff",
                }}
              >
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              <SwiperSlide><Image className={styles.img} src="/images/test.jpg" width="500" height="500" alt="Логотип"/></SwiperSlide>
              
          </Swiper> */}
        
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>СУМКА</h1>
          <p className={styles.desc}>описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание </p>
          <div className={styles.spec}>
            <p className={styles.specItem}><strong>Артикул: </strong>35161461346134</p>
            <p className={styles.specItem}><strong>Цвет: </strong>Белый</p>
            <p className={styles.specItem}><strong>Размеры: </strong>в: 23см, ш: 23см, г: 23см</p>
          </div>

          <h2 className={styles.price}>9 990 р.</h2>

          <div className={styles.actions}>
            <Button text="В КОРЗИНУ" url="#" font="fz14" padd="p1475" />
            <button className={styles.likeButton}></button>

          </div>
        </div>
        
      </section>
   
  );
}

export default Product;
