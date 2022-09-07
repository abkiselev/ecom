import Login from '../components/Login'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'
import Cabinet from '../components/Cabinet';
import { checkAuth } from './api/middlewares/checkAuth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice';


export default function Lk(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.user && !user.loggedIn){
      dispatch(setUser(props.user))
    }
  }, []);


  const router = useRouter();

  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Cabinet user={user} />
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