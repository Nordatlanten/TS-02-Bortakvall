import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Candy } from "../../types/api.types";

type InitialState = {
  value: {
    basket: Candy[] ,
    showBasket: boolean, 
    readyForCheckout: boolean
  }
}

type BasketState = {
  basket: Candy[],
  showBasket: boolean,
  readyForCheckout: boolean
}


const initialState = {
  value: {
    basket: [] as Candy[],
    showBasket: false,
    readyForCheckout: false
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
          showBasket: state.value.showBasket,
          readyForCheckout: state.value.readyForCheckout
        }
      }
    },
    updateBasket: (state, action: PayloadAction<Candy[]>) => {
      return {
        value: {
          basket: action.payload,
          showBasket: state.value.showBasket,
          readyForCheckout: state.value.readyForCheckout
        }
      }
    },
    emptyBasket: (state) => {
      return {
        value: {
          basket: [] as Candy[],
          showBasket: state.value.showBasket,
          readyForCheckout: state.value.readyForCheckout
        }
      }
    },
    toggleDisplayBasket: (state) => {
      return {
        value: {
          basket: state.value.basket,
          showBasket: !state.value.showBasket,
          readyForCheckout: state.value.readyForCheckout
        }
      }
    },
    hideBasket: (state) => {
      return {
        value: {
          basket: state.value.basket,
          showBasket: false,
          readyForCheckout: state.value.readyForCheckout
        }
      }
    },
    toggleReadyForCheckout: (state) => {
      return {
        value: {
          basket: state.value.basket,
          showBasket: state.value.showBasket,
          readyForCheckout: !state.value.readyForCheckout
        }
      }
    }
  }
})

export const { addToBasket, updateBasket, toggleDisplayBasket, hideBasket, toggleReadyForCheckout, emptyBasket } = basketData.actions
export default basketData.reducer
