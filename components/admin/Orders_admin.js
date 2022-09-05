import styles from '../../styles/Orders_admin.module.css'
import { useState, useEffect } from 'react';
import Search from '../UI/Inputs/Search';
import axios from 'axios';
import Loader from '../Loader';
import ReactPaginate from 'react-paginate';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [endOffset, setEndOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const filtered = orders.filter((item) => Object.entries(item.owner).some(value => 
      String(value).toLowerCase().includes(searchValue.toLowerCase()))
      || item._id.includes(searchValue.toLowerCase()))

    setFilteredOrders( filtered )

    setEndOffset(itemOffset + itemsPerPage)
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setFilteredOrders(filteredOrders.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filtered.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, searchValue]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredOrders.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // console.log(totalPages)

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

    // setFilteredOrders(filtered.slice(itemOffset, endOffset));
    setFilteredOrders(filtered.reverse());

    setEndOffset(itemOffset + itemsPerPage)
    setPageCount(Math.ceil(filtered.length / itemsPerPage));
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
          .slice(itemOffset, endOffset)
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

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />


    </div>
  );
}

export default OrdersAdmin;
