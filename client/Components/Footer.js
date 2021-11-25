import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <div className={styles.main_footer}>
            <footer className={styles.footer}>
                {/* <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by &nbsp;
            <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a> */}
                <p>
                    Created with ❣️ by Aemie Jariwala for {"Microsoft Engage'21"}
                </p>
            </footer>
        </div>
    );
}

export default Footer;