/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import useCanvas from '../hooks/useCanvas'
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useWeb3Context } from '../context'
// import { useWeb3Context } from '../context'
// import useCanvas from '../hooks/useCanvas'

const AdSpace: React.FunctionComponent = (props) => {
  const { contracts, address } = useWeb3Context()
  const adscontract = contracts['metaads']
  const { canvasWidth, canvasHeight, cAreaRef, zoomIn, zoomOut } = useCanvas()
  // const [totalCost, setTotalCost] = useState(0)

  const handleMint = async () => {
    console.log(contracts)
    console.log(adscontract.address)
    const selectedSqures = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    const quantSupplies = [].fill(selectedSqures.length, '1')
    const nameinput = 'Usernamechoice'
    const spacecoords = 'x,y'
    const identityImage = 'imageurl'
    // console.log(adscontract.methods)
    const mint_spaces = await adscontract.methods.mintBatch(
      address,
      selectedSqures,
      quantSupplies,
      [nameinput, spacecoords, identityImage]
    )
    console.log(mint_spaces)
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
                  // onClick={() => addSelector()}
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
          <div ref={cAreaRef}>
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
    </>
  )
}

export default AdSpace
