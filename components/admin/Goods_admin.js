import styles from '../../styles/Goods_admin.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Select from '../UI/Inputs/Select';
import Input from '../UI/Inputs/Input';
import axios from 'axios';

const GoodsAdmin = () => {
  const [category, setCategory] = useState('none');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleInput = () => {
    
  }
  const handleLoad = () => {
    
  }
  const handleSubmit = () => {
    
  }
  const handleSelect = () => {
    
  }


  return (
    <>
      <form className={styles.addgood} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
              <p className={styles.addgood_title}>Загрузить новый товар</p>

              <div className={styles.inputs}>
                <Select onChange={handleSelect} value={category} name="category" id="category" required='true'>
                  <option value="none">категория</option>
                  <option value="sumki">Сумки</option>
                  <option value="remni">Ремни</option>
                </Select>
                <Input onChange={handleInput} type="text" name='title' placeholder='Название*' required='true' />
                <Input onChange={handleInput} type="text" name='color' placeholder='Цвет*' required='true' />
                <Input onChange={handleInput} type="text" name='size' placeholder='Размеры*' required='true' />
                <Input onChange={handleInput} type="text" name='price' placeholder='Цена*' required='true' />
              </div>

              <div className={styles.actions}>
                <input type="file" onChange={handleLoad} multiple />

                <button type='submit' disabled={isButtonDisabled || isLoading} className={styles.button_add}>{isLoading ? "Загрузка..." : "Добавить"}</button>
              </div>

      </form>

      <div className={styles.filter}>
        <p className={styles.filter_text}>Фильтр по категориям:</p>
        <Select onChange={(e) => setFilterValue(e.target.value)} name="category" id="category" required='true'>
          <option value="">Все</option>
          <option value="sumki">Сумки</option>
          <option value="remni">Ремни</option>
        </Select>
      </div>
            
      <ul className={styles.productList}>
          <li className={styles.product}>
            <Image className={styles.img} src={`/images/test.jpg`} width="400" height="300" alt=''/>
            <div className={styles.imgs_mini}>
              <Image className={styles.img} src={`/images/test.jpg`} width="50" height="50" alt=''/>
              <Image className={styles.img} src={`/images/test.jpg`} width="50" height="50" alt=''/>
              <Image className={styles.img} src={`/images/test.jpg`} width="50" height="50" alt=''/>
              <Image className={styles.img} src={`/images/test.jpg`} width="50" height="50" alt=''/>
              <Image className={styles.img} src={`/images/test.jpg`} width="50" height="50" alt=''/>
            </div>
            <h3 className={styles.name}>Название товара</h3>
            <p className={styles.text}>категория</p>
            <p className={styles.text}>Цвет</p>
            <p className={styles.text}>Размеры</p>
            <p className={styles.text}>Артикул</p>
            <p className={styles.text}>Цена</p>
            <button className={styles.button_delete} onClick={() => deleteImg(img)}>удалить</button>
            <button className={styles.button_edit} onClick={() => deleteImg(img)}>редактировать</button>
          </li>
          
      </ul>
    </>
  );
}

export default GoodsAdmin;
