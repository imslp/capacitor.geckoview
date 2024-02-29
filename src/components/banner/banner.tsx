import { ReactNode } from 'react';
import styles from './banner.module.css';
import Image from 'next/image';
export default function Banner({ children }: { children: ReactNode }) {
    return (
        <div className={styles.banner}>
            <div className={styles.bannerBack} />
            <div className={styles.section}>
                <Image width={176} height={74} src={'/logo.svg'} alt='IMSLP' className={styles.logo} />
                {children}
            </div>
        </div>
    )
}