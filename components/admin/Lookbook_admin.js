import styles from '../../styles/Lookbook_admin.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Fancybox from '../../components/Fancybox';
import Select from '../../components/UI/Inputs/Select';
import axios from 'axios';

const LookbookAdmin = () => {
    const [lookbookImages, setLookbookImages] = useState([]);
    const [category, setCategory] = useState('none');
    const [files, setFiles] = useState([]);
    const [data, setData] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      getImages()
    }, []);

    async function getImages(){
      const images = await axios.get('/api/routes/lookbook');
      setLookbookImages(images.data.data)

      // console.log(images.data.data)
    }

    useEffect(() => {
        if(category !== 'none' && data.length > 0){
          setIsButtonDisabled(false)
        } else setIsButtonDisabled(true)
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

    const handleSelect = (e) => {
        setCategory(e.target.value)
        if(data.length > 0){
        setData(data.map(item => ({...item, category: e.target.value})))
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

        const configFiles = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        const configData = {
            headers: { 'content-type': 'application/json' },
            onUploadProgress: (event) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        const responseUpload = await axios.post('/api/routes/upload', files, configFiles);
        const responseDatabase = await axios.post('/api/routes/lookbook', data, configData);

        console.log('responseUpload', responseUpload.data);
        console.log('responseDatabase', responseDatabase.data);

        setIsLoading(false);
        setCategory('');
        setFiles([])
        setData([])
        e.target.reset()
    }

    const deleteImg = (img) => {
      console.log(img)
    }

    return (
        <div className={styles.zakazList}>

            <form className={styles.addfoto} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
              <p className={styles.addfoto_title}>Загрузить новые фото в Lookbook</p>

              <div className={styles.select}>
                <Select onChange={handleSelect} value={category} name="category" id="category" required='true'>
                  <option value="none">категория</option>
                  <option value="sumki">Сумки</option>
                  <option value="remni">Ремни</option>
                </Select>
              </div>

              <input type="file" onChange={handleLoad} multiple />

              <button type='submit' disabled={isButtonDisabled || isLoading} className={styles.button_add}>{isLoading ? "Загрузка..." : "Добавить фото"}</button>

            </form>

            <ul className={styles.imageList}>

              {lookbookImages.map(img => (
                <li key={img._id} className={styles.image}>
                  <Image data-fancybox="gallery" className={styles.img} src={`/images/lookbook/${img.link}`} width="1000" height="800" alt={img.category}/>
                  <button className={styles.button_delete} onClick={()=>deleteImg(img)}>х</button>
                </li>

              ))}


              
            </ul>
            
          </div>
    );
}

export default LookbookAdmin;
