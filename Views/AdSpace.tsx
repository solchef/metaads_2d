import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import Link from 'next/link'
import axios from 'axios'

import { useWeb3Context } from '../context'
import {
  selectLand,
  selectReloadPage,
  selectShowMenu,
  selectZoomLevel,
  setBoughtedLandList,
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
    }
  }

  useEffect(() => {
    setZoomLevelState(zLevel)
  }, [zLevel])

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
  let mouseDown = false
  let mouseMove = false

  return (
    <>
      <Fragment>
        <section id="grid-section">
          <div className={`grid-canvas  ${showMenu && ' '}`}>
            <div
              ref={cAreaRef}
              className="canvas-box  hoverable"
              id="container"
              onMouseDown={() => {
                mouseDown = true
              }}
              onMouseUp={() => {
                mouseDown = false
              }}
              onMouseMove={() => {
                mouseMove = true
              }}
            >
              {reload ? <MapView /> : ''}
            </div>
          </div>
        </section>
      </Fragment>
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
