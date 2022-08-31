import styles from '../../styles/Categories_admin.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Select from '../UI/Inputs/Select';
import Input from '../UI/Inputs/Input';
import axios from 'axios';

const CategoriesAdmin = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsData, setInputsData] = useState({category: '', title: '', color: '', size: '', price: '', images: []});
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);

  // console.log(typeof inputsData.category)
  useEffect(() => {
    if(!Object.values(inputsData).includes('') && data.length > 0){
      setIsButtonDisabled(false)
    } else setIsButtonDisabled(true)
  }, [inputsData, files]);
  
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
        'щ': 'shch', 'ы': 'y', 'ъ': 'y', 'ь': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
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

    console.log('files', files)
    console.log('data', data)
    
    const link = transliterate(inputsData.title.toLowerCase());
    const outData = { ...inputsData, link }
    console.log('outData', outData)

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

    // setIsLoading(false);
    // setFiles([]);
    // setData([]);
    // setInputsData({category: '', title: '', color: '', size: '', price: ''});
    // e.target.reset();

    // renderImages();
  }

  const handleSelect = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value});
    if(data.length > 0){
      setData(data.map(item => ({...item, category: e.target.value})))
    }
  }

  console.log(inputsData)

  return (
    <>
      <form className={styles.addcat} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
              <p className={styles.addcat_title}>Создать категорию</p>
              <Input onChange={(e) => handleInput(e)} value={inputsData.title || ''} type="text" name='title' placeholder='Название*' required='true' />
              <Input onChange={(e) => handleInput(e)} value={inputsData.color || ''} type="text" name='color' placeholder='Ссылка после /*' required='true' />
              <button type='submit' disabled={isLoading} className={styles.button_add}>{isLoading ? "Загрузка..." : "Добавить"}</button>
      </form>
            
      <ul className={styles.categoriestList}>
          <li className={styles.category}>
            <h3 className={styles.name}>Название категории</h3>
            <p className={styles.text}>ссылка</p>
            <button className={styles.button_delete} onClick={() => deleteImg(img)}>удалить</button>
            <button className={styles.button_edit} onClick={() => deleteImg(img)}>редактировать</button>
          </li>
          
      </ul>
    </>
  );
}

export default CategoriesAdmin;
