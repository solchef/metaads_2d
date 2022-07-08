import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import Link from 'next/link'
import {
  fitScrean,
  getViewLocation,
  getZoomLevel,
  loadGrid,
  setBuyStateModal,
  zoomIn,
  zoomOut,
} from './WebPages/canvesGrid'
import { useWeb3Context } from '../context'
import { QuadSpaceContract } from '../utils/constants'
import { selectLand } from '../components/reducers/Settings'
import { useAppSelector } from '../components/store/hooks'
import Minimap, { Child as ChildComponent } from 'react-minimap'
import 'react-minimap/dist/react-minimap.css'
import { MetaadsContractUnsigned } from '../utils/readOnly'
const AdSpace: React.FunctionComponent = () => {
  const { address, contracts } = useWeb3Context()
  const landData = useAppSelector(selectLand)
  const zoomlevel = getZoomLevel()
  const viewPoint = getViewLocation()
  const { cAreaRef, squreInfo, setEnableBuy } = useCanvas()
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
      loadGrid({ walletQuads: walletNfts, otherQuads: allMintedIds })
    }
  }

  useEffect(() => {
    loadMintingData()
  }, [squreInfo])

  useEffect(() => {
    // console.log(viewPoint)
  }, [viewPoint])

  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [show, setShow] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const [buyState, setBuyState] = useState(false)

  const offcanvasLeft = () => {
    setBuyState(!buyState)
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasRight(false)
    setIsCanvasBottem(false)
    setBuyStateModal(!buyState)
    // loadGrid(mintingData)
  }

  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
    setIsCanvasLeft(false)
  }
  const [checked, setChecked] = useState(false)

  return (
    <>
      <Fragment>
        <section id="grid-section" className="show-mobile">
          <div className="container-fluid d-flex justify-content-center  mobile-grid-button">
            <Link href="/space">
              <a className="btn-primary hoverable btn-lg">
                <i className="bi bi-grid-3x3 me-2" />
                BUY QUADS FOR $1
              </a>
            </Link>
          </div>
        </section>

        <section id="grid-section" className="hide-mobile">
          <div className="controls">
            <div className="d-flex gap-g flex-row-inverse justify-content-between align-items-center wrap-flow">
              <div className="left-controls d-flex">
                <div className="d-flex flex-column hide-mobile">
                  <span
                    className="text-nowrap"
                    style={{ color: 'rgb(255, 0, 111)' }}
                  >
                    <b>
                      X{viewPoint.x}Y{viewPoint.y}
                    </b>
                  </span>
                  <div className="mt-2">
                    <span className="text-nowrap me-4">
                      <i className="bi bi-geo-alt me-1" />
                      {viewPoint.x}X,
                      {viewPoint.y}Y
                    </span>
                    <span className="text-nowrap me-4">
                      <i className="bi bi-person me-2" />
                      {address
                        ? address.substring(0, 10) + '...'
                        : QuadSpaceContract.substring(0, 10) + '...'}
                    </span>
                    <span className="text-nowrap me-4">
                      <b>
                        <i className="bi bi-tag me-2" />
                      </b>
                      0.000942 ETH
                    </span>
                    <span className="text-nowrap">
                      <b>
                        <img
                          src="assets/images/sell_icon.png"
                          className="me-2"
                          style={{ width: '17px', marginTop: '-7px' }}
                        />
                      </b>
                      FOR SALE
                    </span>
                  </div>
                </div>
              </div>
              <div className="right-controls d-flex">
                <div className="buttons w-auto bo me-2 flex-nowrap">
                  <button
                    onClick={() => offcanvasLeft()}
                    disabled={isCanvasLeft}
                    className={`btn btn-bi d-flex toggle-mode align-items-center w-100 position-relative m-0 btn-primary btn-lg  ${
                      isCanvasLeft && 'active'
                    }  `}
                    style={{}}
                  >
                    <i
                      className="bi bi-cart-fill me-2"
                      // style={{ marginTop: '-5px' }}
                    />{' '}
                    <span className="text-nowrap hide-mobile"> Buy Mode</span>
                  </button>
                  <button
                    onClick={() => offcanvasLeft()}
                    disabled={!isCanvasLeft}
                    className={`btn btn-bi d-flex flex-nowrap toggle-mode  ${
                      !isCanvasLeft && 'active'
                    } align-items-center accordion w-100 position-relative btn-primary `}
                    style={{}}
                  >
                    <i className="bi bi-arrows-move me-2" />
                    <span className="text-nowrap hide-mobile">View Mode</span>
                  </button>
                </div>
                <div className="buttons bo flex-nowrap">
                  <button
                    className="btn btn-bi hoverable btn-primary m-0 btn-lg "
                    onClick={() => zoomIn()}
                  >
                    <i className="bi-zoom-out" />
                  </button>
                  <button
                    className="btn btn-bi  m-0 btn-lg "
                    style={{ color: '#fff' }}
                  >
                    {zoomlevel}
                  </button>
                  <button
                    className="btn btn-bi btn-primary hoverable btn-lg "
                    onClick={() => {
                      zoomOut()
                    }}
                  >
                    <i className="bi-zoom-in " />
                  </button>
                </div>
                <div className="buttons flex-nowrap ">
                  <button
                    className="btn hoverable btn-primary btn-lg "
                    onClick={() => fitScrean(mintingData)}
                  >
                    <i className="bi-arrow-clockwise " />
                  </button>
                  <Link href="/space">
                    <button className="btn btn-primary btn-lg hoverable">
                      <i className="bi-fullscreen " />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="g-main g-s">
            {/* <Minimap
              selector=".box"
              keepAspectRatio={checked}
            > */}

            <div
              ref={cAreaRef}
              className="canvas-box  hoverable"
              id="container"
            >
              <canvas id="adcanvass"></canvas>
            </div>

            {/* </Minimap> */}
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
