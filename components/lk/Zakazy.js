import styles from '../../styles/Lk/Zakazy.module.css'
import Image from 'next/image'
import { convertDate } from '../../utils/convertDate';

function Zakazy({ orders }) {  
  return (
    <>
      {(orders.length === 0)
        ? <p>Вы пока ничего не заказывали</p>
        : <ul className={styles.ordersList}>
            
              {orders.map(order => (
                  <li key={order._id} className={styles.order}>
                    <div className={styles.heading}>
                      <h3 className={styles.title}>{convertDate(order.createdAt)}</h3>
                      <p className={styles.number}>{`Номер ${order._id}`}</p>
                    </div>

                        {order.goods.map(good => (
                        <div key={good._id} className={styles.good}>
                          <Image src={`/images/uploads/${good.images[0]}`} width='50' height='50' alt={good.images[0]} />
                            <p>{good.title}</p>
                            <p>{`${good.price} р.`}</p>
                        </div>
                        ))}

                    <p className={styles.total}>{`Итого: ${order.total} р.`}</p>

                  </li>
              ))}
              
          </ul>
        }
    </>
  );
}


export default Zakazy;
