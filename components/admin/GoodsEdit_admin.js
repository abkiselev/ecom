import styles from '../../styles/Goods_admin.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Select from '../UI/Inputs/Select';
import Input from '../UI/Inputs/Input';
import axios from 'axios';
import Loader from '../Loader';

const GoodsEdit = (good) => {
  const [goods, setGoods] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsData, setInputsData] = useState({category: '', title: '', color: '', visota: '', shirina: '', glubina: '', price: '', images: []});
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    renderImages()
  }, []);

  useEffect(() => {
    if(!Object.values(inputsData).includes('') && inputsData.images.length > 0){
      setIsButtonDisabled(false)
    } else setIsButtonDisabled(true)
  }, [inputsData]);

  const renderImages = async () => {
    const goods = await axios.get('/api/routes/goods');
    console.log(goods.data.data)
    setGoods(goods.data.data.reverse())
  }
  
  
  const handleInput = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value})
  }

  const transliterate = (word) => {
    const keys = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'ъ': 'y', 'ь': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya', ' ': '_'
    }
    return word.split("").map((char) => keys[char] || char).join("");
  }

  const handleLoad = (e) => {
    let files = e.target.files;
    const formData = new FormData();
    const currentData = {...inputsData};

    for (let i = 0; i < files.length; i++) {
        const nameTranslated = transliterate(files[i].name.toLowerCase());
        currentData.images.push(nameTranslated);
        formData.append("theFiles", files[i], nameTranslated);
    }
    
    setFiles(formData)
    setData(currentData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    // console.log('files', files)
    // console.log('data', data)
    
    const link = transliterate(inputsData.title.toLowerCase());
    const categories = await axios.get('/api/routes/categories');
    const categoryID = categories.data.data.find(cat => cat.link === inputsData.category);
    const outData = { 
      category: categoryID._id, 
      title: inputsData.title, 
      color: inputsData.color, 
      visota: Number(inputsData.visota), 
      shirina: Number(inputsData.shirina), 
      glubina: Number(inputsData.glubina), 
      price: Number(inputsData.price), 
      images: inputsData.images,
      link 
    };

    // console.log('categories', categories)
    // console.log('categoryID', categoryID)
    // console.log('outData', outData)
    // console.log('price', typeof inputsData.price)

    const configFiles = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
            console.log(`Процент загрузки:`, Math.round((event.loaded * 100) / event.total));
        },
    };

    const configData = {
        headers: { 'content-type': 'application/json' },
        onUploadProgress: (event) => {
            console.log(`Процент загрузки:`, Math.round((event.loaded * 100) / event.total));
        },
    };

    const responseUpload = await axios.post('/api/routes/upload', files, configFiles);
    const responseDatabase = await axios.post('/api/routes/goods', outData, configData);

    console.log(responseUpload);
    console.log(responseDatabase);

    setIsLoading(false);
    setFiles([]);
    setData([]);
    setInputsData({category: '', title: '', color: '', visota: '', shirina: '', glubina: '', price: '', images: []});
    e.target.reset();

    renderImages();
  }

  const handleSelect = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value});
    if(data.length > 0){
      setData(data.map(item => ({...item, category: e.target.value})))
    }
  }

  const deleteImg = async (good) => {
    await axios.delete(`/api/routes/goods/${good._id}`);
    renderImages();
  }


  return (
    <>
      <form className={styles.addgood} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
              <p className={styles.addgood_title}>Редактировать товар</p>

              <div className={styles.inputs}>
                <Select onChange={(e) => handleSelect(e)}  value={inputsData.category || ''} name="category" id="category" required='true'>
                  <option value="">категория</option>
                  <option value="sumki">Сумки</option>
                  <option value="remni">Ремни</option>
                </Select>
                <Input onChange={(e) => handleInput(e)} value={inputsData.title || ''} type="text" name='title' placeholder='Название*' required='true' />
                <Input onChange={(e) => handleInput(e)} value={inputsData.color || ''} type="text" name='color' placeholder='Цвет*' required='true' />
                <Input onChange={(e) => handleInput(e)} value={inputsData.visota || ''} type="number" name='visota' placeholder='Высота*' required='true' />
                <Input onChange={(e) => handleInput(e)} value={inputsData.shirina || ''} type="number" name='shirina' placeholder='Ширина*' required='true' />
                <Input onChange={(e) => handleInput(e)} value={inputsData.glubina || ''} type="number" name='glubina' placeholder='Глубина*' required='true' />
                <Input onChange={(e) => handleInput(e)} value={inputsData.price || ''} type="number" name='price' placeholder='Цена*' required='true' />
              </div>

              <div className={styles.actions}>
                <input type="file" onChange={handleLoad} multiple />

                <button type='submit' disabled={isLoading || isButtonDisabled} className={styles.button_add}>{isLoading ? "Загрузка..." : "Обновить"}</button>
              </div>

      </form>

      {/* <div className={styles.filter}>
        <p className={styles.filter_text}>Фильтр по категориям:</p>
        <Select onChange={(e) => setFilterValue(e.target.value)} name="category" id="category" required='true'>
          <option value="">Все</option>
          <option value="sumki">Сумки</option>
          <option value="remni">Ремни</option>
        </Select>
      </div>
            
      <ul className={styles.productList}>

          {goods.length === 0
          ? <Loader />
          : goods.filter(good => good.category.link.startsWith(filterValue)).map(good => (

            <li key={good._id} className={styles.product}>
              <Image className={styles.img} src={`/images/uploads/${good.images[0]}`} width="200" height="150" alt={good.title}/>

              <div className={styles.imgs_mini}>
                {good.images.map(img => (
                  <Image key={img} className={styles.img} src={`/images/uploads/${img}`} width="50" height="50" alt={good.title}/>
                ))}
              </div>

              <h3 className={styles.name}>{good.title}</h3>
              <p className={styles.text}>{`Категория: ${good.category.title}`}</p>
              <p className={styles.text}>{`Цвет: ${good.color}`}</p>
              <p className={styles.text}>{`Размеры: в:${good.visota} ш:${good.shirina} г:${good.glubina}`}</p>
              <p className={styles.text}>{`Артикул: ${good._id}`}</p>
              <p className={styles.text}>{`Цена: ${good.price} р.`}</p>
              <button className={styles.button_delete} onClick={() => deleteImg(good)}>удалить</button>
              <button className={styles.button_edit} onClick={() => deleteImg(good)}>редактировать</button>
            </li>

          ))}
        
          
      </ul> */}
    </>
  );
}

export default GoodsEdit;
