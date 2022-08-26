import Image from 'next/image'
import Meta from '../components/Meta'
import MainSlider from '../components/MainSlider'
import GoodsSlider from '../components/GoodsSlider'
import LookbookSlider from '../components/LookbookSlider'
import Zakaz from '../components/Zakaz'


export default function Home() {
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <MainSlider slidesPerView='1'/>
      <GoodsSlider title="НОВИНКИ" slidesPerView='4.7' className="swiper_overflow"/>
      <LookbookSlider slidesPerView='3.2' className="swiper_overflow" />
      <Zakaz />

    </>
  )
}
