import Image from 'next/image'
import Meta from '../../components/Meta'
import Zakaz from '../../components/Zakaz'
import ProductsList from '../../components/ProductsList'
import Hleb from '../../components/Hleb'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { setLike, removeLike } from '../../redux/slices/likeSlice';
import { checkAuth } from '../api/middlewares/checkAuth';
import { setUser } from '../../redux/slices/userSlice';


export default function Category({ category, goods, colors, userProps }) {
  const [mainGoods, setMainGoods] = useState(goods);
  const [mainCategory, setMainCategory] = useState(category);
  const [filterValues, setFilterValues] = useState({});
  const [sortValue, setSortValue] = useState('popular');
  const filters = useRef();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    setMainCategory(category)
    setMainGoods(goods)
    setFilterValues({})
    setSortValue('popular')
    filters.current.reset()
  }, [category, goods]);

  useEffect(() => {
    if (sortValue === 'cheap'){
      setMainGoods(prev => [...prev].sort((a, b,) => a.price - b.price))
    } else if (sortValue === 'expencive'){
      setMainGoods(prev => [...prev].sort((a, b,) => b.price - a.price))
    } else {
      setMainGoods(goods)
    }
  }, [sortValue, goods]);

  
  return (
    <>
      <Meta
        title="Кожаные сумки ручной работы из итальянской кожи"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb category={category} />

      <ProductsList
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleSetLike={handleSetLike}
        handleRemoveLike={handleRemoveLike}
        category={mainCategory === 'sumki' ? 'СУМКИ' : 'РЕМНИ'}
        mainGoods={mainGoods}
        colors={colors}
        filters={filters}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />

      <Zakaz />

    </>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const response = await axios.get(`http://localhost:3000/api/routes/goods`);
  const goods = response.data.data.filter(item => item.category.link === category);

  if (goods.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/error'
      }
    }
  }

  const colors = [];

  goods.forEach(el => {
    !colors.includes(el.color) && colors.push(el.color)
  });

  const user = await checkAuth(context.req);

  return { props: { category, goods, colors, userProps: JSON.parse(JSON.stringify(user)) } }
}
