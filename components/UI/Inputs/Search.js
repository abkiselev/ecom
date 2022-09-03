import styles from './Search.module.css'

function Search({onChange, name, placeholder}) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.search} type="text" name={name} placeholder={placeholder} onChange={onChange} autoComplete="off"/>
      <span className={styles.clear}></span>
    </div>
  );
}

export default Search;
