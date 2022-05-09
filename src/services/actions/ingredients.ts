import { getIngredientsRequest, addOrdersRequest, getOrderRequest, getUserOrderRequest } from "../../utils/api"
import {
    GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
    CHOOSE_INGREDIENTS, DELETE_INGREDIENT,
    INCREASE_COUNTER, DECREASE_COUNTER, MOVE_INGREDIENT,
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED,
    GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,
    GET_USER_ORDER_REQUEST, GET_USER_ORDER_SUCCESS, GET_USER_ORDER_FAILED,
} from '../constants/ingredients'
import { TIngredient, TOrderInfo, TOrder, TIngredientWithProductId, AppDispatch, AppThunk } from '../../types'

// Get Ingredients
export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
    readonly ingredients: Array<TIngredient>
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

// Ingredients action
export interface IAddIngredientsAction {
    readonly type: typeof CHOOSE_INGREDIENTS
    readonly item: TIngredientWithProductId
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT
    readonly id: string
}

export interface IIncreaseIngredientAction {
    readonly type: typeof INCREASE_COUNTER
    readonly key: string
    readonly typeItem: string
}

export interface IDecreaseIngredientAction {
    readonly type: typeof DECREASE_COUNTER
    readonly key: string,
    readonly typeItem: string,
}

export interface IUpdateOrderAction {
    readonly type: typeof MOVE_INGREDIENT
    readonly toIndex: number,
    readonly fromIndex: number,
}

// Create order
export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS
    readonly order: TOrderInfo
}

export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED
}

// Get Order
export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS
    readonly order: TOrder
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED
}

// Get User Order
export interface IGetUserOrderRequestAction {
    readonly type: typeof GET_USER_ORDER_REQUEST
}

export interface IGetUserOrderSuccessAction {
    readonly type: typeof GET_USER_ORDER_SUCCESS
    readonly order: TOrder
}

export interface IGetUserOrderFailedAction {
    readonly type: typeof GET_USER_ORDER_FAILED
}

export type TIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IAddIngredientsAction
    | IDeleteIngredientAction
    | IIncreaseIngredientAction
    | IDecreaseIngredientAction
    | IUpdateOrderAction
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderFailedAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction
    | IGetUserOrderRequestAction
    | IGetUserOrderSuccessAction
    | IGetUserOrderFailedAction

export const getIngredients: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredientsRequest()
            .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data,
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            }
        }).catch((err) => {
            console.log(err)
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    }
}

export const createOrder: AppThunk = (ingredientsId: Array<string>) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        })
        addOrdersRequest(ingredientsId)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: CREATE_ORDER_SUCCESS,
                        order: res,
                    })
                } else {
                    dispatch({
                        type: CREATE_ORDER_FAILED,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: CREATE_ORDER_FAILED
                })
            })
    }
}

export const getOrder: AppThunk = (id: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        })
        getOrderRequest(id)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        order: res.orders[0],
                    })
                } else {
                    dispatch({
                    type: GET_ORDER_FAILED,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: GET_ORDER_FAILED,
                })
            })
    }
}

export const getUserOrder: AppThunk = (id: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_ORDER_REQUEST,
        })
        getUserOrderRequest(id)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_USER_ORDER_SUCCESS,
                    order: res.orders[0],
                })
            } else {
                dispatch({
                    type: GET_USER_ORDER_FAILED,
                })
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: GET_ORDER_FAILED,
            })
        })
    }
}