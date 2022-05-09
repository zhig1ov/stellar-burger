import { PayloadAction } from '@reduxjs/toolkit'
import { TOrders } from '../../types'
import {
	WS_CONNECTION_START_AUTH,
	WS_CONNECTION_CLOSE_AUTH,
	WS_SEND_MESSAGE_AUTH,
	WS_CONNECTION_SUCCESS_AUTH,
	WS_CONNECTION_ERROR_AUTH,
	WS_CONNECTION_CLOSED_AUTH,
	WS_GET_MESSAGE_AUTH
} from '../constants/ws-actions-auth'

export const wsActionsAuth = {
	wsInit: WS_CONNECTION_START_AUTH,
	wsClose: WS_CONNECTION_CLOSE_AUTH,
	wsSendMessage: WS_SEND_MESSAGE_AUTH,
	onOpen: WS_CONNECTION_SUCCESS_AUTH,
	onClose: WS_CONNECTION_CLOSED_AUTH,
	onError: WS_CONNECTION_ERROR_AUTH,
	onMessage: WS_GET_MESSAGE_AUTH
}

export interface IWsConnectionStartAuthAction {
	readonly type: typeof WS_CONNECTION_START_AUTH
}

export interface IWsConnectionCloseAuthAction {
	readonly type: typeof WS_CONNECTION_CLOSE_AUTH
}

export interface IWsSendMessageAuthAction {
	readonly type: typeof WS_SEND_MESSAGE_AUTH
}

export interface IWsConnectionSuccessAuthAction {
	readonly type: typeof WS_CONNECTION_SUCCESS_AUTH
	payload: PayloadAction
}

export interface IWsConnectionErrorAuthAction {
	readonly type: typeof WS_CONNECTION_ERROR_AUTH
	payload: PayloadAction
}

export interface IWsConnectionClosedAuthAction {
	readonly type: typeof WS_CONNECTION_CLOSED_AUTH
	payload: PayloadAction
}

export interface IWsGetMessageAuthAction {
	readonly type: typeof WS_GET_MESSAGE_AUTH
	payload: TOrders
}

export type TWSActionsAuthActions =
	| IWsConnectionStartAuthAction
	| IWsConnectionCloseAuthAction
	| IWsSendMessageAuthAction
	| IWsConnectionSuccessAuthAction
	| IWsConnectionErrorAuthAction
	| IWsConnectionClosedAuthAction
	| IWsGetMessageAuthAction