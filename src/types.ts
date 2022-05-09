import { ThunkAction } from 'redux-thunk'
import { Action, ActionCreator } from 'redux'
import { store } from './services/store'
import { TAuthActions } from './services/actions/user'
import { TIngredientsActions } from './services/actions/ingredients'

import { TWSActionsAuthActions, wsActionsAuth } from './services/actions/ws-actions-auth'
import { TWSActionsActions, wsActions } from './services/actions/ws-actions'

type TApplicationActions = TAuthActions | TIngredientsActions | TWSActionsAuthActions | TWSActionsActions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>

export type TIngredient = {
	_id: string
	name: string
	type: string
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile: string
	image_large: string
	__v?: number
}

export type TOrder = {
	createdAt: string
	ingredients: Array<string>
	name: string
	number: number
	status: string
	updatedAt: string
	_id: string
}

export type TOrderInfo = {
	name: string
	order: { number: number }
	success: boolean
}

export type TUserData = {
	email: string
	name?: string
	password: string
}

export type TResetPassword = {
	password: string
	token: string
}

type TInputName = 'name' | 'email' | 'password'

export type TUpdateUserData = {
	[fw in TInputName]: string
}

export type TIngredientWithProductId = TIngredient
	& { productId: string }

export type TError = {
	success: boolean
	message?: string
}

export type TUser = {
	name: string
	email: string
	password?: string
}

export type TCountsIngredients = {
	[name: string]: number
}

export type TBurgerIngredients = {
	bun: null | TIngredientWithProductId
	fillings: Array<TIngredientWithProductId>
	counts: TCountsIngredients
}

export type TWSAction = typeof wsActions | typeof wsActionsAuth

export type TLocationTemplate = {
	background?: any
}

export type TOrders = {
	orders: Array<TOrder>
	total: number
	totalToday: number
}

export type TSetCookieProps = {
	expires?: number | string
	path?: string
} & { [extraParams: string]: string | number | boolean }