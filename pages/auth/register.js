import Meta from '../../components/Meta'
import Register from '../../components/Register';


export default function Lk() {
  const isLoggedIn = false;
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
