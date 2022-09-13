import styles from './Input.module.css'

function Input({ value, isValuesValid, error, onChange, type, name, placeholder, required }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${isValuesValid && `${styles._ok}`}`}
        value={value || ''}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        required={Boolean(required)}
      />
      <span className={styles.errorText}>{error}</span>
      <span className={isValuesValid ? styles.icon : ''}></span>
    </div>
  );
}

export default Input;
