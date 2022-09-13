import { Navigation, Thumbs  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from "react";
import Image from 'next/image'
import Button from './UI/Buttons/Button';
import styles from '../styles/Product.module.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Fancybox from './Fancybox';
import ButtonUnFilled from './UI/Buttons/ButtonUnFilled';
import { useSelector } from 'react-redux'


function Product({ good, handleAdd, handleRemove, handleSetLike, handleRemoveLike }) {
  const isAdded = useSelector((state) => state.user.userInfo.cart.some(item => item._id === good._id));
  const isLiked = useSelector((state) => state.user.userInfo.likes.some(item => item._id === good._id));
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  console.log(good)

  return (
      <section className={styles.good}>

        <div className={styles.imgs}>
          <Fancybox>

            <Swiper
              spaceBetween={10}
              modules={[Thumbs, Navigation]}
              navigation
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-navigation-size": "20px",
                "--swiper-pagination-color": "#fff",
              }}
            >

              {good.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image data-fancybox="gallery" className={styles.img} src={`/images/uploads/${img}`} width="1000" height="800" alt={img} />
                </SwiperSlide>
              ))}

            </Swiper>

          </Fancybox>

          <Swiper
            slidesPerView={good.images.length}
            spaceBetween={20}
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
          >

            {good.images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image className={styles.img} src={`/images/uploads/${img}`} width="80" height="70" alt={img} />
              </SwiperSlide>
            ))}
            
          </Swiper>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{good.title.toUpperCase()}</h1>
          <p className={styles.desc}>{good.text}</p>
          <div className={styles.spec}>
            <p className={styles.specItem}><strong>Артикул: </strong>{good._id}</p>
            <p className={styles.specItem}><strong>Цвет: </strong>{good.color}</p>
            <p className={styles.specItem}><strong>Размеры: </strong>{`в: ${good.visota}, ш: ${good.shirina}, г: ${good.glubina}`}</p>
          </div>

          <h2 className={styles.price}>{`${good.price.toLocaleString()} р.`}</h2>

          <div className={styles.actions}>
            {isAdded 
            ? <ButtonUnFilled text="УБРАТЬ ИЗ КОРЗИНЫ" font="fz14" padd="p1475" disabled={true} onClick={()=>handleRemove(good)}/>
            : <Button text="В КОРЗИНУ" font="fz14" padd="p1475" disabled={true} onClick={()=>handleAdd(good)}/>
            }
            
            {isLiked 
              ? <button className={styles.unlikeButton} onClick={()=>handleRemoveLike(good)}></button>
              : <button className={styles.likeButton} onClick={()=>handleSetLike(good)}></button>
            }

          </div>
        </div>
        
      </section>
   
  );
}

export default Product;
