import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response, Candy } from "../../types/api.types";

type InitialState = {
  value: {
    candyList: undefined | Response<Candy>,
    selectedCandy: Candy | null
  }
}

type CandyListState = {
  candyList: Response<Candy> | undefined,
  selectedCandy: Candy | null
}

type ResponsePayload = Response<Candy>

const initialState = {
  value: {
    candyList: undefined,
    selectedCandy: null
  } as CandyListState
}  as InitialState

export const candyData = createSlice({
  name: 'candyData',
  initialState,
  reducers: {
    storeCandyList: (state, action: PayloadAction<ResponsePayload>) => {
      return {
        value: {
          candyList: action.payload,
          selectedCandy: state.value.selectedCandy
        }
      }
    },
    selectCandyForDetailedView: (state, action: PayloadAction<Candy | null>) => {
      return {
        value: {
          candyList: state.value.candyList,
          selectedCandy: action.payload
        }
      }
    }
  }
})

export const { storeCandyList, selectCandyForDetailedView } = candyData.actions
export default candyData.reducer
