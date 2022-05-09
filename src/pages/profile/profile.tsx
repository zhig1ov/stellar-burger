import React, { useEffect } from 'react'
import style from './style.module.css'
import { Route, Switch, Link } from 'react-router-dom'
import { useDispatch, useSelector } from '../../hooks/hooks'
import { getUser } from '../../services/actions/user'
import { NavProfile } from "../../components/nav-profile/nav-profile"
import { FormProfile } from "../../components/forms-profile/forms-profile"
import { OrderProfile } from '../../components/order-profile/order-profile'
import Preloader from '../../components/preloader/preloader'

export function ProfilePage() {
  const dispatch = useDispatch()
  const { getUserRequest } = useSelector((store) => store.auth)

  useEffect(() => {
      dispatch(getUser())
  }, [dispatch])

  if (getUserRequest) {
      return (<Preloader />)
  } else {
    return (
      <div className={style.main}>
        <NavProfile />
        <Switch>
          <Route path='/profile' exact={true}>
            <FormProfile />
          </Route>
          <Route path='/profile/orders' exact={true}>
            <OrderProfile />
          </Route>
          <Route>
            <div className={style.notFound}>
              <h1>Error: 404 Not Found</h1>
              <p>Псс, кажется ты заблудился</p>
              <Link to={`/`}>
                <span>Жмакни сюда</span>
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    )
  }
}
