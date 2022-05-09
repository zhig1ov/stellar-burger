import React, { useEffect, FC } from 'react'
import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AppHeader from "../app-header/app-header"
import Modal from "../modal/modal"
import './style.module.css'
import { ResetPasswordPage, LoginPage, MainPage, RegisterPage, ProfilePage, FeedPage, OrderPage } from '../../pages'
import style from './style.module.css'
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password"
import IngredientDetails from "../ingredient-details/ingredient-details"
import { ProtectedRoute } from "../protected-route"
import OrderDetails from "../order-details/order-details"
import { getIngredients } from "../../services/actions/ingredients"
import { TLocationTemplate } from '../../types'

const App: FC = () => {
  let location = useLocation<TLocationTemplate>()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
},[dispatch])

  const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background

	return (
	  <div className={style.page}>
	    <AppHeader />
	    <Switch location={background || location}>
	      <Route path='/' exact >
	        <MainPage />
	      </Route>
	      <Route path='/login' exact >
	        <LoginPage />
	      </Route>
	      <Route path='/register' exact>
	        <RegisterPage />
	      </Route>
	      <Route path='/forgot-password' exact >
	        <ForgotPasswordPage />
	      </Route>
	      <Route path='/reset-password' exact >
	        <ResetPasswordPage />
	      </Route>
	      <Route path='/feed/:id' exact >
	        <OrderPage />
	      </Route>
	      <Route path='/feed' exact >
	        <FeedPage />
	      </Route>
	      <Route path='/ingredients/:id' exact >
	        <IngredientDetails />
	      </Route>
	      <ProtectedRoute path='/profile/orders/:id' exact >
	        <OrderPage />
	      </ProtectedRoute>
	      <ProtectedRoute path='/profile'>
	        <ProfilePage />
	      </ProtectedRoute>
	      <Route>
	          <div className={style.container}>
	            <h1> 404 Здесь ничего нет</h1>
	          </div>
	      </Route>
	    </Switch>
			
	  {background &&
	    (<>
	      <Route path='/ingredients/:id' children={<Modal><IngredientDetails /></Modal>} />
	      <ProtectedRoute path='/profile/orders/:id' children={<Modal><OrderPage /></Modal>} />
	      <Route path='/feed/:id' children={<Modal><OrderPage /></Modal>} />
	      <ProtectedRoute path='/order' children={<Modal><OrderDetails /></Modal>} />
	    </>
	    )}
	  </div>
	)
}

export default App
