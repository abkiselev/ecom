import Image from 'next/image';
import styles from '../styles/LookbookList.module.css';
import Select from './UI/Inputs/Select';
import Fancybox from './Fancybox';
import { useState } from 'react';


function LookbookList({ lookbook }) {
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(20);

  
  return (
      <section className={styles.lookbook}>

          <h1 className={styles.name}>LOOKBOOK</h1>

          <div className={styles.filters_wrapper}>
            <div className={styles.filter}>
                <Select onChange={(e) => setCategory(e.target.value)} value={category} name='category'>
                  <option value="">Все категории</option>
                  <option value="sumki">Сумки</option>
                  <option value="remni">Ремни</option>
                </Select>     
            </div>   

            <div className={styles.sort}>
                <Select onChange={(e) => setQuantity(e.target.value)} value={quantity} name='quantity'>
                  <option value="20">20 на странице</option>
                  <option value="40">40 на странице</option>
                  <option value="60">60 на странице</option>
                </Select>     
            </div>

          </div> 

          <Fancybox >
            <ul className={styles.imageList}>

              {lookbook.slice(0,quantity).filter(item => item.category.startsWith(category)).map(img => (
                <li key={img._id} className={styles.image}>
                  <Image data-fancybox="gallery" className={styles.img} src={`/images/uploads/${img.link}`} width="1000" height="800" alt={img.link}/>
                </li>

              ))}

            </ul>
          </Fancybox>
        
      </section>
   
  );
}

export default LookbookList;
