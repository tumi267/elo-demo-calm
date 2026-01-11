'use client'
import React, { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import Link from 'next/link'

function Nav() {
  const [show, setShow] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 50) {
        // Scrolling down → hide
        setShow(false)
      } else {
        // Scrolling up → show
        setShow(true)
      }

      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  return (
    <div className={`${styles.contain} ${show ? styles.show : styles.hide}`}>
      <span><Link href={'/'}><span>HE</span>MA<span></span></Link></span>
      <span><input placeholder='search'/></span>
      <span><Link href={'/user/001'}>login/signout</Link></span>
    </div>
  )
}

export default Nav
