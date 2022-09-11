import styles from '../../styles/Lk/Lk.module.css'
import Meta from '../../components/Meta'
import { useRouter } from 'next/router'
import { checkAuth } from '../api/middlewares/checkAuth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUser, removeUser, syncUserCartAndLikes } from '../../redux/slices/userSlice';
import { addToCart, removeFromCart } from '../../redux/slices/userSlice';
import { setLike, removeLike } from '../../redux/slices/userSlice';
import Liked from '../../components/lk/Liked';
import Zakazy from '../../components/lk/Zakazy';
import Me from '../../components/lk/Me';
import axios from 'axios';
import ButtonUnFilled from '../../components/UI/Buttons/ButtonUnFilled';

import { updateUserInfo } from '../../redux/slices/userSlice'


export default function Lk(props) {
  const user = useSelector((state) => state.user);
  const likedGoods = useSelector((state) => state.user.userInfo.likes);
  const userOrders = props.userOrders;
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if(props.user && !user.loggedIn){
      dispatch(setUser(props.user))
    } else if (!props.user && user.loggedIn){
      dispatch(removeUser())
    }
  }, []);



  const updateUser = (data) => {
    dispatch(updateUserInfo(data))
  }

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

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(removeUser());
    const logout = await axios.get('/api/routes/users/logout');
    router.push('/')
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
            <ButtonUnFilled disabled='false' text='выйти' font='fz12' padd='p1015' onClick={(e)=>handleLogout(e)} />
            {props.user.role === 'admin' && <ButtonUnFilled disabled='false' text='в админку' font='fz12' padd='p1015' onClick={()=>router.push('/admin')} />}
          </div> 


          
          
        </div>

          {asPath === '/lk#favorites' && <Liked goods={likedGoods} handleAdd={handleAdd} handleRemove={handleRemove} handleSetLike={handleSetLike} handleRemoveLike={handleRemoveLike} /> }
          {asPath === '/lk#zakazy' && <Zakazy orders={userOrders} /> }
          {((asPath === '/lk#me') || (asPath === '/lk')) && <Me pending={user.pending} user={user.userInfo} updateUser={updateUser} /> }
       
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const user = await checkAuth(context.req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      }
    }
  }

  const orders = await axios.get(`http://localhost:3000/api/routes/orders/${user._id.toString()}`);

  return {
    props: { userOrders: orders.data.data, user: JSON.parse(JSON.stringify(user)) }
  }
}