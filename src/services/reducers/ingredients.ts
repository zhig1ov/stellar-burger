import {
  GET_INGREDIENTS_REQUEST,  GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, // Запрос на получение ингредиентов 
  CHOOSE_INGREDIENTS, // выбор ингредиентов 
  DELETE_INGREDIENT, // Удаление ингредиента 
  INCREASE_COUNTER, // Увеличение счетчика 
  DECREASE_COUNTER, // Уменьшение счетчика 
  MOVE_INGREDIENT, // Перемещение ингредиентов 
  CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, // Запрос на создание заказа 
  GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, // Запрос на получение заказа
  GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS, GET_USER_ORDER_FAILED, // Запрос на получение заказа пользователя
} from '../constants/ingredients'
import { TIngredient, TBurgerIngredients, TIngredientWithProductId, TOrder, TOrderInfo } from '../../types'
import { TIngredientsActions } from '../actions/ingredients'


export type TIngredientsState = {
  ingredientRequest: boolean
  ingredientFailed: boolean
  ingredientSuccess: boolean
  allIngredients: Array<TIngredient>
  burgerIngredients: TBurgerIngredients
  currentOrder: null | TOrder
  createOrder: null | TOrderInfo
  orderRequest: boolean
  orderFailed: boolean
  orderLoaded: boolean
}

const ingredientState: TIngredientsState = {
  ingredientRequest: false,
  ingredientFailed: false,
  ingredientSuccess: false,
  allIngredients: [],
  burgerIngredients: {
      bun: null,
      fillings: [],
      counts: {}
  },
  currentOrder: null,
  createOrder: null,
  orderRequest: false,
  orderFailed: false,
  orderLoaded: false
}

export const ingredientsReducer  = (state = ingredientState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type){
    //Запрос на получение ингредиентов
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientRequest: true,
        ingredientFailed: false,
        ingredientSuccess: false,
      }
    }
    // Успешный запрос получения ингредиентов
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientRequest: false,
        ingredientFailed: false,
        ingredientSuccess: true,
        allIngredients: action.ingredients,
      }
    }
    // Неуспешный запрос получения ингредиентов
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientRequest: false,
        ingredientFailed: true,
      }
    }
    // Выбор ингредиента
    case CHOOSE_INGREDIENTS: {
      const { type } = action.item
      if (type === 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            bun: action.item
          }
        }
      } else {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            fillings: [
              ...state.burgerIngredients.fillings,
              action.item
            ]
          }
        }
      }
    }
    // Удаление ингредиента
    case DELETE_INGREDIENT: {
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: [...state.burgerIngredients.fillings].filter((el: TIngredientWithProductId) => el.productId !== action.id)
        }
      }
    }
    // Увеличение счетчика
    case INCREASE_COUNTER: {
      const { typeItem } = action
      if (typeItem !== 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            counts: {
              ...state.burgerIngredients.counts,
              [action.key]: (state.burgerIngredients.counts[action.key] || 0) + 1
            }
          }
        }
      } else return state
    }
    // Уменьшение счетчика
    case DECREASE_COUNTER: {
      const { typeItem } = action
      if (typeItem !== 'bun') {
        return {
          ...state,
          burgerIngredients: {
            ...state.burgerIngredients,
            counts: {
              ...state.burgerIngredients.counts,
              [action.key]: state.burgerIngredients.counts[action.key] - 1
            }
          }
        }
      } else return state
    }
    
    // Перемещение ингредиентов
    case MOVE_INGREDIENT: {
      const fillings = [...state.burgerIngredients.fillings]
      fillings.splice(action.toIndex, 0,fillings.splice(action.fromIndex,1)[0])
      return {
        ...state,
        burgerIngredients: {
          ...state.burgerIngredients,
          fillings: fillings
        }
      }
    }
    // Запрос на создание заказа
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    // Удачное создание заказа
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        createOrder: action.order,
        burgerIngredients: {
          bun: null,
          fillings: [],
          counts: {},
        },
      }
    }
    // Ошибка создания заказа
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    // Запрос заказа
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderLoaded: false
      }
    }
    // Успешный запрос заказа
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderLoaded: true,
        currentOrder: action.order,
      }
    }
    // Ошибка запроса заказа
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    // Запрос пользовательского заказа
    case GET_USER_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderLoaded: false
      }
    }
    // Удачный запрос пользовательского заказа
    case GET_USER_ORDER_SUCCESS: {
      const data = action.order ? action.order : null
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderLoaded: true,
        currentOrder: data,
      }
    }
    // Ошибка запроса пользовательского заказа 
    case GET_USER_ORDER_FAILED: {
      return { 
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    default: {
      return state
    }
  }
}
