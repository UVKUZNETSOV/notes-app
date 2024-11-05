import React from 'react'

import TypeWritter from "@/components/TypeWritter"
import Link from 'next/link'

import styles from "./MainPage.module.css"

const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <TypeWritter />
      <Link className={styles.btn} href="http://localhost:3000/notes">Get started</Link>
    </div>
  )
}

export default WelcomePage