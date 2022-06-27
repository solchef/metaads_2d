/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useWeb3Context } from '../context'
// import { useWeb3Context } from '../context'
// import useCanvas from '../hooks/useCanvas'

const AdSpace: React.FunctionComponent = (props) => {
  const { contracts, address } = useWeb3Context()
  const adscontract = contracts['metaads']
  const {
    canvasWidth,
    canvasHeight,
    adCanvas,
    zoomIn,
    zoomOut,
    setSelectorHeight,
    setSelectorWidth,
    selectorHeight,
    selectorWidth,
  } = useCanvas()
  const handle = useFullScreenHandle()
  const [toggle, setToggle] = useState(false)
  // const [totalCost, setTotalCost] = useState(0)

  const handleMint = async () => {
    console.log(contracts)
    console.log(adscontract.address)
    const selectedSqures = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    const quantSupplies = [].fill(selectedSqures.length, '1')
    const nameinput = 'Usernamechoice'
    const spacecoords = 'x,y'
    const identityImage = 'imageurl'
    console.log(adscontract.methods)
    const mint_spaces = await adscontract.methods.mintBatch(
      address,
      selectedSqures,
      quantSupplies,
      [nameinput, spacecoords, identityImage]
    )
    console.log(mint_spaces)
  }

  // useEffect(() => {
  //   // getHashes()
  //   // console.log(selected)
  //   setTotalCost(0.00082 * 1)
  // }, [selected])

  // const handleCanvasClick = (event) => {
  //   // on each click get current mouse location
  //   const currentCoord = { x: event.clientX, y: event.clientY }
  //   // add the newest mouse location to an array in state
  //   setCoordinates([...coordinates, currentCoord])
  // }

  // const handleClearCanvas = (event) => {
  //   setCoordinates([])
  // }

  const showBuy = () => {
    // alert('g')
    setToggle((toggle) => !toggle)
  }

  return (
    <>
      <section id="grid-section">
        {/* <FullScreen handle={handle}> */}
        <div className="container">
          <div className="controls d-flex flex-column justify-content-between align-items-end">
            <div className="filter hide-mobile d-flex ms-auto mb-3">
              <div className="checkbox checkbox-available">
                <input
                  id="checkboxAvailable"
                  className="styled"
                  type="checkbox"
                  defaultChecked
                  disabled
                />
                <label htmlFor="checkboxAvailable">Available to Buy</label>
              </div>
              <div className="checkbox checkbox-own">
                <input
                  id="checkboxOwn"
                  type="checkbox"
                  className="styled"
                  defaultChecked
                />
                <label htmlFor="checkboxOwn">PREMIUM ADSPACE</label>
              </div>
              <div className="checkbox checkbox-own">
                <input
                  id="checkboxOwn"
                  type="checkbox"
                  className="styled"
                  defaultChecked
                />
                <label htmlFor="checkboxOwn">I Already Own</label>
              </div>
              <div className="checkbox checkbox-sold">
                <input
                  id="checkboxSold"
                  type="checkbox"
                  className="styled"
                  defaultChecked
                />
                <label htmlFor="checkboxSold">Already Sold</label>
              </div>
            </div>
            <div className="d-flex flex-row-inverse wrap-flow">
              <div className="buttons hide-mobile d-flex flex-row ">
                <button
                  className="col btn btn-primary purp-btn btn-lg"
                  type="button"
                  data-bs-target="#offcanvasScrolling"
                  aria-controls="offcanvasScrolling"
                  data-bs-toggle="offcanvas"
                  data-bs-placement="bottom"
                  title="Tooltip on bottom"
                >
                  <i className="bi-flag" />
                </button>
                <button
                  className="col btn btn-primary purp-btn btn-lg"
                  disabled
                >
                  <i className="bi bi-border" />
                </button>
                <button
                  className="col btn btn-primary purp-btn btn-lg"
                  disabled
                >
                  <i className="bi bi-signpost-fill" />
                </button>
                <button
                  className="col btn btn-primary purp-btn btn-lg"
                  disabled
                >
                  <i className="bi bi-image" />
                </button>
                <button
                  className="col btn btn-primary purp-btn btn-lg"
                  disabled
                >
                  <i className="bi bi-box" />
                </button>
              </div>
              <div className="buttons">
                <a
                  className="btn btn-primary"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasTop"
                  role="button"
                  aria-controls="offcanvasTop"
                >
                  <span className="bi bi-arrow-down-up" />
                </a>
                <div className="btn-group show-mobile">
                  <button
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasScrolling"
                    aria-controls="offcanvasScrolling"
                    className="btn btn-bi btn-danger"
                  >
                    <i className="bi-flag" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-bi btn-danger dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {' '}
                      <button
                        className="col mb-3 btn btn-primary purp-btn btn-lg"
                        type="button"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                        data-bs-toggle="offcanvas"
                        data-bs-placement="bottom"
                        title="Tooltip on bottom"
                      >
                        <i className="bi-flag" />
                      </button>{' '}
                    </li>
                    <li>
                      {' '}
                      <button
                        className="col mb-3 btn btn-primary purp-btn btn-lg"
                        disabled
                      >
                        <i className="bi bi-border" />
                      </button>{' '}
                    </li>
                    <li>
                      {' '}
                      <button
                        className="col mb-3 btn btn-primary purp-btn btn-lg"
                        disabled
                      >
                        <i className="bi bi-signpost-fill" />
                      </button>{' '}
                    </li>
                    <li>
                      {' '}
                      <button
                        className="col mb-3 btn btn-primary purp-btn btn-lg"
                        disabled
                      >
                        <i className="bi bi-image" />
                      </button>{' '}
                    </li>
                    <li>
                      {' '}
                      <button
                        className="col btn btn-primary purp-btn btn-lg"
                        disabled
                      >
                        <i className="bi bi-box" />
                      </button>{' '}
                    </li>
                  </ul>
                </div>
                <button className="btn btn-primary btn-lg">
                  <i className="bi bi-hand-index" />
                </button>
                <button className="btn btn-primary btn-lg">
                  <i className="bi-arrow-clockwise" />
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => addSelector()}
                >
                  <i className="bi-arrows-move" />
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => zoomIn()}
                >
                  {' '}
                  <i className="bi-zoom-out" />
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => zoomOut()}
                >
                  <i className="bi-zoom-in" />
                </button>
                <button className="btn btn-primary btn-lg">
                  <i className="bi-fullscreen" />
                </button>
              </div>
            </div>
          </div>

          <div className="map">
            <div>
              <canvas id="minimap"></canvas>
            </div>
            <div className="data"></div>
          </div>
          <div>
            <div>
              <canvas
                id="adcanvas"
                width={canvasWidth}
                height={canvasHeight}
              ></canvas>
            </div>
          </div>
        </div>
        {/* </FullScreen> */}
      </section>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
        style={{ visibility: 'visible' }}
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header">
          <h3>
            <i className="bi-flag" />
          </h3>
          <h3>PurCHASE LAND</h3>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-title hide-mobile hoverable">
          <i className="bi-flag" />
          <h3>PurCHASE LAND</h3>
        </div>
        <div className="offcanvas-body">
          <h3>ONE PARCELS</h3>
          <p>
            <i className="bi bi-bounding-box-circles" /> = 10 X 10 px = $1 = 100
            ft ²= <i className="bi bi-box" />
          </p>
          <hr />
          <form>
            <div className="input-group hoverable mb-2">
              <span className="input-group-text ">
                <i className="bi-border" />
              </span>
              <input
                type="text"
                aria-label="x"
                placeholder="X"
                onChange={(e) => setSelectorWidth(e.target.value)}
                className="form-control"
                defaultValue={10}
              />
              <input
                type="text"
                aria-label="y"
                defaultValue={10}
                placeholder="Y"
                onChange={(e) => setSelectorHeight(e.target.value)}
                className="form-control value="
              />
            </div>
          </form>
          <p>
            You can <i className="bi-arrows-move" /> your plot to desired
            location and purchase parcels.
          </p>
          <hr />
          <div className="flex-column d-flex">
            <button
              className="btn-primary hoverable btn-lg mb-3 w-100"
              onClick={() => handleMint()}
              // href="#"
            >
              <i className="bi-cart me-2" />
              PURCHASE PLOT
            </button>
            <p className="muted">
              QTY:120 Parcels <br /> PRCE: $120 (35ae)
              <br /> ADSPACE: 800px, QuadRooms: 12'000ft2 Parcels: X112-Y76{' '}
            </p>
          </div>
        </div>
      </div>
      <div
        data-bs-scroll="true"
        className="offcanvas show-mobile offcanvas-top"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasTopLabel">filter</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="filter flex-column d-flex ms-auto ">
            <div className="mb-3 checkbox checkbox-available">
              <input
                id="checkboxAvailable"
                className="styled"
                type="checkbox"
                defaultChecked
                disabled
              />
              <label htmlFor="checkboxAvailable">Available to Buy</label>
            </div>
            <div className="mb-3 checkbox checkbox-own">
              <input
                id="checkboxOwn"
                type="checkbox"
                className="styled"
                defaultChecked
              />
              <label htmlFor="checkboxOwn">PREMIUM ADSPACE</label>
            </div>
            <div className="mb-3 checkbox checkbox-own">
              <input
                id="checkboxOwn"
                type="checkbox"
                className="styled"
                defaultChecked
              />
              <label htmlFor="checkboxOwn">I Already Own</label>
            </div>
            <div className="checkbox checkbox-sold">
              <input
                id="checkboxSold"
                type="checkbox"
                className="styled"
                defaultChecked
              />
              <label htmlFor="checkboxSold">Already Sold</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdSpace
