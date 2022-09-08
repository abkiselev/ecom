import Meta from '../components/Meta'
import Hleb from '../components/Hleb';
import LookbookList from '../components/LookbookList';
import Zakaz from '../components/Zakaz';
import axios from 'axios';
import { checkAuth } from './api/middlewares/checkAuth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice';

export default function Lookbook({ lookbook, userProps }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userProps && !user.loggedIn){
      dispatch(setUser(userProps))
    } else if (!userProps && user.loggedIn){
      dispatch(removeUser())
    }
  }, []);

  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <Hleb category='lookbook' />

      <LookbookList lookbook={lookbook} />    

      <Zakaz /> 

    </>
  )
}

export async function getServerSideProps(context) {
  const lookbookResponse = await axios.get(`http://localhost:3000/api/routes/lookbook`);
  const lookbook = lookbookResponse.data.data;

  const user = await checkAuth(context.req);

  return { props: { lookbook, userProps: JSON.parse(JSON.stringify(user)) } }
}
