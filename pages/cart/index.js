import Image from 'next/image'
import Meta from '../../components/Meta'
import Hleb from '../../components/Hleb'
import Cart from '../../components/Cart'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice'



export default function Category() {
  const dispatch = useDispatch();
 
  const handleAdd = (good) => {
    dispatch(addToCart(good))
  }

  const handleRemove = (good) => {
    dispatch(removeFromCart(good))
  }

  return (
    <>
      <Meta
        title="Корзина"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <Cart removeFromCart={handleRemove} />
    </>
  )
}
