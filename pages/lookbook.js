import Meta from '../components/Meta'
import { useEffect } from 'react';
import Hleb from '../components/Hleb';
import LookbookList from '../components/LookbookList';
import Zakaz from '../components/Zakaz';
import axios from 'axios';

export default function Lookbook({ lookbook }) {
  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb />

      <LookbookList lookbook={lookbook} />    

      <Zakaz /> 

    </>
  )
}

export async function getServerSideProps() {
  const lookbookResponse = await axios.get(`http://localhost:3000/api/routes/lookbook`);
  const lookbook = lookbookResponse.data.data;

  return { props: { lookbook } }
}