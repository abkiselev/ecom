import styles from '../../styles/Goods_admin.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Fancybox from '../Fancybox';
import Select from '../UI/Inputs/Select';
import axios from 'axios';
import MiniCard from '../../components/MiniCard';

const GoodsAdmin = () => {

    return (
      <ul className={styles.productList}>
        <li className={styles.product}>
          <div>

          </div>
        </li>
        <li className={styles.product}>
          <MiniCard />
        </li>
        <li className={styles.product}>
          <MiniCard />
        </li>
        <li className={styles.product}>
          <MiniCard />
        </li>
        <li className={styles.product}>
          <MiniCard />
        </li>
    </ul>
    );
}

export default GoodsAdmin;
