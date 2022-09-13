import Link from "next/link";
import styles from './ButtonUnFilled.module.css'

const ButtonUnFilled = ({ disabled, text, font, padd, type, onClick }) => {
    return (
        <button
            onClick={onClick} 
            type={type}
            className={`${!disabled && styles._disabled} ${styles.button_unfilled} ${styles[font]} ${styles[padd]}`}
        >
            { text }
        </button>
    );
}

export default ButtonUnFilled;
