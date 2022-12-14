import styles from '../../styles/Lookbook_admin.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Fancybox from '../../components/Fancybox';
import Select from '../../components/UI/Inputs/Select';
import axios from 'axios';
import Loader from '../Loader';
import { transliterate } from '../../utils/transliterate.js';

const LookbookAdmin = () => {
    const [lookbookImages, setLookbookImages] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [category, setCategory] = useState('none');
    const [files, setFiles] = useState([]);
    const [data, setData] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      renderImages()
    }, []);

    useEffect(() => {
        if((category !== 'none') && data.length > 0){
          setIsButtonDisabled(false)
        } else setIsButtonDisabled(true)
    }, [category, data]);


    const renderImages = async () =>{
      const images = await axios.get('/api/routes/lookbook');
      setLookbookImages(images.data.data.reverse())
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
                console.log(`?????????????? ????????????????:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        const configData = {
            headers: { 'content-type': 'application/json' },
            onUploadProgress: (event) => {
                console.log(`?????????????? ????????????????:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        const responseUpload = await axios.post('/api/routes/upload', files, configFiles);
        const responseDatabase = await axios.post('/api/routes/lookbook', data, configData);

        setIsLoading(false);
        setCategory('none');
        setFiles([]);
        setData([]);
        e.target.reset();

        renderImages();
    }

    const deleteImg = async (img) => {
      const response = await axios.delete(`/api/routes/lookbook/${img._id}`);
      renderImages();
    }
 

    return (
        <div className={styles.zakazList}>

            <form className={styles.addfoto} action="submit" encType="multipart/form-data" onSubmit={handleSubmit}>
              <p className={styles.addfoto_title}>?????????????????? ?????????? ???????? ?? Lookbook</p>

              <div className={styles.select}>
                <Select onChange={handleSelect} value={category} name="category" id="category" required='true'>
                  <option value="none">??????????????????</option>
                  <option value="sumki">??????????</option>
                  <option value="remni">??????????</option>
                </Select>
              </div>

              <input type="file" onChange={handleLoad} multiple />

              <button type='submit' disabled={isButtonDisabled || isLoading} className={styles.button_add}>{isLoading ? "????????????????..." : "???????????????? ????????"}</button>

            </form>

            <div className={styles.filter}>
              <p className={styles.filter_text}>???????????? ???? ????????????????????:</p>
              <Select onChange={(e) => setFilterValue(e.target.value)} name="category" id="category" required='true'>
                <option value="">??????</option>
                <option value="sumki">??????????</option>
                <option value="remni">??????????</option>
              </Select>
            </div>

            

            <ul className={styles.imageList}>

              {lookbookImages.length === 0
              ? <Loader />
              : lookbookImages.filter(img => img.category.startsWith(filterValue)).map(img => (
                <li key={img._id} className={styles.image}>
                  <Image data-fancybox="gallery" className={styles.img} src={`/images/uploads/${img.link}`} width="1000" height="800" alt={img.category}/>
                  <button className={styles.button_delete} onClick={() => deleteImg(img)}>??</button>
                </li>
              ))}

              {}
              
            </ul>
            
        </div>
    );
}

export default LookbookAdmin;
