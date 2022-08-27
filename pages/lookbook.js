import Meta from '../components/Meta'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Hleb from '../components/Hleb';
import LookbookList from '../components/LookbookList';
import Zakaz from '../components/Zakaz';


export default function Lookbook() {
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <LookbookList />    

      <Zakaz /> 

    </>
  )
}
