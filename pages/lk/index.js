import styles from '../../styles/Lk/Lk.module.css'
import Meta from '../../components/Meta'
import { useRouter } from 'next/router'
import { checkAuth } from '../api/middlewares/checkAuth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';
import { setLike, removeLike } from '../../redux/slices/likeSlice';
import Liked from '../../components/lk/Liked';
import Zakazy from '../../components/lk/Zakazy';
import Me from '../../components/lk/Me';


export default function Lk(props) {
  const user = useSelector((state) => state.user);
  const likedGoods = useSelector((state) => state.likes.likes);
  const [userOrders, setUserOrders] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if(props.user && !user.loggedIn){
      dispatch(setUser(props.user))
    }
  }, []);

  const updateUser = (data) => {
    dispatch(setUser(data))
  }

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
        title="Личный кабинет"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <section className={styles.lk}>

        <div className={styles.header}>

          <h1 className={styles.name}>ЛИЧНЫЙ КАБИНЕТ</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${asPath === '/lk#favorites' && styles.tab_active}`} onClick={() => router.push('/lk#favorites')}>Избранное</button>
            <button className={`${styles.tab} ${asPath === '/lk#zakazy' && styles.tab_active}`} onClick={() => router.push('/lk#zakazy')}>Заказы</button>
            <button className={`${styles.tab} ${((asPath === '/lk#me') || (asPath === '/lk')) && styles.tab_active}`} onClick={() => router.push('/lk#me')}>Личные данные</button>
          </div> 

        </div>

          {asPath === '/lk#favorites' && <Liked goods={likedGoods} handleAdd={handleAdd} handleRemove={handleRemove} handleSetLike={handleSetLike} handleRemoveLike={handleRemoveLike} /> }
          {asPath === '/lk#zakazy' && <Zakazy goods={userOrders} setUserOrders={setUserOrders} /> }
          {((asPath === '/lk#me') || (asPath === '/lk')) && <Me user={user.userInfo} updateUser={updateUser} /> }
       
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const user = await checkAuth(context.req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      }
    }
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}