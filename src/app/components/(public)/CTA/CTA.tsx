import React from 'react'
import styles from './CTA.module.css'
import Link from 'next/link'
function CTA() {
  return (
    <div className={styles.contain}>
        <div  className={styles.contain_items}>
        <h2 className={styles.text}>Calm your mind. Change your life.</h2>
        <h3 className={styles.subtext}>The Mzanzi app for sleep, meditation and relaxation</h3>
        <div className={styles.btn_contain}>
            <Link href={`/user/002`} className={styles.btn}>sign up now</Link>
            <Link href={`/user/003`} className={styles.btn2}>already have account</Link>
        </div>
        </div>
    </div>
  )
}

export default CTA