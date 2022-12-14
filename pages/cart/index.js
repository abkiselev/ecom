import Meta from '../../components/Meta';
import Hleb from '../../components/Hleb';
import Cart from '../../components/Cart';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, resetCart, setUser, removeUser } from '../../redux/slices/userSlice';
import { useEffect } from 'react';
import { checkAuth } from '../api/middlewares/checkAuth';


export default function Category({ userProps }) {  
  const user = useSelector((state) => state.user);
  const goodsInCart = useSelector((state) => state.user.userInfo.cart);
  const totalGoodsCost = useSelector((state) => state.user.totalSumCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userProps && !user.loggedIn){
      dispatch(setUser(userProps))
    } else if (!userProps && user?.loggedIn){
      dispatch(removeUser())
    }
  }, []);

  const handleRemove = (good) => {
    dispatch(removeFromCart({ userId: user?._id || false, good }))
  }

  const clearCart = (id, goods) => {
    dispatch(resetCart({ userId: id || false, goods }))
  }

  return (
    <>
      <Meta
        title="Корзина"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb category='cart' />

      <Cart removeFromCart={handleRemove} clearCart={clearCart} user={user} goodsInCart={goodsInCart} totalGoodsCost={totalGoodsCost} />
    </>
  )
}

export async function getServerSideProps(context) {
  const user = await checkAuth(context.req);

  return { props: { userProps: JSON.parse(JSON.stringify(user)) } }
}
