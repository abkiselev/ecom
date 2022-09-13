import Link from "next/link";
import styles from './ButtonArrow.module.css';

const ButtonArrow = ({ text, url, onClick }) => {
    return (
        <Link href={ url }>
        <a onClick={onClick} className={`${styles.button_arrow}`}>{ text }</a>
        </Link>
    );
}

export default ButtonArrow;
