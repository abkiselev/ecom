import Login from '../../components/Login'
import Meta from '../../components/Meta'
import { checkAuth } from '../api/middlewares/checkAuth';
import { useEffect, useState } from 'react';
import { setUser, removeUser } from '../../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux'


export default function Log(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.user && !user.loggedIn){
      dispatch(setUser(props.user))
    } else if (!props.user && user.loggedIn){
      dispatch(removeUser())
    }
  }, []);

  return (
    <>
      <Meta
        title="Войти в личный кабинет"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Login />      

    </>
  )
}


export async function getServerSideProps(context) {
  const user = await checkAuth(context.req)

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/lk'
      }
    }
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  }
}