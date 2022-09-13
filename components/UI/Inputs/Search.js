import styles from './Search.module.css'

function Search({onChange, onClick, name, value, placeholder}) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.search} type="text" name={name} value={value || ''} placeholder={placeholder} onChange={onChange} autoComplete="off"/>
      <span className={`${styles.clear} ${value && `${styles._active}`}`} onClick={onClick} ></span>
    </div>
  );
}

export default Search;
