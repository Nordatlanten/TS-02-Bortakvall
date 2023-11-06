import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Candy } from "../../types/api.types";

type InitialState = {
  value: {
    basket: Candy[],
    showBasket: boolean
  }
}

type BasketState = {
  basket: Candy[],
  showBasket: boolean
}


const initialState = {
  value: {
    basket: [] as Candy[],
    showBasket: false
  } as BasketState
}  as InitialState

export const basketData = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Candy>) => {
      return {
        value: {
          basket: [...state.value.basket, action.payload],
          showBasket: state.value.showBasket
        }
      }
    },
    updateBasket: (state, action: PayloadAction<Candy[]>) => {
      return {
        value: {
          basket: action.payload,
          showBasket: state.value.showBasket
        }
      }
    },
    toggleDisplayBasket: (state) => {
      return {
        value: {
          basket: state.value.basket,
          showBasket: !state.value.showBasket
        }
      }
    },
    hideBasket: (state) => {
      return {
        value: {
          basket: state.value.basket,
          showBasket: false
        }
      }
    }
  }
})

export const { addToBasket, updateBasket, toggleDisplayBasket, hideBasket } = basketData.actions
export default basketData.reducer
