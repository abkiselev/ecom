import styles from './Select.module.css'

function Select({ children, name, id }) {
  return (
    <select className={styles.select} name={name} id={id}>
      {children}
    </select>
  );
}

export default Select;
