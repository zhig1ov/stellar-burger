import React, { useEffect } from 'react'
import style from './order-profile.module.css'
import { Link, useLocation } from 'react-router-dom'
import OrderItem from '../order-item/order-item'
import { useDispatch, useSelector } from '../../hooks/hooks'
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../../services/constants/ws-actions-auth'
import { TOrder } from '../../types'

export function OrderProfile() {
	const dispatch = useDispatch()
	const location = useLocation()

	useEffect(
		() => {
			dispatch({ type: WS_CONNECTION_START_AUTH })
			return () => {
				dispatch({ type: WS_CONNECTION_CLOSE_AUTH })
				return
			}
		},[dispatch])

	const { orders } = useSelector((store) => store.wsAuth)
  
	return (
    <ul className={style.orders}>
      {
        orders?.map((el: TOrder, i: number) => (
          <li className={style.order} key={i}>
            <Link 
              to={{
                pathname: `/profile/orders/${el.number}`,
                state: { background: location }
              }}
              className={style.order__link} 
            >
              <OrderItem
                number={el.number}
                name={el.name}
                ingredients={el.ingredients}
                createdAt={el.createdAt}
                status={el.status}
              />
            </Link>
          </li>
        ))
      }
    </ul>
	)
}
