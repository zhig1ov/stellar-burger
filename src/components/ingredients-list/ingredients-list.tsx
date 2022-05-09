import React from 'react'
import style from './style.module.css'
import Ingredient from "../ingredient/ingredient"
import { useLocation, Link } from "react-router-dom"
import { TIngredient } from '../../types'
import { TIngredientRef } from './types'

const IngredientsList = React.forwardRef<HTMLHeadingElement, TIngredientRef>(({ id, title, ingredients }, ref) => {
  let location = useLocation()
	
  return(
    <section>
      <h3 className={'mt-10 mb-6 text text_type_main-medium'} id={id} ref={ref}>{title}</h3>
      <ul className={`${style.ingredientsList__section} ml-4`}>
        {ingredients.map((item: TIngredient) => (
          <li key={item._id} className={style.ingredientsList__item}>
            <Link to={{
              pathname: `ingredients/${item._id}`,
              state: { background: location }
            }}
            className={style.link}>
            <Ingredient {...item} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
})

export default IngredientsList
