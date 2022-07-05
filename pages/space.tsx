import { useState, useEffect } from 'react'
import useCanvas from '../hooks/useCanvas'
import StepWizard from 'react-step-wizard'
import FormOne from '../components/FormOne'
import FormTwo from '../components/FormTwo'
import FormThree from '../components/FormThree'
import FormFour from '../components/FormFour'
import PurchaseSection from '../Views/WebPages/PurchaseSection'
import SpaceDetails from '../Views/WebPages/SpaceDetails'
import Link from 'next/link'
import { useWeb3Context } from '../context'
import { QuadSpaceContract } from '../utils/constants'
import {
  fitScrean,
  loadGrid,
  setBuyStateModal,
  zoomIn,
  zoomOut,
} from '../Views/WebPages/canvesGrid'
const Space = () => {
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const [userLandName, setUserLandName] = useState('')
  const { address, contracts } = useWeb3Context()
  const {
    cAreaRef,
    squreInfo,
    setSelectorWidth,
    setSelectorHeight,
    selectorWidth,
    selectorHeight,
    getMintImage,
    enableBuy,
    setEnableBuy,
  } = useCanvas()

  const offcanvasLeft = () => {
    setEnableBuy(!enableBuy)
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasBottem(false)
    setBuyStateModal(enableBuy)
  }
  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
  }

  useEffect(() => {
    loadGrid()
  }, [squreInfo])
  const [twoFeeTypes, setTwoFeeTypes] = useState(1)

  const addFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes + 1)

  const removeFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes - 1)

  return (
    <>
      <section className="mt-0 position-fixed grid-section" id="grid-section">
        <div className="controls pt-0  pe-3 ps-3 align-items-center">
          <div className="d-flex flex-row-inverse justify-content-end justify-content-md-between align-items-center wrap-flow">
            <div className="row d-flex flex-column flex-xl-row hide-mobile">
              <div className="col-10 pe-5">
                <span style={{ color: '#ff006f' }} className="text-nowrap">
                  {' '}
                  <b>
                    Y{squreInfo.y}x{squreInfo.x}
                  </b>{' '}
                </span>
                <div className="mt-2 mb-2">
                  <span className="text-nowrap me-5">
                    <i className="bi bi-geo-alt"></i> {squreInfo.x}X,{' '}
                    {squreInfo.y}Y
                  </span>
                  <span className="text-nowrap me-5">
                    <i className="bi bi-person"></i> X05023...
                  </span>
                </div>
              </div>
              <div className="col-2">
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

            <div className="buttons flex-nowrap ">
              <button
                onClick={offcanvasLeft}
                className="btn text-nowrap btn-primary hoverable purp-btn btn-lg btn-buy hide-mobile"
              >
                <i className="bi-cart me-2 " />
                BUY QUADS LOT
              </button>
              <button
                onClick={offcanvasBottem}
                className="btn text-nowrap btn-primary hoverable purp-btn btn-lg btn-buy show-mobile"
              >
                <i className="bi-cart " />
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

        <div
          ref={cAreaRef}
          className="canvas-box fullscrean  ratio-1x1 hoverable"
          id="container"
        >
          <canvas id="adcanvass"></canvas>
        </div>
      </section>
      <PurchaseSection
        setSelectorHeight={setSelectorHeight}
        setSelectorWidth={setSelectorWidth}
        selectorHeight={selectorHeight}
        selectorWidth={selectorWidth}
        setIsCanvasLeft={setIsCanvasLeft}
        isCanvasLeft={isCanvasLeft}
        activeItem={squreInfo}
        enableBuy={enableBuy}
        setEnableBuy={setEnableBuy}
        getMintImage={getMintImage}
      />

      <div className="space-details show-mobile p-3">
        <span style={{ color: '#ff006f' }} className="text-nowrap ">
          {' '}
          <b>
            {' '}
            Y{squreInfo.y}x{squreInfo.x}{' '}
          </b>{' '}
        </span>

        <div className="d-flex justify-content-between mt-3">
          <div className="">
            <div className="">
              <span className="text-nowrap me-5">
                <i className="bi bi-geo-alt"></i> {squreInfo.x}X, {squreInfo.y}Y
              </span>
              <div className="mt-3">
                <span className="text-nowrap me-5">
                  <i className="bi bi-person"></i>{' '}
                  {address
                    ? address.substring(0, 10) + '...'
                    : QuadSpaceContract.substring(0, 10) + '...'}
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <span style={{ color: '#ff006f' }} className="text-nowrap">
              {' '}
              <b>FOR SALE</b>{' '}
            </span>
            <br />
            <div className="mt-3">
              <span className="text-nowrap">
                {' '}
                <span className="text-nowrap">
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
                  &nbsp; 0.000942 ( $ 1 )
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`accordion show-mobile show ${
          isCanvasBottem ? '' : 'showw'
        }`}
      >
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button
              onClick={offcanvasBottem}
              className={`accordion-button  ${isCanvasBottem && 'collapsed'}  `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              <i className="bi-flag " />
              <div className="position-absolute ">PURCHASE LOT</div>
            </button>
          </h2>
          <div
            className={`accordion-collapse collapse show ${
              isCanvasBottem && ''
            }`}
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <StepWizard>
                <FormOne
                  addFormTwoHandler={addFormTwoHandler}
                  setSelectorWidth={setSelectorWidth}
                  setSelectorHeight={setSelectorHeight}
                  selectorWidth={selectorWidth}
                  selectorHeight={selectorHeight}
                />
                <FormTwo removeFormTwoHandler={removeFormTwoHandler} />
                <FormThree
                  removeFormTwoHandler={removeFormTwoHandler}
                  setLandName={(e) => setUserLandName(e)}
                />
                <FormFour
                  removeFormTwoHandler={removeFormTwoHandler}
                  landName={userLandName}
                  squreInfo={squreInfo}
                  getMintImage={getMintImage}
                />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Space
