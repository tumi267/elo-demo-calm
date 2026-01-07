import React from 'react'
import AudioPlayer from '../../../components/(public)/AudioPlayer/AudioPlayer'
import BreathingExercise from '@/app/components/(public)/BreathingExercise/BreathingExercise'
import styles from './user.module.css'
import Faviourted from '@/app/components/(public)/Faviourtied/Favoutited'
function page() {
  const audioList = [
   
    { title: 'Forest Birds', src: '/forest-birds.mp3' },
    { title: 'Ocean Waves', src: '/ocean-waves.mp3' },
  ]
  return (
    <div>
      <div className={styles.user_head}>
        <div>
        <h2 className={styles.header_text}>Hi User</h2>
        <h3>Take a moment to breathe</h3>
        </div>
        <div >
        <img src='/next.svg' width={100} height={100}/>
        </div>
      </div>
      <div className={styles.account}>
        <h2 className={styles.subtext}>Account</h2>
        <div>
          <h3>example.design@example.com</h3>
          <h3>user name</h3>
          <h3>user packege</h3>
        </div>
      </div>  
        {/* faviourted */}
        <div className={styles.faviourted}>
        <BreathingExercise/>
        {/* map db */}
        {audioList.map((e,i)=>{return<div key={i}><Faviourted
        title={e.title}
        src={e.src}
        /></div>})}
        </div>
        {/* History */}
    </div>
  )
}

export default page