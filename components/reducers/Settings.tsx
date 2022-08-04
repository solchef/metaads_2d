import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'

export interface Settings {
  land: { x: number; y: number; w: number; h: number }
  _3dMode: boolean
  viewState: number
  selectMode: boolean
  showMenu: boolean
  boughtedLandList: []
  reloadPage: boolean
  zoomIn: number
  zoomOut: number
  zoomLevel: number
  selectedLand: {}
  menuView: boolean
  clickMint: boolean
  balance: number
  image: {}
  parcel: {
    data: boolean
    name: string
    coords: string
    width: number
    height: number
    image: string
    status: string
    url: string
    description: string
    position: number
  }
  mintingStatus: string
  quadPrice: number
  miniMapPosition: {}
}

const initialState: Settings = {
  land: { x: -1, y: -1, w: 1, h: 1 },
  _3dMode: false,
  viewState: 0,
  showMenu: true,
  selectMode: true,
  boughtedLandList: [],
  reloadPage: true,
  zoomIn: 1,
  zoomOut: 1,
  zoomLevel: 1,
  selectedLand: {},
  menuView: false,
  clickMint: false,
  balance: 0.0,
  image: {},
  parcel: {
    data: false,
    name: 'quad',
    coords: '-1 , -1',
    width: 0,
    height: 0,
    image: '',
    status: 'Available',
    url: '#',
    description: '',
    position: 0,
  },
  mintingStatus: null,
  quadPrice: 0.0,
  miniMapPosition: { x: 0, y: 0 },
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
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload
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
    setMenuView: (state, action: PayloadAction<boolean>) => {
      state.menuView = action.payload
    },
    setBalance: (state, action: PayloadAction<any>) => {
      state.balance = action.payload
    },

    setParcel: (state, action: PayloadAction<any>) => {
      state.parcel = action.payload
    },
    setMintStatus: (state, action: PayloadAction<any>) => {
      state.mintingStatus = action.payload
    },
    setClickMint: (state, action: PayloadAction<boolean>) => {
      state.clickMint = action.payload
    },
    setquadPrice: (state, action: PayloadAction<any>) => {
      state.quadPrice = action.payload
    },
    setMiniMapPosition: (state, action: PayloadAction<{}>) => {
      state.miniMapPosition = action.payload
    },
    setImage: (state, action: PayloadAction<{}>) => {
      state.image = action.payload
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
  setShowMenu,
  setZoomOut,
  setZoomLevel,
  setSelectedLand,
  setMenuView,
  setBalance,
  setParcel,
  setMintStatus,
  setClickMint,
  setquadPrice,
  setMiniMapPosition,
  setImage,
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
export const selectShowMenu = (state: RootState) => state.settings.showMenu
export const selectZoomIn = (state: RootState) => state.settings.zoomIn
export const selectZoomOut = (state: RootState) => state.settings.zoomOut
export const selectZoomLevel = (state: RootState) => state.settings.zoomLevel
export const selectMenuView = (state: RootState) => state.settings.menuView
export const getBalance = (state: RootState) => state.settings.balance
export const getParcel = (state: RootState) => state.settings.parcel
export const getMintingstatus = (state: RootState) =>
  state.settings.mintingStatus
export const selectClickMint = (state: RootState) => state.settings.clickMint
export const getQuadPrice = (state: RootState) => state.settings.quadPrice
export const selectMiniMapPosition = (state: RootState) =>
  state.settings.miniMapPosition
export const selectImage = (state: RootState) => state.settings.image

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

export const setMenuViewData =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setMenuView(view))
  }

export const setSelectedLandData =
  (view: {}): AppThunk =>
  (dispatch) => {
    dispatch(setSelectedLand(view))
  }

export const setMiniMapPositionData =
  (view: {}): AppThunk =>
  (dispatch) => {
    dispatch(setMiniMapPosition(view))
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
export const setUserBalance =
  (view: number): AppThunk =>
  (dispatch) => {
    dispatch(setBalance(view))
  }
export const setParcelDetails =
  (view: any): AppThunk =>
  (dispatch) => {
    dispatch(setParcel(view))
  }
export const setMintingstatus =
  (view: any): AppThunk =>
  (dispatch) => {
    dispatch(setMintStatus(view))
  }
export const setImageData =
  (view: {}): AppThunk =>
  (dispatch) => {
    dispatch(setImage(view))
  }

export const setClickMintData =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setClickMint(view))
  }

export const setQuadPriceCurrent =
  (view: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setQuadPrice(view))
  }

export default counterSlice.reducer
