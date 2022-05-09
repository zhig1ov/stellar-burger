import React from 'react'
import style from './style.module.css'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"
import { CHOOSE_INGREDIENTS, INCREASE_COUNTER } from '../../services/constants/ingredients'
import { useDispatch, useSelector } from '../../hooks/hooks'
import Preloader from '../../components/preloader/preloader'
import { v4 as uuidv4 } from 'uuid'
import { TIngredient } from '../../types'

export function MainPage() {
  const dispatch = useDispatch()
  const { ingredientRequest, ingredientFailed, ingredientSuccess } = useSelector(store => store.ingredients)

  const handleDrop = (item: TIngredient) => {
    const newItem = { ...item, productId: uuidv4() }
    dispatch({
      type: CHOOSE_INGREDIENTS,
      item: newItem
    })
    dispatch({
      type: INCREASE_COUNTER,
      key: item._id,
      typeItem: item.type
    })
  }

  return (
    <>
      <div className={style.main__container}>
        {ingredientRequest && <Preloader />}
        {ingredientFailed && "Ошибка загрузки булочек..."}
        {!ingredientRequest && !ingredientFailed && ingredientSuccess && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor onDropHandler={handleDrop} />
          </DndProvider>
        )}
      </div>
    </>
  )
}

