import React from 'react'
import styles from './CTA.module.css'
function CTA() {
  return (
    <div className={styles.contain}>
        <div  className={styles.contain_items}>
        <h2 className={styles.text}>Calm your mind. Change your life.</h2>
        <h3 className={styles.subtext}>The Mzanzi app for sleep, meditation and relaxation</h3>
        <div className={styles.btn_contain}>
            <button className={styles.btn}>sign up now</button>
            <button className={styles.btn2}>already have account</button>
        </div>
        </div>
    </div>
  )
}

export default CTA