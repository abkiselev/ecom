import Image from 'next/image'
import Meta from '../../components/Meta'
import MainSlider from '../../components/MainSlider'
import GoodsSlider from '../../components/GoodsSlider'
import Zakaz from '../../components/Zakaz'
import ProductsList from '../../components/ProductsList'
import Hleb from '../../components/Hleb'


export default function Category() {
  return (
    <>
      <Meta
        title="Кожаные сумки ручной работы из итальянской кожи"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <ProductsList />

      <Zakaz />

    </>
  )
}
