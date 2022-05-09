import React, { useRef, useState, useEffect } from 'react'
import style from './style.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from "../ingredients-list/ingredients-list"
import { useSelector } from '../../hooks/hooks'
import { filterArray } from "../../utils/functions"

const BurgerIngredients = () => {
  const [current, setCurrent] = useState<string>('bun')
  const { allIngredients } = useSelector((store) => store.ingredients)
  const { bun, sauce, main } = filterArray(allIngredients)
  const rootRef = useRef<HTMLElement>(null)
  const bunRef = useRef<HTMLHeadingElement>(null)
  const sauceRef = useRef<HTMLHeadingElement>(null)
  const mainRef = useRef<HTMLHeadingElement>(null)

  const handleScroll = () => {
    if (rootRef && bunRef && sauceRef && mainRef && rootRef.current && bunRef.current && sauceRef.current && mainRef.current) {
      const bunDist = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
      const sauceDist = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
      const mainDist = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
      const minDist = Math.min(bunDist, sauceDist, mainDist)
      const currentHeader = minDist === bunDist ? 'bun' : minDist === sauceDist ? 'sauce' : 'main'
      setCurrent(prevState => currentHeader === prevState ? prevState : currentHeader)
    }
  }

  useEffect(() => {
    document.querySelector(`#${current}`)?.scrollIntoView()
  },[current])

  return (
    <div className={style.container}>
      <h2 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h2>
      <div style={{ display: 'flex' }} className={`text text_type_main-default`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent} >
            Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
        </Tab>
      </div>
      <section className={style.card__container} ref={rootRef} onScroll={handleScroll} >
        <IngredientsList
          title='Булки'
          ingredients={ bun }
          id='bun'
          ref={ bunRef }
        />
        <IngredientsList
          title='Соусы'
          ingredients={ sauce }
          id='sauce'
          ref={ sauceRef }
        />
        <IngredientsList
          title='Начинки'
          ingredients={ main }
          id='main'
          ref={ mainRef }
        />
      </section>
    </div>
  )
}

export default BurgerIngredients
