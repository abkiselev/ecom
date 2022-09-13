import styles from '../../styles/Users_admin.module.css';
import { useState, useEffect } from 'react';
import Search from '../UI/Inputs/Search';
import axios from 'axios';
import Loader from '../Loader';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    renderUsers()
  }, []);

  const clearSearch = () => {
    setSearchValue('');
  }

  const renderUsers = async () => {
    const users = await axios.get('/api/routes/users');
    setUsers(users.data.data.reverse());
  }

  return (
    <>
      <div className={styles.filter}>
        <p className={styles.filter_text}>Поиск:</p>
        <Search onChange={(e)=>setSearchValue(e.target.value)} onClick={clearSearch} name='search' value={searchValue || ''} placeholder='поиск'/>
      </div>

      {users.length === 0
        ? <Loader />
        : <ul className={styles.infoList}>

          {users    
            .filter((item) => Object.entries(item).some(value => 
                String(value).toLowerCase().includes(searchValue.toLowerCase())))  
            .map(user => (
            <li key={user._id} className={styles.infoItem}>
              <h3 className={styles.title}>{`${user.surName} ${user.firstName} ${user.secondName}`}</h3>
              <p className={styles.subtitle}>{user.email}</p>
              <p className={styles.subtitle}>{user.tel}</p>
            </li>

          ))}

          </ul>
      }

      
    </>
  );
}

export default UsersAdmin;
