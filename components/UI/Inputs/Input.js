import styles from './Input.module.css'

function Input({ type, name, placeholder, required, errorMessage }) {
  return (
    <>
        <input className={styles.input} type={type} name={name} placeholder={placeholder} required={Boolean(required)}/>
        <span className={styles.errorText}>{errorMessage}</span>
    </>
  );
}

export default Input;
