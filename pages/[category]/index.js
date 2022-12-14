import Meta from '../../components/Meta';
import Zakaz from '../../components/Zakaz';
import ProductsList from '../../components/ProductsList';
import Hleb from '../../components/Hleb';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, setLike, removeLike, setUser, removeUser } from '../../redux/slices/userSlice';
import { checkAuth } from '../api/middlewares/checkAuth';


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
    } else if (!userProps && user.loggedIn){
      dispatch(removeUser())
    }
  }, []);

  const handleAdd = (good) => {
    dispatch(addToCart({ userId: user.userInfo?._id || false, good }))
  }

  const handleRemove = (good) => {
    dispatch(removeFromCart({ userId: user.userInfo?._id || false, good }))
  }

  const handleSetLike = (good) => {
    dispatch(setLike({ userId: user.userInfo?._id || false, good }))
  }

  const handleRemoveLike = (good) => {
    dispatch(removeLike({ userId: user.userInfo?._id || false, good }))
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
        title={`?????????????? ${category === 'sumki' ? '??????????' : '??????????'} ???????????? ???????????? ???? ?????????????????????? ????????`}
        description="????????????????-?????????????? ?????????????? ?????????? ?? ???????????? ???????????? ???????????? ?? ?????????????????? ???? ???????? ????????????"
        keywords="?????????????? ??????????, ?????????? ?????? ??????????, ?????????? ???? ????????"
      />

      <Hleb category={category} />

      <ProductsList
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        handleSetLike={handleSetLike}
        handleRemoveLike={handleRemoveLike}
        category={mainCategory === 'sumki' ? '??????????' : '??????????'}
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
  const response = await axios.get(`${process.env.BASE_URL}/api/routes/goods`);
  const goods = response.data.data.filter(item => item.category.link === category).reverse();

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
