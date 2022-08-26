import Link from "next/link";
import styles from './ButtonArrow.module.css'

const ButtonArrow = ({ text, url }) => {
    return (
        <Link href={ url }>
        <a className={`${styles.button_arrow}`}>{ text }</a>
        </Link>
    );
}

export default ButtonArrow;
