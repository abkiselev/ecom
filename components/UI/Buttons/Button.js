import Link from "next/link";
import styles from './Button.module.css'

const ButtonFilled = ({ text, font, padd }) => {
    return (
        <button className={`${styles.button} ${styles[font]} ${styles[padd]}`}>{ text }</button>
    );
}

export default ButtonFilled;
