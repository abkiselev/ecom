import Link from "next/link";
import styles from './ButtonFilled.module.css'

const ButtonFilled = ({ text, url, font, padd }) => {
    return (
        <Link href={ url }>
        <a className={`${styles.button_filled} ${styles[font]} ${styles[padd]}`}>{ text }</a>
        </Link>
    );
}

export default ButtonFilled;
