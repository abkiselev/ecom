import styles from '../../styles/Orders_admin.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Fancybox from '../Fancybox';
import Select from '../UI/Inputs/Select';
import axios from 'axios';
import MiniCard from '../MiniCard';

const OrdersAdmin = () => {

    return (
      <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>ФИО</h3>
              <p className={styles.subtitle}>ФИОФИО ФИОФИОФИО ФИОФИО</p>
            </li>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>E-mail</h3>
              <p className={styles.subtitle}>ФИОФИО ФИОФИОФИО ФИОФИО</p>
            </li>
            <li className={styles.infoItem}>
              <button className={styles.button}>Изменить</button>
            </li>
          </ul>
    );
}

export default OrdersAdmin;
