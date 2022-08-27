import Link from "next/link";
import styles from './Button.module.css'

const Button = ({ text, font, padd, type }) => {
    return (
        <button type={type} className={`${styles.button} ${styles[font]} ${styles[padd]}`}>{ text }</button>
    );
}

export default Button;
