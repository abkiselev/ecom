import Image from 'next/image'
import Meta from '../../components/Meta'
import Hleb from '../../components/Hleb'
import Cart from '../../components/Cart'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, resetCart } from '../../redux/slices/cartSlice'



export default function Category() {  
  const user = useSelector((state) => state.user.userInfo);
  const goodsInCart = useSelector((state) => state.cart.goods);
  const totalGoodsCost = useSelector((state) => state.cart.totalSum);
  const dispatch = useDispatch();

  // console.log(user)
  // console.log(goodsInCart)

  const handleRemove = (good) => {
    dispatch(removeFromCart(good))
  }

  const clearCart = () => {
    dispatch(resetCart())
  }

  return (
    <>
      <Meta
        title="Корзина"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <Cart removeFromCart={handleRemove} clearCart={clearCart} user={user} goodsInCart={goodsInCart} totalGoodsCost={totalGoodsCost} />
    </>
  )
}
