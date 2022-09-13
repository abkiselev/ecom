import Button from './UI/Buttons/Button';
import styles from '../styles/Form.module.css';
import Loader from './Loader';


function Form({ onSubmit, isFormValid, isloading, children, buttonText }) {

  return (
      <form onSubmit={onSubmit} className={styles.form} action="submit" >

        <fieldset className={styles.fieldset}>
          {children}
        </fieldset>

        {isloading
        ? <Loader />
        : <Button disabled={isFormValid} type='submit' text={buttonText} font="fz14" padd="p1475"/>
        }
        

      </form>
   
  );
}

export default Form;
