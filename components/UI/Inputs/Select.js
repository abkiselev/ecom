import styles from './Select.module.css'

function Select({ onChange, error, required, children, name, id }) {
  return (
    <div className={styles.wrapper}>
      <select onChange={onChange} className={styles.select} name={name} id={id} required={Boolean(required)} >
        {children}
      </select>
      <span className={styles.errorText}>{error}</span>
    </div>
  );
}

export default Select;
