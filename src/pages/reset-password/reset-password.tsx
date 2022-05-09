import React, { useState, SyntheticEvent } from 'react'
import style from './style.module.css'
import {Button, Input, Logo, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"
import { Redirect, Link } from 'react-router-dom'
import { resetPassword } from '../../services/actions/user'
import { resetPasswordRequest } from '../../utils/api'
import { useSelector, useDispatch } from '../../hooks/hooks'

export function ResetPasswordPage() {
  const [state, setState] = useState({
    password: '',
    token: ''
  })

  const dispatch = useDispatch()

  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value
    })
  }

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(resetPassword(state))
    resetPasswordRequest(state)
      .then((res) => {
          console.log(res)
      })
      .catch((err) => {
          console.log(err)
      })
  }

  const forgotPasswordCodeSuccess = useSelector(store => store.auth.isforgotPasswordSuccess)

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  } else if (!localStorage.getItem('refreshToken') && !forgotPasswordCodeSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    )
  } else {
    return (
      <>
        <div className={`${style.container}`}>
          <Logo/>
          <form className={`${style.form} mt-20`} onSubmit={formSubmit}>
            <h3 className={"text text_type_main-medium"}>Восстановление пароля</h3>
            <PasswordInput
              value={state.password}
              name={'password'}
              onChange={handleInputChange}
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={handleInputChange}
              value={state.token}
              name={'token'}
              error={false}
              errorText={'Ooops'}
              size={'default'}
            />
            <div className={'mt-10'}>
              <Button type="primary" size="small" >
                <p className={"text text_type_main-default"}>Сохранить</p>
              </Button>
            </div>
          </form>
          <div className={`${style.support__container} mt-20`}>
            <span className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?
              <Link to='/login' className={`text text_type_main-default pl-2 ${style.link}`}>Войти</Link>
            </span>
          </div>
        </div>
      </>
    )
  }
}
