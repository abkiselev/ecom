import Image from 'next/image'
import Meta from '../components/Meta'
import MainSlider from '../components/MainSlider'
import GoodsSlider from '../components/GoodsSlider'
import LookbookSlider from '../components/LookbookSlider'
import Zakaz from '../components/Zakaz'
import Popup from '../components/Popup'
import axios from 'axios';


export default function Home({ goods, lookbook }) {
  
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <MainSlider slidesPerView='1' auto={true} />
      <GoodsSlider goods={goods} title="НОВИНКИ" slidesPerView='4.7' className="swiper_overflow"/>
      <LookbookSlider lookbook={lookbook} slidesPerView='3.2' className="swiper_overflow" />
      <Zakaz />

      <Popup />

    </>
  )
}

export async function getServerSideProps() {
  const goodsResponse = await axios.get(`http://localhost:3000/api/routes/goods`);
  const goods = goodsResponse.data.data;
  
  const lookbookResponse = await axios.get(`http://localhost:3000/api/routes/lookbook`);
  const lookbook = lookbookResponse.data.data;

  return { props: { goods, lookbook } }
}
