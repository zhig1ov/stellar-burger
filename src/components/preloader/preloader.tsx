import React, { FC } from "react"

import styles from './style.module.css'

export const Preloader: FC = () => {
  return (
    <div className = {styles.centered}>
      <div className = {styles.blobOne}></div>
      <div className = {styles.blobTwo}></div>
    </div>    
  )
}

export default Preloader