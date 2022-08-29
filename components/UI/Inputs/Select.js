import styles from './Select.module.css'

function Select({ onChange, required, children, name, id }) {
  return (
    <select onChange={onChange} className={styles.select} name={name} id={id} required={Boolean(required)}>
      {children}
    </select>
  );
}

export default Select;
