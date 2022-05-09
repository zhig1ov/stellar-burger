import React, { FC } from "react"
import { useSelector } from '../../hooks/hooks'
import { useDrag } from "react-dnd"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import style from './style.module.css'
import { COUNT_BUN } from '../../constants/constants'
import { TIngredient } from '../../types'

const Ingredient: FC<TIngredient> = ( item ) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    }),
  })

  const { counts, bun } = useSelector(store => store.ingredients.burgerIngredients)
  const isBun = item.type === 'bun'
  const count = isBun && bun && bun._id === item._id ? COUNT_BUN : counts[item._id] && counts[item._id]
  const opacity = isDrag ? 0.3 : 1

  return (
    <div className={style.ingredientsList__container} ref={dragRef} style={{ opacity }} >
      <img className={'ml-4 mr-4 mb-1'} src={item.image} alt={item.name} />
      <p className={style.price}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${style.name} mt-1 text text_type_main-default`}>{item.name}</p>
      { count ? <Counter count={count} size="default" /> : null }
    </div>
  )
}

export default  Ingredient
