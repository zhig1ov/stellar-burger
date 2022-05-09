import React from 'react'
import style from './style.module.css'
import { useParams } from "react-router-dom"
import { useSelector } from '../../hooks/hooks'
import Preloader from '../preloader/preloader'
import { TIngredient } from '../../types'

const IngredientDetails = () => {
  let { id } = useParams<{ id: string }>()
  const  { allIngredients } = useSelector((store) => store.ingredients)
  const currentBurger = allIngredients.length ? allIngredients?.find((el: TIngredient) => el._id === id) : null
  if (!currentBurger) {
      return (<Preloader />)
  } else {
		
  return (
    <div className={style.popup__container}>
      <img src={currentBurger.image} alt='item_image' className={`${style.popup__img} mb-4`}/>
      <p className={`${style.popup__subtitle} text text_type_main-medium mb-8`}>{currentBurger.name}</p>
      <p className={`${style.popup__descry} text text_type_main-default mb-8`}> Description in progress... </p>
      <ul className={`${style.popup__info} mb-15`}>
        <li className={`${style.info__cal} text text_type_digits-default`}><p className={'text text_type_main-default mt-2'}>Калории,ккал</p> {currentBurger.calories}</li>
        <li className={`${style.info__prot} text text_type_digits-default`}><p className={'text text_type_main-default mt-2'}>Белки, г</p> {currentBurger.proteins}</li>
        <li className={`${style.info__fat} text text_type_digits-default`}><p className={'text text_type_main-default mt-2'}>Жиры, г</p> {currentBurger.fat}</li>
        <li className={`${style.info__carb} text text_type_digits-default`}><p className={'text text_type_main-default mt-2'}>Углеводы, г</p> {currentBurger.carbohydrates}</li>
      </ul>
    </div>
  )}
}

export default  IngredientDetails
