import Link from "next/link";
import styles from './ButtonLink.module.css'

const ButtonLink = ({ text, url }) => {
    return (
        <Link href={ url }>
        <a className={styles.button_link}>{ text } {'\u27f6'}</a>
        </Link>
    );
}

export default ButtonLink;
