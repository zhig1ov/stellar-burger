
import React, { useState, SyntheticEvent } from 'react'
import style from './style.module.css'
import {Button, Input, Logo } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import { forgotPassword } from '../../services/actions/user'
import { useDispatch } from '../../hooks/hooks'

export function ForgotPasswordPage() {
  const [value, setValue] = useState('')
  const isToken = localStorage.getItem('refreshToken')
  const dispatch = useDispatch()

  const submitForm = (e: SyntheticEvent) => {
      e.preventDefault()
      dispatch(forgotPassword(value))
  }
	
  if (isToken) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <>
      <div className={`${style.container} mt-20`}>
        <Logo />
        <form className={`${style.form} mt-20`} onSubmit={submitForm}>
          <h3 className={'text text_type_main-medium'}>Восстановление пароля</h3>
          <Input
            type={'email'}
            name={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
            size={'default'}
            errorText={'Error'}
            error={false}
          />
          <div className={'mt-10'}>
            <Button type="primary" size="small" >
              <p className={'text text_type_main-default'}>Восстановить</p>
            </Button>
          </div>
        </form>
        <div className={`${style.support__container} mt-20`}>
          <span className={"text text_type_main-default text_color_inactive"}>Вспомнили пароль?
            <Link to='/login' className={`'text text_type_main-default pl-2 ${style.link}`}>Войти</Link>
          </span>
        </div>
      </div>
    </>
  )
}
