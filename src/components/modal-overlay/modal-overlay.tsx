import React, { FC } from 'react'
import style from './style.module.css'
import { TProps } from './types'

const ModalOverlay: FC<TProps> = (props) => {
  return (
    <div className={style.overlay} onClick={props.closeModal}></div>
  )
}

export default  ModalOverlay
