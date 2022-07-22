import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'

export interface Settings {
  land: { x: number; y: number; w: number; h: number }
  _3dMode: boolean
  viewState: number
  selectMode: boolean
  boughtedLandList: []
  reloadPage: boolean
  zoomIn: number
  zoomOut: number
  zoomLevel: number
  selectedLand: {}
}

const initialState: Settings = {
  land: { x: -1, y: -1, w: 10, h: 10 },
  _3dMode: false,
  viewState: 0,
  selectMode: true,
  boughtedLandList: [],
  reloadPage: true,
  zoomIn: 1,
  zoomOut: 1,
  zoomLevel: 1,
  selectedLand: {},
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
    setBoughtedLandList: (state, action: PayloadAction<[]>) => {
      state.boughtedLandList = action.payload
    },
    setReloadPage: (state, action: PayloadAction<boolean>) => {
      state.reloadPage = action.payload
    },
    setZoomIn: (state, action: PayloadAction<number>) => {
      state.zoomIn = action.payload
    },
    setZoomOut: (state, action: PayloadAction<number>) => {
      state.zoomOut = action.payload
    },
    setZoomLevel: (state, action: PayloadAction<number>) => {
      state.zoomLevel = action.payload
    },
    setSelectedLand: (state, action: PayloadAction<{}>) => {
      state.selectedLand = action.payload
    },
  },
})

export const {
  setLand,
  set_3dMode,
  setViewState,
  setSelectMode,
  setBoughtedLandList,
  setReloadPage,
  setZoomIn,
  setZoomOut,
  setZoomLevel,
  setSelectedLand,
} = counterSlice.actions

export const selectLand = (state: RootState) => state.settings.land
export const select_3dMode = (state: RootState) => state.settings._3dMode
export const selectViewState = (state: RootState) => state.settings.viewState
export const selectSelectMode = (state: RootState) => state.settings.selectMode
export const selectSelectLand = (state: RootState) =>
  state.settings.selectedLand
export const selectBoughtedLandList = (state: RootState) =>
  state.settings.boughtedLandList
export const selectReloadPage = (state: RootState) => state.settings.reloadPage
export const selectZoomIn = (state: RootState) => state.settings.zoomIn
export const selectZoomOut = (state: RootState) => state.settings.zoomOut
export const selectZoomLevel = (state: RootState) => state.settings.zoomLevel
export const setLandData =
  (view: any): AppThunk =>
  (dispatch) => {
    dispatch(setLand(view))
  }
export const setBoughtedLandListData =
  (view: []): AppThunk =>
  (dispatch) => {
    dispatch(setBoughtedLandList(view))
  }

export const set_3dModeData =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(set_3dMode(view))
  }

export const setSelectedLandData =
  (view: {}): AppThunk =>
  (dispatch) => {
    dispatch(setSelectedLand(view))
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

export const setReloadPageData =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setReloadPage(view))
  }

export const setZoomInData =
  (view: number): AppThunk =>
  (dispatch) => {
    dispatch(setZoomIn(view))
  }

export const setZoomOutData =
  (view: number): AppThunk =>
  (dispatch) => {
    dispatch(setZoomOut(view))
  }
export const setZoomLevelData =
  (view: number): AppThunk =>
  (dispatch) => {
    dispatch(setZoomLevel(view))
  }

export default counterSlice.reducer
