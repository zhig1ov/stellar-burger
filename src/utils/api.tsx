import { ServerConfig } from "../constants/config"
import { getCookie, setCookie, deleteCookie } from './functions'
import { TUserData, TResetPassword, TUpdateUserData, TError } from '../types'


const requestHandler = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(res)
}

// Получить ингредиенты
export const getIngredientsRequest = () => {
  return fetch(`${ServerConfig.baseUrl}/ingredients`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res))
}

// Получить заказы
export const getOrderRequest = (number: string) => {
  return fetch(`${ServerConfig.baseUrl}/orders/${number}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res))
}

// Получить пользовательские заказы
export const getUserOrderRequest = (number: string) => {
  return fetchWithRefreshToken(`${ServerConfig.baseUrl}/orders/${number}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        ...ServerConfig.headers,
        Authorization: 'Bearer ' + getCookie('token'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
}


// Зарегистрироваться
export const signUpRequest = ({ email, password, name }: TUserData) => {
  return fetch(`${ServerConfig.baseUrl}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    body: JSON.stringify({ email, password, name }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res))
}

// Войти
export const signInRequest = ({ email, password }: TUserData) => {
  console.log(email, password)
  return fetch(`${ServerConfig.baseUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => requestHandler(res))
}

// Обновить токен
export const refreshTokenRequest = () => {
  return fetch(`${ServerConfig.baseUrl}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then((res) => requestHandler(res))
}

// Обновить токен если истек
const fetchWithRefreshToken = (url: string, options: RequestInit) => {
  return fetch(url, options).then((res) => requestHandler(res))
    .catch((res: Response) => {
      return res.json()
    .then((err: TError) => {
      if (err?.message === 'jwt expired') {
        return refreshTokenRequest()
          .then(res => {
            localStorage.setItem('refreshToken', res.refreshToken)
            const authToken = res.accessToken.split('Bearer ')[1]
            setCookie('token', authToken);
            (options.headers as { [key: string]: string }).Authorization = res.accessToken
            return fetch(url, options).then((res) => requestHandler(res))
          })
      } else {
        deleteCookie('token')
        localStorage.removeItem('refreshToken')
        // eslint-disable-next-line
        location.reload()
        return Promise.reject(err)
      }
    })
  })
}

// Получение данных пользователя
export const getUserRequest = () => {
  return fetchWithRefreshToken(`${ServerConfig.baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...ServerConfig.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
}

// Обновление данных пользователя
export const updateUserRequest = (data: TUpdateUserData) => {
  return fetchWithRefreshToken(`${ServerConfig.baseUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...ServerConfig.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(data),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
}

// Запрос на смену пароля
export const forgotPasswordRequest = (email: string) => {
  return fetch(`${ServerConfig.baseUrl}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    body: JSON.stringify({ email }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res))
}

// Смена пароля
export const resetPasswordRequest = ({ password, token }: TResetPassword) => {
  return fetch(`${ServerConfig.baseUrl}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    body: JSON.stringify({ password, token }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res))
}

// Выход
export const signOutRequest = () => {
  return fetch(`${ServerConfig.baseUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: ServerConfig.headers,
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => requestHandler(res))
}

// Запрос на добавление заказа
export const addOrdersRequest = (ingredients: Array<string>) => {
  return fetchWithRefreshToken(`${ServerConfig.baseUrl}/orders`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...ServerConfig.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify({ ingredients }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
}


