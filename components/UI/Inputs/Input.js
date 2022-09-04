import styles from './Input.module.css'

function Input({ value, error, pattern, onChange, type, name, placeholder, required }) {
  return (
    <div className={styles.wrapper}>
      <input pattern={pattern} value={value || ''} onChange={onChange} className={styles.input} type={type} name={name} placeholder={placeholder} required={Boolean(required)}/>
      <span className={styles.errorText}>{error}</span>
    </div>
  );
}

export default Input;
