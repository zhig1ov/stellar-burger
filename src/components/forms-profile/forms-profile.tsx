import React, {useState, useEffect, SyntheticEvent} from "react"
import style from "./style.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector, useDispatch } from '../../hooks/hooks'
import { updateUser } from '../../services/actions/user'
import Preloader from '../preloader/preloader'

export function FormProfile() {
  const currentUserName = useSelector((store) => store.auth.name)
  const currentUserEmail = useSelector((store) => store.auth.email)
  const { updateUserRequest } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    nameDisabled: true,
    emailDisabled: true,
    passwordDisabled: true,
  })

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        name: currentUserName,
        email: currentUserEmail,
      }
    })
  }, [currentUserName, currentUserEmail])

  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value
    })
  }
  const nameInputRef = React.useRef<HTMLInputElement>(null)
  const emailInputRef = React.useRef<HTMLInputElement>(null)
  const passwordInputRef = React.useRef<HTMLInputElement>(null)

  const activeNameInput = () => {
    setState({
      ...state,
      nameDisabled: state.nameDisabled ? false : true,
    })
    if (nameInputRef && nameInputRef.current) {
      nameInputRef.current.disabled = false
    }
    setTimeout(() => nameInputRef && nameInputRef.current && nameInputRef.current.focus(), 0)
  }

  const activeEmailInput = () => {
    setState({
      ...state,
      emailDisabled: state.emailDisabled ? false : true,
    })
    if (emailInputRef && emailInputRef.current) {
      emailInputRef.current.disabled = false
    }
    setTimeout(() => emailInputRef && emailInputRef.current && emailInputRef.current.focus(), 0)
  }

  const activePasswordInput = () => {
    setState({
      ...state,
      passwordDisabled: state.passwordDisabled ? false : true,
    })
    if (passwordInputRef && passwordInputRef.current) {
      passwordInputRef.current.disabled = false
    }
    setTimeout(() => passwordInputRef && passwordInputRef.current && passwordInputRef.current.focus(), 0)
  }

  const iconNameInput = state.nameDisabled ? 'EditIcon' : 'CloseIcon'
  const emailNameInput  = state.emailDisabled ? 'EditIcon' : 'CloseIcon'
  const passwordNameInput  = state.passwordDisabled ? 'EditIcon' : 'CloseIcon'

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault()
    let data = {}
    data = state.name !== currentUserName ? { ...data, name: state.name } : data
    data = state.email !== currentUserEmail ? { ...data, email: state.email } : data
    data = state.password.length !== 0 ? { ...data, password: state.password } : data
    dispatch(updateUser({ ...data }))
    setState({
      ...state,
      password: '',
      nameDisabled: true,
      emailDisabled: true,
      passwordDisabled: true,
    })
  }

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault()
    setState({
      ...state,
      name: currentUserName,
      email: currentUserEmail,
      password: '',
      nameDisabled: true,
      emailDisabled: true,
      passwordDisabled: true,
    })
  }

  if (updateUserRequest) {
    return (<Preloader />)
  } else {
    return (
      <form className={style.form} onSubmit={submitForm}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleInputChange}
          icon={iconNameInput}
          value={state.name}
          name={'name'}
          error={false}
          onIconClick={activeNameInput}
          ref={nameInputRef}
          errorText={'Ошибка'}
          size={'default'}
          disabled={state.nameDisabled}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={handleInputChange}
          icon={emailNameInput}
          onIconClick={activeEmailInput}
          name={'email'}
          error={false}
          value={state.email}
          ref={emailInputRef}
          errorText={'Ошибка'}
          size={'default'}
          disabled={state.emailDisabled}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={handleInputChange}
          icon={passwordNameInput}
          onIconClick={activePasswordInput}
          name={'password'}
          error={false}
          value={state.password}
          ref={passwordInputRef}
          errorText={'Ошибка'}
          size={'default'}
          disabled={state.passwordDisabled}
        />
        { state.name !== currentUserName || state.email !== currentUserEmail || state.password.length !== 0 ?
          (
          <div className={style.button}>
            <span onClick={handleClick} className={style.button}>
              Отмена
            </span>
            <Button type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        ) : null }
      </form>
    )
  }
}