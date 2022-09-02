import Image from 'next/image'
import Meta from '../../components/Meta'
import MainSlider from '../../components/MainSlider'
import GoodsSlider from '../../components/GoodsSlider'
import Zakaz from '../../components/Zakaz'
import ProductsList from '../../components/ProductsList'
import Hleb from '../../components/Hleb'
import axios from 'axios';


export default function Category({ goods, colors }) {
  
  return (
    <>
      <Meta
        title="Кожаные сумки ручной работы из итальянской кожи"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <ProductsList goods={goods} colors={colors} />

      <Zakaz />

    </>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const response = await axios.get(`http://localhost:3000/api/routes/goods`);
  const goods = response.data.data.filter(item => item.category.link === category);

  const colors = [];

  goods.forEach(el => {
    !colors.includes(el.color) && colors.push(el.color)
  });

  
  if (!goods) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  return { props: { goods, colors } }
}
