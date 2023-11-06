import {configureStore} from '@reduxjs/toolkit'
import testReducer from './features/testSlice'
import candyDataReducer from './features/candyDataSlice'
import basketReducer from './features/basketSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    testReducer,
    candyDataReducer,
    basketReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
