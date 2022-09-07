import Meta from '../../components/Meta'
import Register from '../../components/Register';
import { checkAuth } from '../api/middlewares/checkAuth';


export default function Lk() {
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Register />      

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