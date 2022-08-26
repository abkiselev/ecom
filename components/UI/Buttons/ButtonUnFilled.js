import Link from "next/link";
import styles from './ButtonUnFilled.module.css'

const ButtonUnFilled = ({ text, url }) => {
    return (
        <Link href={ url }>
        <a className={styles.button_unfilled}>{ text }  {'\u27f6'}</a>
        </Link>
    );
}

export default ButtonUnFilled;
