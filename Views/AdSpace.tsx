import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import Link from 'next/link'
import {
  fitScrean,
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
const AdSpace: React.FunctionComponent = () => {
  const { address, contracts } = useWeb3Context()
  const landData = useAppSelector(selectLand)

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
  const adscontract = contracts['metaads']

  const loadMintingData = async () => {
    let walletNfts = await adscontract.getTokenIdsOfWallet(address)
    let allMintedIds = await adscontract.occupiedList()
    setMintingData({ walletQuads: walletNfts, otherQuads: allMintedIds })
    if (allMintedIds.length > 0) {
      // console.log(allMintedIds)
      loadGrid({ walletQuads: walletNfts, otherQuads: allMintedIds })
    }
  }

  useEffect(() => {
    if (adscontract) {
      if (mintingData.walletQuads) {
        loadMintingData()
      }
    }
  }, [squreInfo, adscontract])

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

        <div className="controls pt-0 pe-2">
          <div className="d-flex gap-g flex-row-inverse justify-content-end align-items-center wrap-flow">
            <div className="d-flex flex-column hide-mobile">
              <span style={{ color: '#ff006f' }} className="text-nowrap">

                <b>

                  X{landData.x}Y{landData.y}
                </b>
              </span>

              <div className="mt-2">
                <span className="text-nowrap me-5">
                  <i className="bi bi-geo-alt"></i> {landData.x}X,
                  {landData.y}Y
                </span>
                <span className="text-nowrap me-5">
                  <i className="bi bi-person"></i>
                  {address
                    ? address.substring(0, 10) + '...'
                    : QuadSpaceContract.substring(0, 10) + '...'}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column hide-mobile me-2">

              <span style={{ color: '#ff006f' }} className="text-nowrap">

                <b>FOR SALE</b>
              </span>

              <div className="mt-2">
                <span className="text-nowrap">

                  <span className="text-nowrap">

                    <b>
                      <i className="bi bi-tag"></i> :
                    </b>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlSpace="preserve"
                      width="12px"
                      version="1.1"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 784.37 1277.39"
                    >
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer" />
                        <g id="_1421394342400">
                          <g>
                            <polygon
                              fill="#343434"
                              fillRule="nonzero"
                              points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                            />
                            <polygon
                              fill="#8C8C8C"
                              fillRule="nonzero"
                              points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                            />
                            <polygon
                              fill="#3C3C3B"
                              fillRule="nonzero"
                              points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                            />
                            <polygon
                              fill="#8C8C8C"
                              fillRule="nonzero"
                              points="392.07,1277.38 392.07,956.52 -0,724.89 "
                            />
                            <polygon
                              fill="#141414"
                              fillRule="nonzero"
                              points="392.07,882.29 784.13,650.54 392.07,472.33 "
                            />
                            <polygon
                              fill="#393939"
                              fillRule="nonzero"
                              points="0,650.54 392.07,882.29 392.07,472.33 "
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    0.000942 ( $ 1 )
                  </span>
                </span>

              </div>
            </div>


            <div className="buttons w-auto bo me-1 flex-nowrap">
              <button
                onClick={() => setIsCanvasLeft(true)}

                className={`btn btn-bi d-flex   ${!isCanvasLeft && 'active'} align-items-center w-100 position-relative m-0 btn-primary btn-lg `}
              >

                <i className="bi bi-cart-fill me-2"></i> <span className='text-nowrap hide-mobile'> Buy Mode</span> </button>

              <button
                onClick={() => setIsCanvasLeft(false)}

                className={`btn btn-bi d-flex flex-nowrap  ${isCanvasLeft && 'active'} align-items-center accordion w-100 position-relative  btn-primary `}
              >
                <i className="bi bi-arrows-move  me-2"></i><span className='text-nowrap hide-mobile'>View Mode</span> </button>

            </div>

            <div className="buttons  d-flex align-items-center  bo me-1 flex-nowrap">
              <button
                onClick={() => zoomIn()}
                className="btn btn-bi position-relative m-0 btn-primary btn-lg "
              >

                <i className="bi bi-caret-left-fill"></i></button>

              <div className="d-flex flex-md-row  flex-column">
                <button
                  onClick={() => zoomOut()}
                  className="btn btn-bi joy position-relative  btn-primary btn-lg "
                >
                  <i className="bi bi-caret-up-fill"></i></button>
                <button
                  onClick={() => zoomOut()}
                  className="btn btn-bi position-relative joy btn-primary btn-lg "
                >
                  <i className="bi bi-caret-down-fill"></i></button>
              </div>
              <button
                onClick={() => zoomOut()}
                className="btn btn-bi position-relative  btn-primary btn-lg "
              >
                <i className="bi bi-caret-right-fill"></i></button>
            </div>
            <div className="buttons bo  flex-nowrap">
              <button
                onClick={() => zoomIn()}
                className="btn btn-bi btn-primary m-0 btn-lg "
              >

                <i className="bi-zoom-out " />
              </button>

              <button
                className="btn btn-bi btn-primary x m-0 btn-lg "
              >
                X3
              </button>              <button
                onClick={() => zoomOut()}
                className="btn btn-bi btn-primary btn-lg "
              >
                <i className="bi-zoom-in " />
              </button>
            </div>
            <div className="buttons flex-nowrap ">





              <button
                onClick={() => fitScrean()}
                className="btn hoverable btn-primary btn-lg "
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
      />
      {/* )} */}
    </>
  )
}

export default AdSpace
