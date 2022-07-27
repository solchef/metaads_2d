import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import Link from 'next/link'
import axios from 'axios'
// import {
//   fitScrean,
//   // getViewLocation,
//   // getZoomLevel,
//   // loadGrid,
//   // setBuyStateModal,
//   zoomIn,
//   zoomOut,
// } from './WebPages/canvesGrid'

import StepWizard from 'react-step-wizard'
import FormOne from '../components/section/FormOne'
import FormTwo from '../components/section/FormTwo'
import FormThree from '../components/section/FormThree'
import FormFour from '../components/section/FormFour'
import FormFive from '../components/section/FormFive'
import FormEditOne from '../components/edit-section/FormEditOne'
import FormEditTwo from '../components/edit-section/FormEditTwo'
import FormEditThree from '../components/edit-section/FormEditThree'
import FormEditFour from '../components/edit-section/FormEditFour'
import FormEditFive from '../components/edit-section/FormEditFive'
import { useWeb3Context } from '../context'
import {
  selectLand,
  selectReloadPage,
  selectShowMenu,
  selectZoomLevel,
  setBoughtedLandList,
  setReloadPage,
  setSelectedLand,
  setSelectMode,
  setShowMenu,
  setViewState,
  setZoomIn,
  setZoomLevel,
  setZoomOut,
  set_3dMode,
} from '../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../components/store/hooks'
import 'react-minimap/dist/react-minimap.css'
import { MetaadsContractUnsigned } from '../utils/readOnly'
import { MapView } from './WebPages/Map'

const AdSpace: React.FunctionComponent = () => {
  const { address, contracts } = useWeb3Context()
  const reload = useAppSelector(selectReloadPage)
  const zLevel = useAppSelector(selectZoomLevel)
  const [boughtedLandListData, setBoughtedLandListData] = useState([])
  const land = useAppSelector(selectLand)
  const [zoomLevelState, setZoomLevelState] = useState(1)
  // const viewPoint = getViewLocation()
  const { cAreaRef, squreInfo, setEnableBuy } = useCanvas()
  const dispatch = useAppDispatch()
  const [mintingData, setMintingData] = useState({
    walletQuads: [],
    otherQuads: [],
  })

  const {
    setSelectorHeight,
    setSelectorWidth,
    selectorHeight,
    selectorWidth,
    getMintImage,
  } = useCanvas()

  useEffect(() => {}, [land])
  useEffect(() => {
    axios.get('https://quadspace.io/api/info').then((data) => {
      dispatch(setBoughtedLandList(data.data.meta))
      setBoughtedLandListData(data.data.meta)
      // console.log(data.data.meta)
    })
  }, [])

  const loadMintingData = async () => {
    let walletNfts = []
    let allMintedIds = []

    if (address)
      walletNfts = await MetaadsContractUnsigned.getTokenIdsOfWallet(address)

    if (MetaadsContractUnsigned)
      allMintedIds = await MetaadsContractUnsigned.occupiedList()

    setMintingData({
      walletQuads: walletNfts,
      otherQuads: allMintedIds,
    })
    if (allMintedIds.length > 0) {
      // loadGrid({ walletQuads: walletNfts, otherQuads: allMintedIds })
    }
  }

  useEffect(() => {
    setZoomLevelState(zLevel)
  }, [zLevel])

  // useEffect(() => {
  //   setZoomLevel(getZoomLevel())
  //   // console.log(viewPoint)
  // }, [getZoomLevel()])

  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [show, setShow] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const [buyState, setBuyState] = useState(false)

  const offcanvasLeft = () => {
    setIsCanvasLeft(!isCanvasLeft)
  }

  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
    setIsCanvasLeft(false)
  }
  const [checked, setChecked] = useState(false)

  const [twoFeeTypes, setTwoFeeTypes] = useState(1)

  const addFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes + 1)
  const [threeD, setThreeD] = useState(true)
  const [stateBtn, setStateBtn] = useState('')
  const removeFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes - 1)
  const showMenu = useAppSelector(selectShowMenu)

  return (
    <>
      <Fragment>
        <section id="grid-section">
          <div className={`g-main ${showMenu && 'm-300 g-main-300 '}`}>
            <div
              ref={cAreaRef}
              className="canvas-box  hoverable"
              id="container"
              // onClick={() => {
              //   dispatch(setShowMenu(true))
              // }}
            >
              {/* <canvas id="adcanvass"></canvas> */}
              {reload ? <MapView /> : ''}
            </div>
          </div>
        </section>
      </Fragment>
      {/* {show && ( */}
      <PurchaseSection
        setSelectorHeight={setSelectorHeight}
        setSelectorWidth={setSelectorWidth}
        selectorHeight={selectorHeight}
        selectorWidth={selectorWidth}
        setIsCanvasLeft={setIsCanvasLeft}
        isCanvasLeft={isCanvasLeft}
        activeItem={squreInfo}
        enableBuy={buyState}
        setEnableBuy={setEnableBuy}
        getMintImage={getMintImage}
        offcanvasLeft={offcanvasLeft}
      />
      {/* )} */}
    </>
  )
}

export default AdSpace
