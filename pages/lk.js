import Login from '../components/Login'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Cabinet from '../components/Cabinet';
import Zakaz from '../components/Zakaz';


export default function Lk() {
  // const isLoggedIn = false;
  const router = useRouter();

  // useEffect(() => {
  //   !isLoggedIn && router.push("/auth/login")
  // }, [])

  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Cabinet />
    </>
  )
}
