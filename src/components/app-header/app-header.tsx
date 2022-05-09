import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useLocation } from 'react-router-dom'
import style from './style.module.css'

const AppHeader = () => {
  const { pathname } = useLocation()
  return(
    <header className={`text text_type_main-default ${style.header}`}>
      <nav className={style.header__container}>
        <div className={style.nav__container}>
          <NavLink exact to='/' className={`${style.nav__element} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`} activeClassName={style.active}>
            <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
            <p className={'text text_type_main-default ml-2'}>Конструктор</p>
          </NavLink>
          <NavLink to='/feed' className={`${style.nav__element} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`} activeClassName={style.active}>
            <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
            <p className={'text text_type_main-default ml-2'}>Лента заказов</p>
          </NavLink>
        </div>
        <Logo />
        <NavLink to='/profile' className={`${style.nav__element} pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`} activeClassName={style.active}>
          <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
          <p className={'text text_type_main-default ml-2'}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader
