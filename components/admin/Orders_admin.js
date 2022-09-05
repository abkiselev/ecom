import styles from '../../styles/Orders_admin.module.css'
import { useState, useEffect } from 'react';
import Search from '../UI/Inputs/Search';
import axios from 'axios';
import Loader from '../Loader';
import usePagination from "../../hooks/usePagination";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [pages, setPages] = useState({});

  let {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination(pages);

  console.log(totalPages)

  useEffect(() => {
    const filtered = orders 
          .filter((item) => Object.entries(item.owner).some(value => 
            String(value).toLowerCase().includes(searchValue.toLowerCase()))
            || item._id.includes(searchValue.toLowerCase()))   

    setFilteredOrders(filtered.reverse())
    setPages({ contentPerPage: 5, count: filtered.length, })
  }, [searchValue]);

  useEffect(() => {
    renderOrders()
    
  }, []);

  const clearSearch = () => {
    setSearchValue('');
  }

  const renderOrders = async () => {
    const orders = await axios.get('/api/routes/orders');
    const filtered = orders.data.data.slice();
    setOrders(orders.data.data.reverse());
    setFilteredOrders(filtered.reverse());
    setPages({ contentPerPage: 5, count: orders.data.data.length, })
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
        :<ul className={styles.orders_list}>

          {filteredOrders 
          // .filter((item) => Object.entries(item.owner).some(value => 
          //   String(value).toLowerCase().includes(searchValue.toLowerCase()))
          //   || item._id.includes(searchValue.toLowerCase()))         
          .slice(firstContentIndex, lastContentIndex)
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

      <div className="pagination">
        <p className="text">{page}/{totalPages}</p>
        <button onClick={prevPage} className={`page ${page === 1 && "disabled"}`}>&larr;</button>
        <button onClick={() => setPage(1)} className={`page ${page === 1 && "disabled"}`}>1</button>
        {gaps.before ? "..." : null}
        {gaps.paginationGroup.map((el) => (
          <button onClick={() => setPage(el)} key={el} className={`page ${page === el ? "active" : ""}`}>{el}</button>
        ))}
        {gaps.after ? "..." : null}
        <button onClick={() => setPage(totalPages)} className={`page ${page === totalPages && "disabled"}`}>{totalPages}</button>
        <button onClick={nextPage} className={`page ${page === totalPages && "disabled"}`}>&rarr;</button>
      </div>

    </div>
  );
}

export default OrdersAdmin;
