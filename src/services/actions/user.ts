import {
    signUpRequest,
    signInRequest,
    signOutRequest,
    getUserRequest,
    updateUserRequest,
    forgotPasswordRequest,
    resetPasswordRequest,
    refreshTokenRequest,
} from '../../utils/api'
import { deleteCookie, setCookie } from '../../utils/functions'

import { push } from 'connected-react-router'

import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED,
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED
} from '../constants/user'

import { TUser, TUserData, AppDispatch, AppThunk } from '../../types'

// Register request
export interface IRegisterRequestAction {
	readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSuccessAction {
	readonly type: typeof REGISTER_SUCCESS
	readonly user: TUser
}

export interface IRegisterFailedAction {
	readonly type: typeof REGISTER_FAILED
}

// Login request
export interface ILoginRequestAction {
	readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccessAction {
	readonly type: typeof LOGIN_SUCCESS
	readonly user: TUser
}

export interface ILoginFailedAction {
	readonly type: typeof LOGIN_FAILED
}

// Get user request
export interface IGetUserRequestAction {
	readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS
	readonly user: TUser
}

export interface IGetUserFailedAction {
	readonly type: typeof GET_USER_FAILED
}

// Update user request
export interface IUpdateUserRequestAction {
	readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUpdateUserSuccessAction {
	readonly type: typeof UPDATE_USER_SUCCESS
	readonly user: TUser
}

export interface IUpdateUserFailedAction {
	readonly type: typeof UPDATE_USER_FAILED
}

// Forgot password request
export interface IForgotPasswordRequestAction {
	readonly type: typeof FORGOT_PASSWORD_REQUEST
}

export interface IForgotPasswordSuccessAction {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export interface IForgotPasswordFailedAction {
	readonly type: typeof FORGOT_PASSWORD_FAILED
}

// Reset password request 
export interface IResetPasswordRequestAction {
	readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSuccessAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IResetPasswordFailedAction {
	readonly type: typeof RESET_PASSWORD_FAILED
}

// Logout request
export interface ILogoutRequestAction {
	readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccessAction {
	readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailedAction {
	readonly type: typeof LOGOUT_FAILED
}

// Refresh token request
export interface IRefreshTokenRequestAction {
	readonly type: typeof REFRESH_TOKEN_REQUEST
}

export interface IRefreshTokenSuccessAction {
	readonly type: typeof REFRESH_TOKEN_SUCCESS
}

export interface IRefresshTokenFailedAction {
	readonly type: typeof REFRESH_TOKEN_FAILED
}

export type TAuthActions =
	| IRegisterRequestAction
	| IRegisterSuccessAction
	| IRegisterFailedAction
	| ILoginRequestAction
	| ILoginSuccessAction
	| ILoginFailedAction
	| IGetUserRequestAction
	| IGetUserFailedAction
	| IGetUserSuccessAction
	| IUpdateUserRequestAction
	| IUpdateUserSuccessAction
	| IUpdateUserFailedAction
	| IForgotPasswordRequestAction
	| IForgotPasswordSuccessAction
	| IForgotPasswordFailedAction
	| IResetPasswordRequestAction
	| IResetPasswordSuccessAction
	| IResetPasswordFailedAction
	| ILogoutRequestAction
	| ILogoutFailedAction
	| ILogoutSuccessAction
	| IRefreshTokenRequestAction
	| IRefreshTokenSuccessAction
	| IRefresshTokenFailedAction

//Регистрация
export const register: AppThunk = (state: TUserData) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        })
        signUpRequest(state)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1]
                    const refreshToken = res.refreshToken
                    setCookie('token', authToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user,
                    })
                    dispatch(push('/'))
                } else {
                    dispatch({                     
                        type: REGISTER_FAILED,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: REGISTER_FAILED,
                })
            })
    }
}

// Авторизация
export const login: AppThunk = (state) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        })
        signInRequest(state)
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1]
                    const refreshToken = res.refreshToken
                    setCookie('token', authToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user,
                    })
                } else {
                    dispatch({
                        type: LOGIN_FAILED,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: LOGIN_FAILED,
                })
            })
    }
}

// Получить данные пользователя
export const getUser: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        })
        getUserRequest()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user,
                    })
                } else {
                    throw res
                }
            })
            .catch((res) => {
                dispatch({
                    type: GET_USER_FAILED,
                })
            })
    }
}

// Обновить данные пользователя
export const updateUser: AppThunk = (data) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST,
        })
        updateUserRequest(data)
            .then((res) => {
                if (res && res.success) {   
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: res.user,
                    })
                } else {
                    throw res
                }
            })
            .catch((res) => {
                dispatch({
                    type: UPDATE_USER_FAILED,
                })
            })
    }
}

// Запрос на смену пароля
export const forgotPassword: AppThunk = (email) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })
        forgotPasswordRequest(email)
            .then((res) => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                })
                dispatch(push('/reset-password'))
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                })
            })
    }
}

// Смена пароля
export const resetPassword: AppThunk = ({ password, token }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })
        resetPasswordRequest({ password, token })
            .then((res) => {
                if (res && res.success) {
                    console.log('Смена пароля прошла успешно')
                    dispatch(push('/login'))
                } else {
                    dispatch({
                        type: RESET_PASSWORD_FAILED,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                })
            })
    }
}

// Выход
export const logout: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        })
        signOutRequest()
            .then((res) => {
                if (res && res.success) {
                    deleteCookie('token')
                    localStorage.removeItem('refreshToken')
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    })
                    dispatch(push('/login'))
                } else {
                    dispatch({
                        type: LOGOUT_FAILED,
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: LOGOUT_FAILED,
                })
            })
    }
}

// Обновление токена
export const refreshToken: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST,
        })
        refreshTokenRequest().then((res) => {
            if (res && res.success) {
                localStorage.setItem('refreshToken', res.refreshToken)
                const authToken = res.accessToken.split('Bearer ')[1]
                setCookie('token', authToken)
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                })
            } else {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                })
            }
        })
    }
}
