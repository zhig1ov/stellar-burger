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
import { TAuthActions } from '../actions/user';


export type TAuthState = {
  name: string,
  email: string,
  password: string,

  registerRequest: boolean,
  registerFailed: boolean,

  loginRequest: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,

  getUserRequest: boolean,
  getUserFailed: boolean,

  updateUserRequest: boolean,
  updateUserFailed: boolean,

  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,

  isforgotPasswordRequest: boolean,
  isforgotPasswordSuccess: boolean,

  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,

  isTokenUpdated: boolean,
  tokenUpdateDate: boolean,
}

const initialState: TAuthState = {
  name: '',
  email: '',
  password: '',

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,

  isforgotPasswordRequest: false,
  isforgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,

  isTokenUpdated: false,
  tokenUpdateDate: false,
};


export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
      // Регистрация
      case REGISTER_REQUEST: {
          return {
              ...state,
              registerRequest: true,
              registerFailed: false,
          };
      }
      case REGISTER_SUCCESS: {
          return {
              ...state,
              registerRequest: false,
              registerFailed: false,
              name: action.user.name,
              email: action.user.email
          };
      }
      case REGISTER_FAILED: {
          return {
              ...state,
              registerFailed: true,
              registerRequest: false
          };
      }
      // Вход
      case LOGIN_REQUEST: {
          return {
              ...state,
              loginRequest: true,
              loginFailed: false
          };
      }
      case LOGIN_SUCCESS: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: false,
              name: action.user.name,
              email: action.user.email,
          };
      }
      case LOGIN_FAILED: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: true,
          };
      }
      // Получение данных пользователя
      case GET_USER_REQUEST: {
          return {
              ...state,
              loginRequest: true,
              loginFailed: false,
          };
      }
      case GET_USER_SUCCESS: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: false,
              name: action.user.name,
              email: action.user.email
          };
      }
      case GET_USER_FAILED: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: true
          };
      }
      // Изменение данных пользователя
      case UPDATE_USER_REQUEST: {
          return {
              ...state,
              loginRequest: true,
              loginFailed: false,
          };
      }
      case UPDATE_USER_SUCCESS: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: false,
              name: action.user.name,
              email: action.user.email,
          };
      }
      case UPDATE_USER_FAILED: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: true,
          };
      }
      // Запрос на смену пароля
      case FORGOT_PASSWORD_REQUEST: {
          return {
              ...state,
              forgotPasswordRequest: true,
              forgotPasswordFailed: false,
              isforgotPasswordRequest: false,
              isforgotPasswordSuccess: false
          };
      }
      case FORGOT_PASSWORD_SUCCESS: {
          return {
              ...state,
              forgotPasswordRequest: false,
              isforgotPasswordRequest: true,
              isforgotPasswordSuccess: true,
          };
      }
      case FORGOT_PASSWORD_FAILED: {
          return {
              ...state,
              forgotPasswordRequest: false,
              forgotPasswordFailed: true,
              isforgotPasswordRequest: true,
              isforgotPasswordSuccess: false
          };
      }
      // Смена пароля
      case RESET_PASSWORD_REQUEST: {
          return {
              ...state,
          };
      }
      case RESET_PASSWORD_SUCCESS: {
          return {
              ...state,
          };
      }
      case RESET_PASSWORD_FAILED: {
          return {
              ...state,
          };
      }
      // Выход
      case LOGOUT_REQUEST: {
          return {
              ...state,
              logoutRequest: true,
              logoutFailed: false,
          };
      }
      case LOGOUT_SUCCESS: {
          return {
              ...state,
              logoutRequest: false,
              logoutFailed: false,
              name: '',
              email: '',
          };
      }
      case LOGOUT_FAILED: {
          return {
              ...state,
              logoutRequest: false,
              logoutFailed: true,
          };
      }
      // Обновление токена
      case REFRESH_TOKEN_REQUEST: {
          return {
              ...state,
          };
      }
      case REFRESH_TOKEN_SUCCESS: {
          return {
              ...state,
              isTokenUpdated: true,
              tokenUpdateDate: true,
          };
      }
      case REFRESH_TOKEN_FAILED: {
          return {
              ...state,
              isTokenUpdated: true,
              tokenUpdateDate: false,
          };
      }
      default: {
          return state;
      }
  }
};