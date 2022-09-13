import styles from './Textarea.module.css'

function Textarea({ value, id, isValuesValid, error, onChange, name, placeholder, required }) {
    return (
      <div className={styles.wrapper}>
        <textarea 
          className={`${styles.textarea} ${isValuesValid && `${styles._ok}`}`}
          rows="5" 
          id={id}
          value={value || ''}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          required={Boolean(required)}
        />
        <span className={styles.errorText}>{error}</span>
        <span className={isValuesValid ? styles.icon : ''}></span>
      </div>
    );
}

export default Textarea;
