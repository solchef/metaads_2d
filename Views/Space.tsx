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
  getLands,
  loadGrid,
  setBuyStateModal,
  zoomIn,
  zoomOut,
} from '../Views/WebPages/canvesGrid'
import { selectLand } from '../components/reducers/Settings'
import { useAppSelector } from '../components/store/hooks'
import Minimap, { Child as ChildComponent } from 'react-minimap'
import 'react-minimap/dist/react-minimap.css'
import { MetaadsContractUnsigned } from '../utils/readOnly'

const Space: React.FunctionComponent = () => {
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const [userLandName, setUserLandName] = useState('')
  const { address, contracts } = useWeb3Context()
  const [lan, setLan] = useState({ x: 0, y: 0 })

  const [mintingData, setMintingData] = useState({
    walletQuads: [],
    otherQuads: [],
  })
  const landData = useAppSelector(selectLand)
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
  const adscontract = contracts['metaads']
  const adsunsignedcontract = contracts['metaads_unsigned']

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
  }, [])
  const land = getLands()

  useEffect(() => {
    console.log(land[0])
    if (land.length > 0) {
      setLan({ x: land[0].x, y: land[0].y })
    }
  }, [land])

  const [twoFeeTypes, setTwoFeeTypes] = useState(1)

  const addFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes + 1)

  const removeFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes - 1)
  const [checked, setChecked] = useState(false)
  const [offset, setOffset] = useState(0)

  const css = `
  .minimap{
     display:none;
  }
`

  return (
    <>
      <section className="mt-0 position-fixed grid-section" id="grid-section">
        <div className="controls pt-0 pe-2">
          <div className="d-flex gap-g flex-row-inverse justify-content-end align-items-center wrap-flow">
            <div className="d-flex flex-column hide-mobile">
              <span style={{ color: '#ff006f' }} className="text-nowrap">
                <b>
                  X{lan.x}Y{lan.y}
                </b>
              </span>

              <div className="mt-2">
                <span className="text-nowrap me-5">
                  <i className="bi bi-geo-alt"></i> {lan.x}X,
                  {lan.y}Y
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
                onClick={() => offcanvasLeft()}
                className={`btn btn-bi d-flex   ${
                  !isCanvasLeft && 'active'
                } align-items-center w-100 position-relative m-0 btn-primary btn-lg `}
              >
                <i className="bi bi-cart-fill me-2"></i>{' '}
                <span className="text-nowrap hide-mobile"> Buy Mode</span>{' '}
              </button>

              <button
                onClick={() => offcanvasLeft()}
                className={`btn btn-bi d-flex flex-nowrap  ${
                  isCanvasLeft && 'active'
                } align-items-center accordion w-100 position-relative  btn-primary `}
              >
                <i className="bi bi-arrows-move  me-2"></i>
                <span className="text-nowrap hide-mobile">View Mode</span>{' '}
              </button>
            </div>

            {/* <div className="buttons  d-flex align-items-center  bo me-1 flex-nowrap">
              <button
                onClick={() => zoomIn()}
                className="btn btn-bi position-relative m-0 btn-primary btn-lg "
              >
                <i className="bi bi-caret-left-fill"></i>
              </button>

              <div className="d-flex flex-md-row  flex-column">
                <button
                  onClick={() => zoomOut()}
                  className="btn btn-bi joy position-relative  btn-primary btn-lg "
                >
                  <i className="bi bi-caret-up-fill"></i>
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="btn btn-bi position-relative joy btn-primary btn-lg "
                >
                  <i className="bi bi-caret-down-fill"></i>
                </button>
              </div>
              <button
                onClick={() => zoomOut()}
                className="btn btn-bi position-relative  btn-primary btn-lg "
              >
                <i className="bi bi-caret-right-fill"></i>
              </button>
            </div> */}

            <div className="buttons bo  flex-nowrap">
              <button
                onClick={() => zoomIn()}
                className="btn btn-bi btn-primary m-0 btn-lg "
              >
                <i className="bi-zoom-out " />
              </button>
              <button className="btn btn-bi btn-primary x m-0 btn-lg ">
                X3
              </button>{' '}
              <button
                onClick={() => zoomOut()}
                className="btn btn-bi btn-primary btn-lg "
              >
                <i className="bi-zoom-in " />
              </button>
            </div>
            <div className="buttons flex-nowrap ">
              <button
                onClick={() => fitScrean(mintingData)}
                className="btn hoverable btn-primary btn-lg "
              >
                <i className="bi-arrow-clockwise " />
              </button>
            </div>
          </div>
        </div>

        <div className="g-space g-s">
          {/* <style>
            {checked ? css : ''}
          </style> */}
          {/* <Minimap
            selector=".box"
            keepAspectRatio={true}
          > */}
          <div ref={cAreaRef} className="canvas-box hoverable" id="container">
            <canvas id="adcanvass"></canvas>
          </div>
          {/* 
          </Minimap> */}
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
        <span className="text-nowrap ">
          <b>
            Y{squreInfo.y}x{squreInfo.x}
          </b>
          <span style={{ color: '#ff006f' }} className="text-nowrap mx-2">
            <b>FOR SALE</b>
          </span>
          <span className="text-nowrap">
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
              </svg>
              &nbsp; 0.000942 (1)
            </span>
          </span>
        </span>

        <div className="d-flex  mt-3">
          <div className="">
            <div className="">
              <span className="text-nowrap me-5">
                <i className="bi bi-geo-alt"></i> {squreInfo.x}X, {squreInfo.y}Y
              </span>
              <div className="mt-3">
                <span className="text-nowrap me-5">
                  <i className="bi bi-person"></i>
                  {address
                    ? address.substring(0, 10) + '...'
                    : QuadSpaceContract.substring(0, 10) + '...'}
                </span>
              </div>
            </div>
          </div>

          <div className="minimap"></div>
        </div>
      </div>

      <div
        className={`accordion show-mobile show ${isCanvasLeft ? '' : 'showw'}`}
      >
        <div className="accordion-item ">
          <h2 className="accordion-header">
            <button
              onClick={offcanvasLeft}
              className={`accordion-button  ${isCanvasLeft && 'collapsed'}  `}
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
            className={`accordion-collapse collapse show ${isCanvasLeft && ''}`}
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