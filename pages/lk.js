import Login from '../components/Login'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'
import Cabinet from '../components/Cabinet';
import { checkAuth } from './api/middlewares/checkAuth';


export default function Lk(props) {
  const router = useRouter();

  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Cabinet user={props.user} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const user = await checkAuth(ctx.req)

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