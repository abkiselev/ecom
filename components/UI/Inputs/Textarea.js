import styles from './Textarea.module.css'

function Textarea() {
  return (
      <textarea className={styles.textarea} placeholder="Ваше сообщение" name="message" rows="5"></textarea>
  );
}

export default Textarea;
