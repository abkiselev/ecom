import styles from './Search.module.css'

function Search({placeholder}) {
  return (
    <input className={styles.search} type="text" placeholder={placeholder}/>
  );
}

export default Search;
