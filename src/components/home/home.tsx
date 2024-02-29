import Link from 'next/link'
import styles from './home.module.css'
export default function Home() {
    return (
        <Link href='/'>
            <span className={styles.home} />
        </Link>
    )
}