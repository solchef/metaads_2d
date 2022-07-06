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
import Minimap, { Child as ChildComponent } from "react-minimap";
import "react-minimap/dist/react-minimap.css";
const AdSpace: React.FunctionComponent = () => {
  const { address, contracts } = useWeb3Context()
  const landData = useAppSelector(selectLand)

  const { cAreaRef, squreInfo, setEnableBuy } = useCanvas()

  const {
    setSelectorHeight,
    setSelectorWidth,
    selectorHeight,
    selectorWidth,
    getMintImage,
  } = useCanvas()

  useEffect(() => {
    loadGrid()
  }, [squreInfo])
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
    // console.log(buyState)
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
          <div className="container-fluid">
            <div className="controls g-n align-items-center pe-3 ps-3" id="buy-quads">
              <div className="d-flex flex-row-inverse justify-content-between align-items-center wrap-flow">
                <div className="row">
                  <div className="col-xl-10 col-12 pe-5">
                    <span style={{ color: '#ff006f' }} className="text-nowrap">
                      {' '}
                      <b>
                        {' '}
                        X{landData.x}Y{landData.y}
                      </b>{' '}
                    </span>

                    <div className="mt-2">
                      <span className="text-nowrap me-5">
                        <i className="bi bi-geo-alt"></i> {landData.x}X,{' '}
                        {landData.y}Y
                      </span>
                      <span className="text-nowrap me-5">
                        <i className="bi bi-person"></i>{' '}
                        {address
                          ? address.substring(0, 10) + '...'
                          : QuadSpaceContract.substring(0, 10) + '...'}
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-2 col-12">
                    <span style={{ color: '#ff006f' }} className="text-nowrap">
                      {' '}
                      <b>FOR SALE</b>{' '}
                    </span>
                    <br />
                    <div className="mt-2">
                      <span className="text-nowrap">
                        {' '}
                        <span className="text-nowrap">
                          {' '}
                          <b>
                            <i className="bi bi-tag"></i> :{' '}
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
                          </svg>{' '}
                          0.000942 ( $ 1 )
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <label className="switch">
                  <input type="checkbox"
                    checked={!checked}
                    onClick={() => setChecked(!checked)}
                  />
                  <span className="slider round"></span>
                </label>
                <div className="buttons flex-nowrap ">
                  <button
                    onClick={offcanvasLeft}
                    className="btn text-nowrap btn-primary hoverable purp-btn btn-lg btn-buy hide-mobile"
                  >
                    <i className="bi-cart me-2 " />
                    BUY QUADS LOT
                  </button>
                  <button
                    onClick={() => fitScrean()}
                    className="btn hoverable btn-primary btn-lg "
                  >
                    <i className="bi-arrow-clockwise " />
                  </button>
                  <button
                    onClick={() => zoomIn()}
                    className="btn btn-primary btn-lg hoverable"
                  >
                    {' '}
                    <i className="bi-zoom-out " />
                  </button>
                  <button
                    onClick={() => zoomOut()}
                    className="btn btn-primary btn-lg hoverable"
                  >
                    <i className="bi-zoom-in " />
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
           <Minimap
              selector=".box"
              keepAspectRatio={checked}
            >
              <div
                ref={cAreaRef}
                className="canvas-box  hoverable"
                id="container"
              >
                <canvas id="adcanvass"></canvas>
              </div>

            </Minimap>
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
      />
      {/* )} */}
    </>
  )
}

export default AdSpace
