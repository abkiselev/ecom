import styles from '../../styles/Lk/Me.module.css'
import { useEffect, useState } from 'react';
import Button from '../../components/UI/Buttons/Button'
import ButtonUnFilled from '../UI/Buttons/ButtonUnFilled';
import Form from '../Form';
import Input from '../UI/Inputs/Input';
import UseValidation from '../../hooks/UseValidation';
import axios from 'axios';



function Me({ user, updateUser }) {
  const { isFormValid, values, isValuesValid, setInitialValues, handleValues, errors } = UseValidation();
  const [isEdit, setIsEdit] = useState(false);  
  const [isloading, setIsloading] = useState(false);


  useEffect(() => {
    isEdit && setInitialValues({firstName: user?.firstName || '', secondName: user?.secondName || '', surName: user?.surName || '', tel: user?.tel || '', email: user?.email || ''});
  }, [isEdit]); 

  // console.log(isEdit)

  const handleEditButton = () => {
    setIsEdit(!isEdit)
  }

  // const handleSubmitUpdate = async (e) => {
  //   e.preventDefault();
  //   setIsloading(true)

  //   const { firstName, secondName, surName, tel, email } = values;

  //   const configData = {
  //     headers: { 'content-type': 'application/json' }
  //   };

  //   const userUpdated = await axios.post(`/api/routes/users/${user._id}`, { firstName, secondName, surName, tel, email }, configData);
  //   updateUser(userUpdated.data.data)
    
  //   setIsloading(false)
  //   setIsEdit(false)
  // }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const { firstName, secondName, surName, tel, email } = values;

    // const configData = {
    //   headers: { 'content-type': 'application/json' }
    // };

    updateUser({ id: user._id, firstName, secondName, surName, tel, email })
    
    setIsEdit(false)
  }

  
  return (
        <>
        
        {!isEdit
                ? <>
                  <ul className={styles.info}>
                    <li className={styles.info_item}>
                      <h2 className={styles.title}>Фамилия:</h2>
                      <p className={styles.subtitle}>{user?.surName}</p>
                    </li>
                    <li className={styles.info_item}>
                      <h2 className={styles.title}>Имя:</h2>
                      <p className={styles.subtitle}>{user?.firstName}</p>
                    </li>
                    <li className={styles.info_item}>
                      <h2 className={styles.title}>Отчество:</h2>
                      <p className={styles.subtitle}>{user?.secondName}</p>
                    </li>
                    <li className={styles.info_item}>
                      <h2 className={styles.title}>Телефон:</h2>
                      <p className={styles.subtitle}>{user?.tel}</p>
                    </li>
                    <li className={styles.info_item}>
                      <h2 className={styles.title}>E-mail:</h2>
                      <p className={styles.subtitle}>{user?.email}</p>
                    </li>                
                  </ul>

                  <Button disabled='false' text='Редактировать' font="fz14" padd="p1475" onClick={handleEditButton} />
                  </>

                : <>
                  <Form onSubmit={handleSubmitUpdate} isFormValid={isFormValid} isloading={isloading} buttonText='Сохранить' >
                      <div className={styles.info_item_edit}>
                        <h2 className={styles.title}>Фамилия:</h2>
                        <Input onChange={handleValues} value={values.surName} error={errors.surName} type="text" name='surName' placeholder='Фамилия*' required='true' />
                      </div>
                      <div className={styles.info_item_edit}>
                        <h2 className={styles.title}>Имя:</h2>
                        <Input onChange={handleValues} value={values.firstName} error={errors.firstName} type="text" name='firstName' placeholder='Имя*' required='true' />
                      </div>
                      <div className={styles.info_item_edit}>
                        <h2 className={styles.title}>Отчество:</h2>
                        <Input onChange={handleValues} value={values.secondName} error={errors.secondName} type="text" name='secondName' placeholder='Отчество*' required='true' />
                      </div>
                      <div className={styles.info_item_edit}>
                        <h2 className={styles.title}>Телефон:</h2>
                        <Input onChange={handleValues} value={values.tel} error={errors.tel} type="tel" name='tel' placeholder='Контактный телефон*' required='true' />
                      </div>
                      <div className={styles.info_item_edit}>
                        <h2 className={styles.title}>E-mail:</h2>
                        <Input onChange={handleValues} value={values.email} isValuesValid={isValuesValid} error={errors.email} type="email" name='email' placeholder='E-mail*' required='true' />
                      </div>                

                  </Form>
                  <p></p>
                  <ButtonUnFilled disabled='true' text='Отменить' font="fz14" padd="p1475" onClick={handleEditButton} />  
                  </>
          }

        </>
  );
}


export default Me;
