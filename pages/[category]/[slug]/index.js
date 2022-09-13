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
import { addToCart, removeFromCart } from '../../../redux/slices/userSlice'
import { setLike, removeLike } from '../../../redux/slices/userSlice';
import { checkAuth } from '../../api/middlewares/checkAuth';
import { setUser, removeUser } from '../../../redux/slices/userSlice';


export default function ProductPage({ category, good, goodsToRecommend, userProps }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(userProps && !user.loggedIn){
      dispatch(setUser(userProps))
    } else if (!userProps && user.loggedIn){
      dispatch(removeUser())
    }
  }, []);
 
  const handleAdd = (good) => {
    // dispatch(addToCart(good))
    dispatch(addToCart({ userId: user.userInfo?._id || false, good }))
  }

  const handleRemove = (good) => {
    dispatch(removeFromCart({ userId: user.userInfo?._id || false, good }))
    // dispatch(removeFromCart(good))
  }

  const handleSetLike = (good) => {
    dispatch(setLike({ userId: user.userInfo?._id || false, good }))
  }

  const handleRemoveLike = (good) => {
    dispatch(removeLike({ userId: user.userInfo?._id || false, good }))
  }

  return (
    <>
      <Meta
        title={good.title}
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb category={category} good={good.title}/>

      <Product good={good} handleAdd={handleAdd} handleRemove={handleRemove} handleSetLike={handleSetLike} handleRemoveLike={handleRemoveLike} />

      <GoodsSlider goods={goodsToRecommend} handleAdd={handleAdd} handleRemove={handleRemove} handleSetLike={handleSetLike} handleRemoveLike={handleRemoveLike} title="ВАМ ПОНРАВЯТСЯ" slidesPerView='4.7' className="swiper_overflow"/>

      <Zakaz />

    </>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const { slug } = context.params;
  const response = await axios.get(`${process.env.BASE_URL}/api/routes/goods`);
  const goodsToRecommend = response.data.data.slice(0,10);
  const good = response.data.data.find(item => item.link === slug);

  if (!good) {
    return {
      redirect: {
        permanent: false,
        destination: '/error'
      }
    }
  }

  const user = await checkAuth(context.req);
  
  return { props: { category, good, goodsToRecommend, userProps: JSON.parse(JSON.stringify(user)) } }
}
