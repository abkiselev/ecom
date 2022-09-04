import Image from 'next/image'
import Meta from '../../../components/Meta'
import MainSlider from '../../../components/MainSlider'
import GoodsSlider from '../../../components/GoodsSlider'
import Zakaz from '../../../components/Zakaz'
import Product from '../../../components/Product'
import Hleb from '../../../components/Hleb'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../../redux/slices/cartSlice'


export default function ProductPage({ category, good }) {
  const isAdded = useSelector((state) => state.cart.goods.some(item => item._id === good._id));
  const dispatch = useDispatch();

  console.log(isAdded)
  
  const handleAdd = (good) => {
    dispatch(addToCart(good))
  }

  const handleRemove = (good) => {
    dispatch(removeFromCart(good))
  }

  return (
    <>
      <Meta
        title="Кожаные сумки ручной работы из итальянской кожи"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb category={category} good={good.title}/>

      <Product good={good} handleAdd={handleAdd} handleRemove={handleRemove} isAdded={isAdded} />

      {/* <GoodsSlider title="ВАМ ПОНРАВЯТСЯ" slidesPerView='4.7' className="swiper_overflow"/> */}

      <Zakaz />

    </>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const { slug } = context.params;
  const response = await axios.get(`http://localhost:3000/api/routes/goods`);
  const good = response.data.data.find(item => item.link === slug);
  
  return { props: { category, good } }
}
