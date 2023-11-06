import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response, Candy } from "../../types/api.types";

type InitialState = {
  value: {
    candyList: undefined | Response<Candy>
  }
}

type CandyListState = {
  candyList: Response<Candy> | undefined
}

type Payload = Response<Candy>

const initialState = {
  value: {
    candyList: undefined
  } as CandyListState
}  as InitialState

export const candyData = createSlice({
  name: 'candyData',
  initialState,
  reducers: {
    storeCandyList: (_state, action: PayloadAction<Payload>) => {
      return {
        value: {
          candyList: action.payload
        }
      }
    }
  }
})

export const { storeCandyList } = candyData.actions
export default candyData.reducer
