import styles from '../../styles/Goods_admin.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Select from '../UI/Inputs/Select';
import Input from '../UI/Inputs/Input';
import Textarea from '../UI/Inputs/Textarea';
import axios from 'axios';
import Loader from '../Loader';
import { transliterate } from '../../utils/transliterate';

const GoodsAdmin = () => {
  const [goods, setGoods] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [goodToEdit, setGoodToEdit] = useState({});
  const [imagesToEdit, setImagesToEdit] = useState([]);
  const [isOkShown, setIsOkShown] = useState(false);
  const [textOk, setTextOk] = useState('');
  const [inputsData, setInputsData] = useState({category: '', title: '', color: '', visota: '', shirina: '', glubina: '', price: '', text: '', images: []});
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    renderImages()
  }, []);

  useEffect(() => {
    if(!Object.values(inputsData).includes('') && inputsData.images.length > 0){
      setIsButtonDisabled(false)
    } else setIsButtonDisabled(true)
  }, [inputsData]);

  useEffect(() => {
    if(previewFiles.length > 0){
      const newImageURLs = [];
      previewFiles.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
      setPreviewURLs(newImageURLs)
    } else return;
  }, [previewFiles]);

  const renderImages = async () => {
    const goods = await axios.get('/api/routes/goods');
    setGoods(goods.data.data.reverse())
  }
  
  const handleInput = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value})
  }

  const handleLoad = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    const currentData = {...inputsData, images: []};

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const nameTranslated = transliterate(files[i].name.toLowerCase());

      currentData.images.push(nameTranslated);
      formData.append("theFiles", files[i], nameTranslated);
    }
      
      
    setPreviewFiles([...e.target.files])
    setFiles(formData)
    setInputsData(currentData)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    
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
      text: inputsData.text,
      link 
    };


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

    await axios.post('/api/routes/upload', files, configFiles);

    if(e.target.id === 'add'){
      await axios.post('/api/routes/goods', outData, configData);
    }

    if(e.target.id === 'edit'){
      await axios.patch(`/api/routes/goods/${goodToEdit._id}`, outData, configData);
    }

    setIsLoading(false);
    setFiles([]);
    setPreviewURLs([])
    setPreviewFiles([])
    setImagesToEdit([])
    setInputsData({category: '', title: '', color: '', visota: '', shirina: '', glubina: '', price: '', text: '', images: []});
    e.target.reset();

    setIsEdit(false)
    renderImages();

    if(e.target.id === 'add'){
      showOK('добавлен!')
    } else showOK('обновлен!')
    
  }

  const showOK = (text) => {
    setIsOkShown(true);
    setTextOk(text)
    setTimeout(() => {
      setIsOkShown(false);
      setTextOk('')
    }, 1500);
  }

  const handleSelect = (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value});
  }

  const deleteGood = async (good) => {
    await axios.delete(`/api/routes/goods/${good._id}`);
    renderImages();
    showOK('удален!')
  }


  const editGood = (good) => {
    setGoodToEdit(good)
    setImagesToEdit(good.images)
    setInputsData({...good, category: good.category.link})
    setIsEdit(true)
    setPreviewURLs([])
  }

  const delImg = (e) => {
    e.preventDefault()
    setInputsData({...inputsData, images: imagesToEdit.filter(img => img !== e.target.value)})
    setImagesToEdit(imagesToEdit.filter(img => img !== e.target.value))
  }

  return (
    <>
      {isOkShown && <div className={styles.ok}>`{`Товар ${textOk}`}`</div>}
      { !isEdit
        ? <form id='add' className={styles.addgood} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
          <p className={styles.addgood_title}>Загрузить новый товар</p>

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

          <Textarea onChange={(e) => handleInput(e)} value={inputsData.text || ''} type="text" name='text' placeholder='Описание*' required='true'  />

          <div className={styles.actions}>
            <input type="file" onChange={handleLoad} multiple />

            <button type='submit' disabled={isLoading || isButtonDisabled} className={styles.button_add}>Добавить</button>

            {isLoading && <Loader />}
          </div>

          <div className={styles.editImgs}>
            {previewURLs.map((img, index) => (
              <div className={styles.editImg} key={index}>
                <Image className={styles.img} src={img} width="60" height="50" alt='Превью'/>
              </div>
            ))}
          </div>

          </form>

        : <form id='edit' className={styles.editgood} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
          <p className={styles.addgood_title}>Редактировать товар</p>

          <div className={styles.editImgs}>
            {imagesToEdit.map((img, index) => (
              <div className={styles.editImg} key={img}>
                <Image className={styles.img} src={`/images/uploads/${img}`} width="100" height="80" alt={img}/>
                <button className={styles.button_edit} value={img} onClick={(e) => delImg(e)}>х</button>
              </div>
            ))}
          </div>

          <div className={styles.editinputs}>
            <Select onChange={(e) => handleSelect(e)} value={inputsData.category} name="category" id="category" required='true' >
              <option value="">категория</option>
              <option selected={inputsData.category === 'sumki'} value="sumki">Сумки</option>
              <option selected={inputsData.category === 'remni'} value="remni">Ремни</option>
            </Select>
            <Input onChange={(e) => handleInput(e)} value={inputsData.title} type="text" name='title' placeholder='Название*' required='true' />
            <Input onChange={(e) => handleInput(e)} value={inputsData.color} type="text" name='color' placeholder='Цвет*' required='true' />
            <Input onChange={(e) => handleInput(e)} value={inputsData.visota} type="number" name='visota' placeholder='Высота*' required='true' />
            <Input onChange={(e) => handleInput(e)} value={inputsData.shirina} type="number" name='shirina' placeholder='Ширина*' required='true' />
            <Input onChange={(e) => handleInput(e)} value={inputsData.glubina} type="number" name='glubina' placeholder='Глубина*' required='true' />
            <Input onChange={(e) => handleInput(e)} value={inputsData.price} type="number" name='price' placeholder='Цена*' required='true' />
          </div>

          <Textarea onChange={(e) => handleInput(e)} value={inputsData.text || ''} type="text" name='text' placeholder='Описание*' required='true'  />

          <div className={styles.actions}>
            <input type="file" onChange={handleLoad} multiple />

            <button type='submit' disabled={isLoading || isButtonDisabled} className={styles.button_add}>Сохранить изменения</button>
            <button onClick={()=>{
              setIsEdit(false);
              setGoodToEdit({});
              setInputsData({category: '', title: '', color: '', visota: '', shirina: '', glubina: '', price: '', images: []});
              setPreviewURLs([])
            }}>отменить редактирование</button>

            {isLoading && <Loader />}
          </div>

          <div className={styles.editImgs}>
            {previewURLs.map((img, index) => (
              <div className={styles.editImg} key={index}>
                <Image className={styles.img} src={img} width="60" height="50" alt='Превью'/>
              </div>
            ))}
          </div>

          </form>       
      }

      <div className={styles.filter}>
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
              <button className={styles.button_delete} onClick={() => deleteGood(good)}>удалить</button>
              <button className={styles.button_edit} onClick={() => editGood(good)}>редактировать</button>
            </li>

          ))}
        
          
      </ul>
    </>
  );
}

export default GoodsAdmin;
