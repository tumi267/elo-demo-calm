'use client'
import { useEffect, useState } from 'react'
import styles from './BreathingExercise.module.css'

const steps = ['Inhale', 'Hold', 'Exhale']
const durations = [4000, 4000, 6000] // ms

export default function BreathingExercise() {
  const [step, setStep] = useState(0)
  const [rotation, setRotation] = useState(0) // degrees

  useEffect(() => {
    let start: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / durations[step], 1)
      setRotation(progress * 360)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setStep((prev) => (prev + 1) % steps.length)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [step])

  return (
    <div className={styles.container}>
      <h2 className={styles.step}>{steps[step]}</h2>
      <svg className={styles.circle} viewBox="0 0 120 120">
        <circle
          className={styles.slice}
          cx="60"
          cy="60"
          r="50"
          strokeWidth="10"
          fill="none"
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%' }}
        />
      </svg>
    </div>
  )
}

