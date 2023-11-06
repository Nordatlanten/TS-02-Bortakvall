import { Candy } from "../types/api.types";

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
arr.reduce((groups, item) => {
  (groups[key(item)] ||= []).push(item);
  return groups;
}, {} as Record<K, T[]>);

export const checkBasketForItem = (a: Candy, basket: Candy[]) => {
  const entriesOfCandyInBasket = basket.filter(item => item == a)
  return entriesOfCandyInBasket
}

