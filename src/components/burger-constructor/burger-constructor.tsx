import React, { useCallback, FC } from 'react'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import { useSelector, useDispatch } from '../../hooks/hooks'
import { createOrder } from '../../services/actions/ingredients'
import { useDrop } from 'react-dnd'
import { DECREASE_COUNTER, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../services/constants/ingredients'
import BurgerItem from '../burger-item/burger-item'
import { push } from 'connected-react-router'
import { useLocation, useHistory } from 'react-router-dom'
import { totalCost } from '../../utils/functions'
import Preloader from '../preloader/preloader'
import { TProps, TIngredientWithProductId } from './types'
import { TIngredient } from '../../types'

const BurgerConstructor: FC<TProps> = ({ onDropHandler }) => {
  const dispatch = useDispatch()
  const { bun, fillings } = useSelector(store => store.ingredients.burgerIngredients)
  const { orderRequest } = useSelector((store) => store.ingredients)
  const location = useLocation()
  const history = useHistory()
  const isToken = localStorage.getItem('refreshToken')

  const [{ canDrop, isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: TIngredient) {
      onDropHandler(itemId)
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  })

  const handleClick = () => {
    if (isToken) {
      const ingredientsId = fillings.map((e: TIngredientWithProductId) => e._id)
      const bunId: string = bun ? bun._id : ''
      dispatch(createOrder([bunId, ...ingredientsId]))
      history.push({
        pathname: '/order',
        state: {
            background: location
        }
      })
    } else {
      dispatch(push('/login'))
    }
  }

  const isActive = canDrop && isHover
  const classModificator = isActive ? 'container_active' : canDrop ? 'container_candrop' : ''
  const moveItem = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      toIndex: hoverIndex,
      fromIndex: dragIndex
    })
  }, [dispatch])

  if (orderRequest) {
    return (<Preloader />)
  } else {
    return (
      <div className={`${style.container} ${style[classModificator]} mt-25`} ref={dropTarget}>
        { bun &&
          <header className={`${style.container__head} mb-5`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name}(верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </header>
        }
        <ul className={style.list}>
          {fillings.map((el: TIngredientWithProductId, i: number) => {
            const deleteIngredient = () => {
              dispatch({
                type: DELETE_INGREDIENT,
                id: el.productId
              })
              dispatch({
                type: DECREASE_COUNTER,
                key: el._id,
                typeItem: el.type
              })
            }
          return(
            <BurgerItem
              item={el}
              index={i}
              key={el.productId}
              deleteIngredient={deleteIngredient}
              moveItem={moveItem}
            />
          )})
          }
        </ul>
        { bun &&
          <div className={`${style.container__end} mb-10`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              price={bun.price}
              text={`${bun.name}(низ)`}
              thumbnail={bun.image}/>
          </div>
        }
        <div className={style.total}>
          {fillings.length || bun  ? <div className={`${style.price} mr-10`}>
            <span className="text text_type_digits-default">{totalCost(bun, fillings)}</span>
            <CurrencyIcon type="primary" />
          </div> : null }
          {bun && <Button type="primary" size="large" onClick={handleClick} >
            Оформить заказ
          </Button> }
        </div>
      </div>
  )}
}    

export default BurgerConstructor
