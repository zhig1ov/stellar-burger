import React, { useEffect } from 'react'
import style from './style.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams, Redirect, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from '../../hooks/hooks'
import { getOrder, getUserOrder } from '../../services/actions/ingredients'
import Preloader from '../../components/preloader/preloader'
import { createCardDate, getStatus, getPrice, getBurgerIngredients, getBurgerIngredientsObjWithCount } from '../../utils/functions'

export function OrderPage() {
  const dispatch = useDispatch()
  const isProfile = !!useRouteMatch("/profile")
  const { id } = useParams<{ id: string }>()
	
  useEffect(() => {
    dispatch(isProfile ? getUserOrder(id) : getOrder(id))
  },[dispatch, isProfile, id])

  const { allIngredients } = useSelector((store) => store.ingredients)
  const order = useSelector((store) => store.ingredients.currentOrder)
  const { orderLoaded } = useSelector((store) => store.ingredients)

  const stringWithDay = order && order.createdAt && createCardDate(order?.createdAt)
  const burgerIngredients = order && order.ingredients && getBurgerIngredients(order?.ingredients, allIngredients)
  const arrUniqItem: Array<string> = Array.from(new Set(order?.ingredients))
  const bI = burgerIngredients && getBurgerIngredientsObjWithCount(burgerIngredients)
  const burgerPrice = burgerIngredients && getPrice(burgerIngredients)
  const name = order?.name
  const status = order?.status
  const st = status ? getStatus(status) : null

  if (orderLoaded && !order) {
    return <Redirect to='/' />
  } else if (!order) {
    return <Preloader />
  } else {
    return (
      <div className={style.container}>
        <div>
          <span className={"text text_type_digits-default"}>#{id}</span>
          <h1 className={`text text_type_main-medium mb-3 mt-10 ${style.title}`}>{name}</h1>
          <p className={`text text_type_main-default mb-15 ${style.status} ${style[`status_color_${st?.textColor}`]}`}>{st?.text}</p>
          <p className={`text text_type_main-medium mb-6 ${style.title}`}>Состав:</p>
          <ul className={`${style.list} mb-10`}>
            {arrUniqItem.map((el: string, i: number) => {
              return (
              <li className={`${style.list__item} mr-6`} key={i}>
                <div className={`${style.icon} mr-4`}>
                  <img src={bI?.item[el]?.image_mobile} alt='Вкусная булка' />
                </div>
                <p className={`${style.ingredient} mr-4 text text_type_main-default`}>
                  {bI?.item[el]?.name}
                </p>
                <span className={'mr-1 text text_type_digits-default'}>
                  {bI?.count[el]} x{' '}
                </span>
                <span className={`${style.element__price} text`}>
                  {bI?.item[el]?.price || 0}
                  <CurrencyIcon type="primary" />
                </span>
              </li>
              )
            })}
          </ul>
          <div className={style.info}>
            <span className={"text text_type_main-default text_color_inactive"}>{stringWithDay}</span>
            <span className={`${style.element__price} text`}>
              {burgerPrice || 0}
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      </div >
    )
  }
}
