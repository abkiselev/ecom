import Button from './UI/Buttons/Button';
import styles from '../styles/Form.module.css'


function Form({ onSubmit, isFormValid, children, buttonText }) {

  return (
      <form onSubmit={onSubmit} className={styles.form} action="submit" >

        <fieldset className={styles.fieldset}>
          {children}
        </fieldset>

        <Button disabled={isFormValid} type='submit' text={buttonText} font="fz14" padd="p1475"/>

      </form>
   
  );
}

export default Form;
