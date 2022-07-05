import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'

export interface Settings {
  land: { x: number; y: number; w: number; h: number }
}

const initialState: Settings = {
  land: { x: -1, y: -1, w: 10, h: 10 },
}

export const counterSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    setLand: (state, action: PayloadAction<any>) => {
      state.land = action.payload
    },
  },
})

export const { setLand } = counterSlice.actions

export const selectLand = (state: RootState) => state.settings.land

export const setLandData =
  (view: any): AppThunk =>
  (dispatch) => {
    dispatch(setLand(view))
  }

export default counterSlice.reducer
