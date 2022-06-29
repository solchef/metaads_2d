import { useState, useEffect } from 'react'
import useCanvas from '../hooks/useCanvas'

const Space = () => {
  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const offcanvasRight = () => {
    setIsCanvasRight(!isCanvasRight)
    setIsCanvasLeft(false)
  }
  const offcanvasLeft = () => {
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasRight(false)
  }

  //   const board = useRef()

  useEffect(() => {
    // const context = board.current.getContext('2d')
    // context.scale(2000, 2000)
  }, [])
  const { cMiniRef, cAreaRef, zoomIn, zoomOut } = useCanvas()

  return (
    <>
      <section id="grid-section">
        <div className="controls">
          <div className="d-flex flex-row-inverse justify-content-end wrap-flow">
            <div className="buttons d-flex flex-row ">
              <button
                onClick={offcanvasRight}
                className="btn-primary text-nowrap  btn-buy-lot"
              >
                <i className="bi-cart me-1 " />
                BUY LOT
              </button>
              <button className="col hide-mobile btn btn-primary purp-btn btn-lg ">
                <i className="bi bi-border " />
              </button>
              <button className="col hide-mobile btn btn-primary purp-btn btn-lg ">
                <i className="bi bi-signpost-fill " />
              </button>
              <button className="col hide-mobile btn btn-primary purp-btn btn-lg ">
                <i className="bi bi-image " />
              </button>
              <button className="col hide-mobile btn btn-primary purp-btn btn-lg ">
                <i className="bi bi-box " />
              </button>
            </div>
            <div className="buttons ">
              {/* Example split danger button */}
              <button
                onClick={offcanvasLeft}
                className="btn btn-primary btn-lg "
              >
                <i className="bi bi-hand-index " />
              </button>
              <button
                data-bs-toggle="tooltip "
                data-bs-placement="bottom "
                title="Tooltip on top "
                className="btn btn-primary btn-lg "
              >
                <i className="bi-arrow-clockwise " />
              </button>
              <button
                data-bs-toggle="tooltip "
                data-bs-placement="bottom "
                title="Tooltip on top "
                className="btn btn-primary btn-lg "
              >
                <i className="bi-arrows-move " />
              </button>
              <button
                onClick={() => zoomIn()}
                className="btn btn-primary btn-lg "
              >
                {' '}
                <i className="bi-zoom-out " />
              </button>
              <button
                onClick={() => zoomOut()}
                className="btn btn-primary btn-lg "
              >
                <i className="bi-zoom-in " />
              </button>
              <button
                data-bs-toggle="tooltip "
                data-bs-placement="bottom "
                title="Tooltip on top "
                className="btn btn-primary btn-lg "
              >
                <i className="bi-fullscreen " />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="map-box hide-mobile" ref={cMiniRef}>
            <canvas id="minimap"></canvas>
          </div>
          <div className="canvas-box " ref={cAreaRef}>
            <div className="board ">
              <div className="boardd ">
                <canvas id="adcanvas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={`offcanvas offcanvas-start ${isCanvasRight && 'show'}`}
        data-bs-backdrop="false "
        style={{ visibility: ' visible' }}
      >
        <div className="mob offcanvas-header ">
          <button
            onClick={() => setIsCanvasRight(false)}
            className="btn-close text-reset "
          />
        </div>
        <div className="offcanvas-title hide-mobile hoverable ">
          <i className="bi-flag " />
          <h3>PurCHASE LAND</h3>
        </div>
        <div className="offcanvas-body d-flex flex-lg-column ">
          <div>
            <h3>ONE PARCELS</h3>
            <p>
              <i className="bi bi-bounding-box-circles " /> = 10 X 10 px = $1 =
              100 ft ²= <i className="bi bi-box " />
            </p>
            <hr />
            <form>
              <div className="input-group hoverable mb-2 ">
                <span className="input-group-text ">
                  <i className="bi-border " />
                </span>
                <input
                  type="text "
                  aria-label="x "
                  placeholder="X "
                  className="form-control "
                  defaultValue={10}
                />
                <input
                  type="text "
                  aria-label="y "
                  defaultValue={12}
                  placeholder="Y "
                  className="form-control value="
                />
              </div>
            </form>
            <p>
              You can <i className=" bi-arrows-move " /> your plot to desired
              location and purchase parcels.
            </p>
            <hr />
            <form>
              <div className="input-group hoverable mb-2 ">
                <span className="input-group-text ">
                  <i className="bi-geo-alt " />
                </span>
                <input
                  type="text "
                  aria-label="x "
                  placeholder="ENTER LOT NAME "
                  className="form-control "
                />
              </div>
            </form>
            <p>
              You can <i className="bi-arrows-move " /> your plot to desired
              location and purchase parcels.
            </p>
            <hr />
          </div>
          <div className="flex-column d-flex ">
            <a className="btn-primary hoverable btn-lg mb-3 w-100 " href="# ">
              <i className="bi-cart me-2 " />
              PURCHASE LOT
            </a>
            <p className="muted ">
              QTY: 120 Parcels <br /> PRCE: $120 (35ae)
              <br /> ADSPACE: 800px, QuadRooms: 12 000 ft2 Parcels: X112-Y76{' '}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`offcanvas offcanvas-end ${isCanvasLeft && 'show'}`}
        data-bs-backdrop="false "
        style={{ visibility: ' visible' }}
      >
        <div className="offcanvas-header ">
          <button
            className="btn-close text-reset "
            onClick={() => setIsCanvasLeft(false)}
          />
        </div>
        <div className="offcanvas-title hoverable ">
          <i className="bi bi-camera " />
        </div>
        <div className="offcanvas-body d-flex flex-lg-column ">
          <div>
            <h3 className="mt-4 ">
              <i className="bi bi-geo-alt " /> 72iy24{' '}
            </h3>
            <h3 className="mt-4 ">
              <i className="bi-border " /> 72iy24{' '}
            </h3>
            <h3 className="mt-4 ">
              <i className="bi bi-link-45deg " /> 72iy24{' '}
            </h3>
            <h3 className="mt-4 ">
              <i className="bi bi-person " /> 72iy24{' '}
            </h3>
            <hr />
            <h3 className="mt-4 ">Status : </h3>
            <h3 className="mt-4 ">Price :</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Space
