import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'

export interface Settings {
  land: { x: number; y: number; w: number; h: number }
  _3dMode: boolean
  viewState: number
  selectMode: boolean
}

const initialState: Settings = {
  land: { x: -1, y: -1, w: 10, h: 10 },
  _3dMode: false,
  viewState: 0,
  selectMode: true,
}

export const counterSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    setLand: (state, action: PayloadAction<any>) => {
      state.land = action.payload
    },
    set_3dMode: (state, action: PayloadAction<boolean>) => {
      state._3dMode = action.payload
    },
    setViewState: (state, action: PayloadAction<number>) => {
      state.viewState = action.payload
    },
    setSelectMode: (state, action: PayloadAction<boolean>) => {
      state.selectMode = action.payload
    },
  },
})

export const { setLand, set_3dMode, setViewState, setSelectMode } =
  counterSlice.actions

export const selectLand = (state: RootState) => state.settings.land
export const select_3dMode = (state: RootState) => state.settings._3dMode
export const selectViewState = (state: RootState) => state.settings.viewState
export const selectSelectMode = (state: RootState) => state.settings.selectMode

export const setLandData =
  (view: any): AppThunk =>
  (dispatch) => {
    dispatch(setLand(view))
  }

export const set_3dModeData =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(set_3dMode(view))
  }

export const setSelectModeData =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setSelectMode(view))
  }

export const setViewStateData =
  (view: number): AppThunk =>
  (dispatch) => {
    dispatch(setViewState(view))
  }
export default counterSlice.reducer
