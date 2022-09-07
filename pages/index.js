import Meta from '../components/Meta'
import MainSlider from '../components/MainSlider'
import GoodsSlider from '../components/GoodsSlider'
import LookbookSlider from '../components/LookbookSlider'
import Zakaz from '../components/Zakaz'
import Popup from '../components/Popup'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { setLike, removeLike } from '../redux/slices/likeSlice';
import axios from 'axios';
import { checkAuth } from './api/middlewares/checkAuth';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice';
import { useEffect } from 'react';


export default function Home({ goods, lookbook, userProps }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(userProps && !user.loggedIn){
      dispatch(setUser(userProps))
    }
  }, []);
 
  const handleAdd = (good) => {
    dispatch(addToCart(good))
  }

  const handleRemove = (good) => {
    dispatch(removeFromCart(good))
  }

  const handleSetLike = (good) => {
    dispatch(setLike(good))
  }

  const handleRemoveLike = (good) => {
    dispatch(removeLike(good))
  }
  
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <MainSlider slidesPerView='1' auto={true} />
      <GoodsSlider goods={goods} handleAdd={handleAdd} handleRemove={handleRemove} handleSetLike={handleSetLike} handleRemoveLike={handleRemoveLike} title="НОВИНКИ" slidesPerView='4.7' className="swiper_overflow"/>
      <LookbookSlider lookbook={lookbook} slidesPerView='3.2' className="swiper_overflow" />
      <Zakaz />

      <Popup />

    </>
  )
}

export async function getServerSideProps(context) {
  const goodsResponse = await axios.get(`http://localhost:3000/api/routes/goods`);
  const goods = goodsResponse.data.data;
  
  const lookbookResponse = await axios.get(`http://localhost:3000/api/routes/lookbook`);
  const lookbook = lookbookResponse.data.data;

  const user = await checkAuth(context.req);

  return { props: { goods, lookbook, userProps: JSON.parse(JSON.stringify(user)) } }
}
