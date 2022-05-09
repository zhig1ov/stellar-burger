import React, { useEffect, FC } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useHistory } from "react-router-dom"
import style from './style.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay"

const modalRoot: Element | null = document.querySelector('#modal')

const Modal: FC = ({ children }) => {
  let history = useHistory()
  const closeModal = () => {
    history.goBack()
  }

  const close = (event: KeyboardEvent) => {
    if(event.code === 'Escape') closeModal()
  }

  useEffect(() => {
    window.addEventListener('keydown', close)
    return () => {
      window.removeEventListener('keydown', close)
    }
  }, [])

  return modalRoot && ReactDOM.createPortal ((
    <>
    <div className={style.popup}>
      <div className={`${style.popup__header} mt-10 ml-10 mr-10`}>
        <CloseIcon type="primary" onClick={closeModal}/>
      </div>
      {children}
    </div>
      <ModalOverlay closeModal={closeModal}/>
    </>
  ), modalRoot)
}

export default Modal



