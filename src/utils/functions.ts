import { TIngredient, TIngredientWithProductId, TOrder, TSetCookieProps } from "../types";

// Установить куки
export const setCookie = (name: string, value: string | number | boolean, props?: TSetCookieProps) => {
    props = {
        path: '/',
        ...props,
    };
    let exp = props.expires;
    const d = new Date();
    if (typeof exp == 'number' && exp) {
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = Number(d);
    }
    if (exp && d.toUTCString) {
        props.expires = d.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
};

// Получить куки
export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Удалить куки
export const deleteCookie = (name: string) => {
  setCookie(name, false, { expires: -1 });
};

// Разбить на ингредиенты
export const filterArray = (arr: Array<TIngredient>) => {
  return arr.reduce(
  (acc: { [name: string]: Array<TIngredient> }, curr) => ({
    ...acc,
    [curr.type]: [...(acc[curr.type] || []), curr],
    }),
  {}
  );
};

// Итоговая стоимость заказа
export const totalCost = (bun: TIngredientWithProductId | null, arrOtherIngredients: Array<TIngredientWithProductId>) => {
  const bunPrice = bun ? bun.price : 0;
  return (
    bunPrice * 2 + arrOtherIngredients.reduce((acc, curr) => (acc += curr.price), 0)
  );
};

// Получить дату создания заказа
const getCardDate = (days: number) => (
  days === 0 ? 'Сегодня'
      : days === 1 ? 'Вчера'
      : days > 1 ? `${days} дня(-ей) назад`
      : 'Ooops, ошибочка вышла('
);

// Создать дату создания заказа
export const createCardDate = (date: string) => {
  const dayCreated: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime: number = Math.ceil((today.getTime() - dayCreated.getTime()) / (60 * 60 * 24 * 1000));
  const hours = dayCreated.getHours() > 9 ? dayCreated.getHours() : `0${dayCreated.getHours()}`
  const min = dayCreated.getMinutes() > 9 ? dayCreated.getMinutes() : `0${dayCreated.getMinutes()}`

  return `${getCardDate(diffTime)}, ${hours}:${min} i-GMT+${dayCreated.getTimezoneOffset() * (-1) / 60}`;
};

// Отсортировать заказ по статусу
export const filterOrdersByStatus = (arr: Array<TOrder>) => {
  return arr?.reduce((acc: { [name: string]: Array<TOrder> }, curr) => {
    curr.status === 'done' ? acc['done'] = [...acc['done'], curr] : acc['pending'] = [...acc['pending'], curr]
  return acc;
  }, { done: [], pending: [] })
}

// Получить статус заказа
export const getStatus = (status: string) => {
  return status === 'done'
    ? { text: 'Выполнен', textColor: 'green' }
    : status === 'pending'
    ? { text: 'Отменен', textColor: 'yellow' }
    : { text: 'Готовится', textColor: 'white' };
}

// Найти заказ
export const searchOrders = (arr: Array<TOrder>, id: string) => {
  return arr?.filter((el: TOrder) => el.number === Number(id))[0]
}

// Получить стоимость бургера
export const getPrice = (arr: Array<TIngredient>) => arr?.reduce((acc: number, curr: TIngredient) => acc += curr.price, 0)

// Получить ингредиенты бургера
export const getBurgerIngredients = (arrIdBurgerIngredients: Array<string>, arrAllIngredients: Array<TIngredient>) => (
  arrIdBurgerIngredients?.map((id: string) => (
    arrAllIngredients.filter((item: TIngredient) => item._id === id))))?.flat()
  type TGetBurgerIngredientsObjWithCountReduceAcc = {
  item: { [name: string]: TIngredient }, count: { [name: string]: number }
}

// Получить состав бургера
export const getBurgerIngredientsObjWithCount = (arr: Array<TIngredient>) => arr?.reduce((acc: TGetBurgerIngredientsObjWithCountReduceAcc, curr: TIngredient) => {
  const id = curr._id
  acc.item[id] = curr;
  acc.count[id] = (acc.count[id] || 0) + 1
  return acc
}
  , { item: {}, count: {} })