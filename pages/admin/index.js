import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import Meta from '../../components/Meta'
import { useState } from 'react';
import MiniCard from '../../components/MiniCard';
import Fancybox from '../../components/Fancybox';


export default function Admin() {
  const [isActive, setIsActive] = useState('lookbook');
  const [files, setFiles] = useState([]);

  const handleLoad = (e) => {
    let files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      console.log(files[i])
      // formData.append(files[i].name, files[i])
      formData.append("theFiles", files[i])
    }
    
    setFiles(formData)
    console.log(formData.getAll("theFiles"))

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };

    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: files,
      config,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    
    // console.log(files)
  }

  return (
    <>
      <Meta
        title="Интернет-магазин кожаных сумок и ремней"
        description="Интернет-магазин кожаных сумок и ремней ручной работы с доставкой по всей России"
        keywords="кожаные сумки, ремни для сумок, сумки из кожи"
      />

      <section className={styles.admin}>

          <h1 className={styles.name}>АДМИНКА</h1>

          <div className={styles.tabs}>
            <button className={`${styles.tab} ${isActive === 'lookbook' && styles.tab_active}`} onClick={() => setIsActive('lookbook')}>Lookbook</button>
            <button className={`${styles.tab} ${isActive === 'goods' && styles.tab_active}`} onClick={() => setIsActive('goods')}>Товары</button>
            <button className={`${styles.tab} ${isActive === 'orders' && styles.tab_active}`} onClick={() => setIsActive('orders')}>Заказы</button>
          </div> 

          <ul className={`${styles.productList} ${isActive === 'goods' && styles.content_active}`}>
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
            <li className={styles.product}>
              <MiniCard />
            </li>
          </ul>


          <ul className={`${styles.zakazList} ${isActive === 'lookbook' && styles.content_active}`}>

          <form className={styles.addfoto} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="file" onChange={handleLoad} multiple/>
            <select type="text" placeholder='Категория'>
              <option value="sumki">Сумки</option>
              <option value="remni">Ремни</option>
            </select>
            <button className={styles.button_add}>Добавить фото</button>
          </form>

          <ul className={styles.imageList}>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
              <button className={styles.button_delete}>х</button>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
              <button className={styles.button_delete}>х</button>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
              <button className={styles.button_delete}>х</button>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
              <button className={styles.button_delete}>х</button>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
              <button className={styles.button_delete}>х</button>
            </li>
            <li className={styles.image}>
              <Image data-fancybox="gallery" className={styles.img} src="/images/test.jpg" width="1000" height="800" alt="Логотип"/>
              <button className={styles.button_delete}>х</button>
            </li>
          </ul>
            
          </ul>


          <ul className={`${styles.infoList} ${isActive === 'orders' && styles.content_active}`}>
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
       
      </section>
   

    </>
  )
}
