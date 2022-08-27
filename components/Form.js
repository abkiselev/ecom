import Button from './UI/Buttons/Button';
import styles from '../styles/Form.module.css'


function Form({ children, buttonText }) {
  return (
      <form className={styles.form} action="submit">

        <fieldset className={styles.fieldset}>
          {children}
        </fieldset>

        <Button type='submit' text={buttonText} font="fz14" padd="p1475"/>

      </form>
   
  );
}

export default Form;
