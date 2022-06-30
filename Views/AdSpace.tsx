import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import SpaceDetails from './WebPages/SpaceDetails'
import Link from 'next/link'

const AdSpace: React.FunctionComponent = () => {
  const { cAreaRef, zoomIn, zoomOut, addSelector, squreInfo, resetPlane } =
    useCanvas()

  useEffect(() => {
    console.log(squreInfo)
  }, [squreInfo])
  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [show, setShow] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
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
          <div className="container d-flex justify-content-center  mobile-grid-button">
            <Link href="/space">
              <a className="btn-primary hoverable btn-lg">
                <i className="bi bi-grid-3x3 me-2" />
                BUY QUADS FOR $1
              </a>
            </Link>
          </div>
        </section>

        <section id="grid-section" className="hide-mobile">
          <div className="container">
            <div className="controls align-items-center" id="buy-quads">
              <div className="d-flex flex-row-inverse justify-content-between align-items-center wrap-flow">
                <div className="buttons d-flex flex-row ">
                  <div>
                    {/* <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingg" aria-controls="offcanvasScrollingg" className="btn btn-primary purp-btn btn-lg btn-buy hide-mobile"><i className="bi-cart me-2 " />BUY QUADS LOT</button> */}
                    <button
                      onClick={offcanvasLeft}
                      className="btn btn-primary hoverable purp-btn btn-lg btn-buy hide-mobile"
                    >
                      <i className="bi-cart me-2 " />
                      BUY QUADS LOT
                    </button>
                  </div>

                  <button
                    className="col hoverable hide-mobile btn btn-primary purp-btn btn-lg "
                    disabled
                  >
                    <i className="bi bi-border " />
                  </button>
                  <button className="col hoverable hide-mobile btn btn-primary purp-btn btn-lg disabled">
                    <i className="bi bi-signpost-fill " />
                  </button>
                  <button className="col hoverable hide-mobile btn btn-primary purp-btn btn-lg disabled">
                    <i className="bi bi-image " />
                  </button>
                  <button className="col hoverable hide-mobile btn btn-primary purp-btn btn-lg disabled">
                    <i className="bi bi-box " />
                  </button>
                </div>
                <div className="buttons ">
                  <button
                    onClick={offcanvasRight}
                    className="btn hoverable btn-primary btn-lg"
                  >
                    <i className="bi bi-hand-index " />
                  </button>
                  <button
                    onClick={() => resetPlane()}
                    className="btn hoverable btn-primary btn-lg "
                  >
                    <i className="bi-arrow-clockwise " />
                  </button>
                  <button
                    onClick={() => addSelector()}
                    className="btn btn-primary btn-lg hoverable"
                  >
                    <i className="bi-arrows-move " />
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
      {show && (
        <PurchaseSection
          setIsCanvasLeft={setIsCanvasLeft}
          isCanvasLeft={isCanvasLeft}
          activeItem={squreInfo}
        />
      )}
      {!show && (
        <SpaceDetails
      offcanvasRight={offcanvasRight}

          setIsCanvasRight={setIsCanvasRight}
          isCanvasRight={isCanvasRight}
        />
      )}
    </>
  )
}

export default AdSpace
