import { CSSProperties, ReactNode } from 'react'
import styles from './button.module.css'
import classNames from 'classnames'
import Image from 'next/image'

export default function Button({ type = 'Purple', size = 'normal', children, onClick, loading, img = '/icons/arrow_forward.svg', style, className }: { img?: string, type?: string, size?: string, children: ReactNode, onClick?: () => void, loading?: boolean, style?: CSSProperties, className?: string }) {
    return (
        <div className={classNames(styles.btn, styles[type.toLowerCase()], styles[size], { [styles.disabled]: loading }, className)} style={style} onClick={loading ? () => { } : onClick}>
            {children}
            {
                img === 'none' ? '' : <Image src={img} className={styles.img} width={24} height={24} alt='->' />
            }
        </div>
    )
}