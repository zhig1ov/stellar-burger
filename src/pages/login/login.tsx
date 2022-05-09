import React, { useState, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from '../../hooks/hooks'
import { Redirect } from 'react-router-dom'
import style from './style.module.css'
import { Link } from 'react-router-dom'
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { login } from '../../services/actions/user'

export function LoginPage() {
  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const userName = useSelector(store => store.auth.name)
  const dispatch = useDispatch()

  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value,
    })
  }

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(login(state))
  }

  const isToken = localStorage.getItem('refreshToken')

  if (userName || isToken) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  } else {
  return (
    <>
      <div className={`${style.container}`}>
        <form onSubmit={submitForm} className={`${style.form} mt-20`}>
          <h3 className={"text text_type_main-medium"}>Вход</h3>
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={handleInputChange}
            value={state.email}
            name={'email'}
            error={false}
            errorText={'Ooops...'}
            size={'default'}
          />
          <PasswordInput
            value={state.password}
            name={'password'}
            onChange={handleInputChange}
          />
          <div className={'mt-10'}>
            <Button type="primary" size="small" >
              <p className={"text text_type_main-default"}>Войти</p>
            </Button>
          </div>
        </form>
        <div className={`${style.support__container} mt-20`}>
          <span className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?
            <Link to='/register' className={`text text_type_main-default pl-2 ${style.link}`}>Зарегистрироваться</Link>
          </span>
          <span className={"text text_type_main-default text_color_inactive"}>Забыли пароль?
            <Link to='/forgot-password' className={`text text_type_main-default pl-2 ${style.link}`}>Восстановить пароль</Link>
          </span>
        </div>
      </div>
    </>
  )
  }
}
