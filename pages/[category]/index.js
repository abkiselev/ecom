import Image from 'next/image'
import Meta from '../../components/Meta'
import MainSlider from '../../components/MainSlider'
import GoodsSlider from '../../components/GoodsSlider'
import Zakaz from '../../components/Zakaz'
import ProductsList from '../../components/ProductsList'
import Hleb from '../../components/Hleb'
import axios from 'axios';


export default function Category({ goods, colors, visota, glubina, shirina, dlina }) {
  
  return (
    <>
      <Meta
        title="Кожаные сумки ручной работы из итальянской кожи"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <ProductsList goods={goods} colors={colors} visota={visota} glubina={glubina} shirina={shirina} dlina={dlina} />
      {/* <ProductsList /> */}

      <Zakaz />

    </>
  )
}

export async function getServerSideProps(context) {
  // console.log(context.params.category)
  const response = await axios.get(`http://localhost:3000/api/routes/goods`);
  const goods = response.data.data.filter(item => item.category.link === context.params.category);

  // .filter(item => item.category.link === context.params.category)
  const colors = []
  const visota = []
  const glubina = []
  const shirina = []
  const dlina = []

  goods.forEach(el => {
    el.color && colors.push(el.color)
    el.visota && visota.push(el.visota)
    el.glubina && glubina.push(el.glubina)
    el.shirina && shirina.push(el.shirina)
    el.dlina && dlina.push(el.dlina)
  });
  
  if (!goods) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }


  return { props: { goods, colors, visota, glubina, shirina, dlina } }
}
