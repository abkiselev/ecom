import styles from '../../styles/Orders_admin.module.css'
import { useState, useEffect } from 'react';
import Search from '../UI/Inputs/Search';
import axios from 'axios';
import Loader from '../Loader';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    renderOrders()
  }, []);

  const clearSearch = () => {
    setSearchValue('');
  }

  const renderOrders = async () => {
    const orders = await axios.get('/api/routes/orders');
    setOrders(orders.data.data.reverse());
  }

  const setTime = (data) => {
    const date = new Date(data);
    return date.toLocaleString();
  }

  const getGoodsNames = (data) => {
    const names = [];
    data.forEach(item => {
      names.push(item.title)
    })
    return names.join(', ');
  }

  return (
    <div className={styles.orders}>

      <div className={styles.filter}>
        <p className={styles.filter_text}>Поиск по номеру заказа или данным заказчика:</p>
        <Search onChange={(e)=>setSearchValue(e.target.value)} onClick={clearSearch} name='search' value={searchValue || ''} placeholder='поиск'/>
      </div>

      {orders.length === 0
        ? <Loader />
        : <ul className={styles.orders_list}>

          {orders 
          .filter((item) => Object.entries(item.owner).some(value => 
            String(value).toLowerCase().includes(searchValue.toLowerCase()))
            || item._id.includes(searchValue.toLowerCase()))         
          .map(ord => (
            
            <li key={ord._id} className={styles.order}>
              <div className={styles.head}>
                <h2 className={styles.title}>{setTime(ord.createdAt)}</h2>
                <p className={styles.title}>{ord._id}</p>
                <p className={styles.title}>{`${ord.owner.surName} ${ord.owner.firstName} ${ord.owner.secondName}`}</p>
              </div>
              <div className={styles.info}>
                <h2 className={styles.title}>{getGoodsNames(ord.goods)}</h2>
                <p className={styles.title}>{`${ord.total} руб.`}</p>
                <p className={styles.title}>{`${ord.owner.tel} ${ord.owner.email}`}</p>
              </div>
            </li>
          
          ))}

        </ul>
      }

    </div>
  );
}

export default OrdersAdmin;
