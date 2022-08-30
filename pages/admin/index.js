import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import Meta from '../../components/Meta'
import { useState, useEffect } from 'react';
import MiniCard from '../../components/MiniCard';
import Fancybox from '../../components/Fancybox';
import Select from '../../components/UI/Inputs/Select';
import axios from 'axios';


export default function Admin() {
  const [isActive, setIsActive] = useState('lookbook');
  const [isImagesChosen, setisImagesChosen] = useState(false);
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  console.log("isFormValid", isButtonActive)
  console.log("category", category)
  console.log("isImagesChosen", isImagesChosen)
  console.log("data", data)
  console.log("files", files)

  useEffect(() => {
    if(category !== '' && data.length > 0){
      setIsButtonActive(false)
    } else setIsButtonActive(true)
    
  }, [category, data]);

  function transliterate(word) {
    const keys = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y',
      'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
      'щ': 'shch', 'ы': 'y', 'ъ': 'y', 'ь': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    }
    return word.split("").map((char) => keys[char] || char).join("");
  }

  const handlenChange = (e) => {
    if(e.target.value === 'none'){
      setCategory('');
      setisImagesChosen(false);
    } else {       
        setCategory(e.target.value);
        setisImagesChosen(true);
    }
  }

  const handleLoad = (e) => {
    let files = e.target.files;
    const formData = new FormData();
    const currentData = [];

    for (let i = 0; i < files.length; i++) {
      const nameTranslated = transliterate(files[i].name.toLowerCase());
      currentData.push({ link: nameTranslated, category });
      formData.append("theFiles", files[i], nameTranslated);
    }
    
    setFiles(formData)
    setData(currentData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };

    const responseUpload = await axios.post('/api/routes/upload', files, config);
    const responseDatabase = await axios.post('/api/routes/lookbook', data, config);

    console.log('responseUpload', response.data);
    console.log('responseDatabase', response.data);

    setIsLoading(false);
    setisImagesChosen(false);
    setCategory('');
    setFiles([])
    setData([])
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
            <button className={`${styles.tab} ${isActive === 'users' && styles.tab_active}`} onClick={() => setIsActive('users')}>Пользователи</button>
          </div> 

          <ul className={`${styles.productList} ${isActive === 'goods' && styles.content_active}`}>
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


          <ul className={`${styles.zakazList} ${isActive === 'lookbook' && styles.content_active}`}>

            <form className={styles.addfoto} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>

              <div className={styles.select}>
                <Select onChange={handlenChange} value={category} name="category" id="category" required='true'>
                  <option value="none">категория</option>
                  <option value="sumki">Сумки</option>
                  <option value="remni">Ремни</option>
                </Select>
              </div>

              <input type="file" onChange={handleLoad} multiple disabled={!isImagesChosen}/>

              <button type='submit' disabled={isButtonActive} className={styles.button_add}>{isLoading ? "Загрузка..." : "Добавить фото"}</button>
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

          <ul className={`${styles.infoList} ${isActive === 'users' && styles.content_active}`}>
            <li className={styles.infoItem}>
              <h3 className={styles.title}>ФИОцц</h3>
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
