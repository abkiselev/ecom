import Image from 'next/image'
import Meta from '../../../components/Meta'
import MainSlider from '../../../components/MainSlider'
import GoodsSlider from '../../../components/GoodsSlider'
import Zakaz from '../../../components/Zakaz'
import Product from '../../../components/Product'
import Hleb from '../../../components/Hleb'


export default function ProductPage() {
  return (
    <>
      <Meta
        title="Кожаные сумки ручной работы из итальянской кожи"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <Product />

      <GoodsSlider title="ВАМ ПОНРАВЯТСЯ" slidesPerView='4.7' className="swiper_overflow"/>

      <Zakaz />

    </>
  )
}
