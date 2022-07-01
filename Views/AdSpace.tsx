import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import SpaceDetails from './WebPages/SpaceDetails'
import Link from 'next/link'
import { useWeb3Context } from '../context'
import { QuadSpaceContract } from '../utils/constants'

const AdSpace: React.FunctionComponent = () => {
  const { address, contracts } = useWeb3Context()

  const { cAreaRef, zoomIn, zoomOut, addSelector, squreInfo, resetPlane } =
    useCanvas()

  useEffect(() => {
    // console.log(squreInfo)
  }, [squreInfo])
  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [show, setShow] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const adscontract = contracts['metaads']
  const offcanvasRight = () => {
    setShow(false)
    offcanvasBottem()
    setIsCanvasRight(!isCanvasRight)
    setIsCanvasLeft(false)
  }
  const offcanvasLeft = () => {
    // console.log(squreInfo.x)
    setShow(true)
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasRight(false)
    setIsCanvasBottem(false)
  }
  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
    setIsCanvasLeft(false)
  }
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
            <div className="controls align-items-center" id="buy-quads">
              <div className="d-flex flex-row-inverse justify-content-between align-items-center wrap-flow">
                <div className="row">
                  <div className="col-xl-10 col-12 pe-5">
                    <span  style={{color:'#ff006f'}} className='text-nowrap'> <b> &lt; LOT NAME &gt; </b> </span>
               
                    <div className="mt-2">
                      <span className="text-nowrap me-5">
                        <i className="bi bi-geo-alt"></i> {squreInfo.x}X,{' '}
                        {squreInfo.y}Y
                      </span>
                      <span className="text-nowrap me-5">
                        <i className="bi bi-person"></i>{' '}
                        {address
                          ? address.substring(0, 10) + '...'
                          : QuadSpaceContract}
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
                            width="15px"
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
                          &nbsp;0.000942 ( $ 1 )
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="buttons flex-nowrap ">
                  <button
                    onClick={offcanvasLeft}
                    className="btn text-nowrap btn-primary hoverable purp-btn btn-lg btn-buy hide-mobile"
                  >
                    <i className="bi-cart me-2 " />
                    BUY QUADS LOT
                  </button>
                  <button
                    onClick={() => resetPlane()}
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

            <div className="canvas-box ratio-1x1 hoverable">
              <div ref={cAreaRef}>
                <canvas id="adcanvas"></canvas>
              </div>
            </div>
          </div>
        </section>
      </Fragment>

      <PurchaseSection
        setIsCanvasLeft={setIsCanvasLeft}
        isCanvasLeft={isCanvasLeft}
        activeItem={squreInfo}
      />
    </>
  )
}

export default AdSpace
