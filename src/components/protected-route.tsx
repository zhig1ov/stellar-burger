import React, { useEffect, FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { refreshToken } from '../services/actions/user'
import { useSelector, useDispatch } from '../hooks/hooks'
import Preloader from './preloader/preloader'

export const ProtectedRoute: FC<{ path: string; exact?: boolean}> = ({ children, ...rest }) => {
  const dispatch = useDispatch()
  const tokenUpd = useSelector(store => store.auth.isTokenUpdated)
  const tokenUpdDate = useSelector(store => store.auth.tokenUpdateDate)
  const isToken = !!localStorage.getItem('refreshToken')

  useEffect(() => {
    if (!tokenUpd && isToken) {
      dispatch(refreshToken())
    }
  }, [dispatch, isToken, tokenUpd])
	
  if (isToken && !tokenUpd) {
      return <Preloader />
  } else {
      return (
      <Route
        {...rest}
        render={({location}) =>(isToken && tokenUpdDate) ? ( children ) : (
        <Redirect to={{pathname: '/login',state: {from: location}}}/>)}
      />
    )
  }
}
