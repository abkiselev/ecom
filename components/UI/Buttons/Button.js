import Link from "next/link";
import styles from './Button.module.css'

const Button = ({ disabled, text, font, padd, type, onClick }) => {
    return (
        <button
            onClick={onClick} 
            type={type}
            className={`${!disabled && styles._disabled} ${styles.button} ${styles[font]} ${styles[padd]}`}
        >
            { text }
        </button>
    );
}

export default Button;
