import React from "react"
import style from "./style.module.css"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch } from '../../hooks/hooks'
import { logout } from '../../services/actions/user'

export function NavProfile() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const clickHandler = () => {
      dispatch(logout())
  }
  return (
  <nav className={`${style.nav} mb-20`}>
    <ul className={style.nav__list}>
      <li>
        <NavLink
          exact to="/profile"
          className={`${style.link} pt-4 pb-4 pr-5 mr-2 text text_type_main-medium text_color_inactive`}
          activeClassName={style.link_active}
        >
      	<span className={'ml-2'}>Профиль</span>
        </NavLink>
      </li>
      <li>
        <NavLink
            exact to="/profile/orders"
            className={`${style.link} pt-4 pb-4 pr-5 mr-2 text text_type_main-medium text_color_inactive`}
            activeClassName={style.link_active}
        >
        <span className={'ml-2'}>История заказов</span>
          </NavLink>
      </li>
      <li>
        <NavLink exact to="/login"
          className={`${style.link} pt-4 pb-4 pr-5 mr-2 text text_type_main-medium text_color_inactive`}
          activeClassName={style.link_active}>
        <span className={'ml-2'} onClick={clickHandler}>Выход</span>
        </NavLink>
      </li>
    </ul>
    {pathname === '/profile' ? (
      <span className={'text text_type_main-default text_color_inactive'}>В этом разделе вы можете изменить свои персональные данные</span>
    ) : null }
  </nav>
  )
}
