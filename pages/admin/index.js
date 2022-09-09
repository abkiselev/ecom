import styles from '../../styles/Admin.module.css'
import Meta from '../../components/Meta'
import { useState, useEffect } from 'react';
import LookbookAdmin from '../../components/admin/Lookbook_admin';
import GoodsAdmin from '../../components/admin/Goods_admin';
import OrdersAdmin from '../../components/admin/Orders_admin';
import UsersAdmin from '../../components/admin/Users_admin';
import CategoriesAdmin from '../../components/admin/Categories_admin';
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../api/middlewares/checkAuth';
import { setUser, removeUser } from '../../redux/slices/userSlice';
import ButtonUnFilled from '../../components/UI/Buttons/ButtonUnFilled';


export default function Admin(props) {
  const [isActive, setIsActive] = useState('orders');   
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.user && !user.loggedIn){
      dispatch(setUser(props.user))
    } else if (!props.user && user.loggedIn){
      dispatch(removeUser())
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(removeUser());
    const logout = await axios.get('/api/routes/users/logout');
    console.log(logout)
    router.push('/')
  }

  return (
    <>
      <Meta
        title="Админ-панель"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <section className={styles.admin}>

        <div className={styles.header}>

          <h1 className={styles.name}>АДМИНКА</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${isActive === 'lookbook' && styles.tab_active}`} onClick={() => setIsActive('lookbook')}>Lookbook</button>
            <button className={`${styles.tab} ${isActive === 'goods' && styles.tab_active}`} onClick={() => setIsActive('goods')}>Товары</button>
            <button className={`${styles.tab} ${isActive === 'categories' && styles.tab_active}`} onClick={() => setIsActive('categories')}>Категории</button>
            <button className={`${styles.tab} ${isActive === 'orders' && styles.tab_active}`} onClick={() => setIsActive('orders')}>Заказы</button>
            <button className={`${styles.tab} ${isActive === 'users' && styles.tab_active}`} onClick={() => setIsActive('users')}>Пользователи</button>
          <ButtonUnFilled disabled='false' text='выйти' font='fz12' padd='p1015' onClick={(e)=>handleLogout(e)} />
          </div> 


        </div>

          {isActive === 'lookbook' && <LookbookAdmin />}
          {isActive === 'goods' && <GoodsAdmin />}
          {isActive === 'categories' && <CategoriesAdmin />}
          {isActive === 'orders' && <OrdersAdmin />}
          {isActive === 'users' && <UsersAdmin />}
       
      </section>
   

    </>
  )
}


export async function getServerSideProps(context) {
  const user = await checkAuth(context.req);

  if (!user || user.role !== 'admin') {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      }
    }
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) }
  }
}