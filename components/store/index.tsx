import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import settings from '../reducers/Settings'

export const store = configureStore({
  reducer: {
    settings: settings,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
