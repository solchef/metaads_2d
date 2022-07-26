import { Fragment, useEffect, useState } from 'react'
import useCanvas from '../hooks/useCanvas'
import PurchaseSection from './WebPages/PurchaseSection'
import Link from 'next/link'
import axios from 'axios'
// import {
//   fitScrean,
//   // getViewLocation,
//   // getZoomLevel,
//   // loadGrid,
//   // setBuyStateModal,
//   zoomIn,
//   zoomOut,
// } from './WebPages/canvesGrid'

import StepWizard from 'react-step-wizard'
import FormOne from '../components/section/FormOne'
import FormTwo from '../components/section/FormTwo'
import FormThree from '../components/section/FormThree'
import FormFour from '../components/section/FormFour'
import FormFive from '../components/section/FormFive'
import FormEditOne from '../components/edit-section/FormEditOne'
import FormEditTwo from '../components/edit-section/FormEditTwo'
import FormEditThree from '../components/edit-section/FormEditThree'
import FormEditFour from '../components/edit-section/FormEditFour'
import FormEditFive from '../components/edit-section/FormEditFive'
import { useWeb3Context } from '../context'
import {
  selectLand,
  selectReloadPage,
  selectShowMenu,
  selectZoomLevel,
  setBoughtedLandList,
  setReloadPage,
  setSelectedLand,
  setSelectMode,
  setShowMenu,
  setViewState,
  setZoomIn,
  setZoomLevel,
  setZoomOut,
  set_3dMode,
} from '../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../components/store/hooks'
import 'react-minimap/dist/react-minimap.css'
import { MetaadsContractUnsigned } from '../utils/readOnly'
import { MapView } from './WebPages/Map'

const AdSpace: React.FunctionComponent = () => {
  const { address, contracts } = useWeb3Context()
  const reload = useAppSelector(selectReloadPage)
  const zLevel = useAppSelector(selectZoomLevel)
  const [boughtedLandListData, setBoughtedLandListData] = useState([])
  const land = useAppSelector(selectLand)
  const [zoomLevelState, setZoomLevelState] = useState(1)
  // const viewPoint = getViewLocation()
  const { cAreaRef, squreInfo, setEnableBuy } = useCanvas()
  const dispatch = useAppDispatch()
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

  useEffect(() => {
    // console.log(land)
    // const result = boughtedLandListData.find(
    //   (data) =>
    //     data.attributes[1].value === land.x + land.h / 2 &&
    //     data.attributes[0].value === land.y + land.w / 2
    // )
    // if (result === undefined) dispatch(setViewState(2))
    // else {
    //   dispatch(setSelectedLand(result))
    //   dispatch(setViewState(3))
    // }
    // console.log(result)
  }, [land])
  useEffect(() => {
    axios.get('http://localhost:3000/api/info').then((data) => {
      dispatch(setBoughtedLandList(data.data.meta))
      setBoughtedLandListData(data.data.meta)
      console.log(data.data.meta)
    })
  }, [])

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
      // loadGrid({ walletQuads: walletNfts, otherQuads: allMintedIds })
    }
  }

  useEffect(() => {
    setZoomLevelState(zLevel)
  }, [zLevel])

  // useEffect(() => {
  //   setZoomLevel(getZoomLevel())
  //   // console.log(viewPoint)
  // }, [getZoomLevel()])

  const [isCanvasRight, setIsCanvasRight] = useState(false)
  const [show, setShow] = useState(false)
  const [isCanvasLeft, setIsCanvasLeft] = useState(false)
  const [isCanvasBottem, setIsCanvasBottem] = useState(false)
  const [buyState, setBuyState] = useState(false)

  const offcanvasLeft = () => {
    // setBuyState(!buyState)
    setIsCanvasLeft(!isCanvasLeft)
    setIsCanvasRight(false)
    setIsCanvasBottem(false)
    // setBuyStateModal(!buyState)
    // loadGrid(mintingData)
  }

  const offcanvasBottem = () => {
    setIsCanvasBottem(!isCanvasBottem)
    setIsCanvasLeft(false)
  }
  const [checked, setChecked] = useState(false)

  const [twoFeeTypes, setTwoFeeTypes] = useState(1)

  const addFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes + 1)
  const [threeD, setThreeD] = useState(true)
  const [stateBtn, setStateBtn] = useState('')
  const removeFormTwoHandler = () => setTwoFeeTypes(twoFeeTypes - 1)
  const showMenu = useAppSelector(selectShowMenu)

  return (
    <>
      <Fragment>
        {/* <section id="grid-section" className="show-mobile">
          <div className="container-fluid d-flex justify-content-center  mobile-grid-button">
            <Link href="/space">
              <a className="btn-primary hoverable btn-lg">
                <i className="bi bi-grid-3x3 me-2" />
                BUY QUADS FOR $1
              </a>
            </Link>
          </div>
        </section> */}

        <section id="grid-section">
          {/* <div className="controls">
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
                    style={{opacity:isCanvasLeft ? .5 : 1}}
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
                    style={{opacity:!isCanvasLeft ? .5 : 1}}
                  >
                    <i className="bi bi-arrows-move me-2" />
                    <span className="text-nowrap hide-mobile">View Mode</span>
                  </button>
                </div>
                <div className="buttons bo flex-nowrap">
                  <button
                    className="btn btn-bi hoverable btn-primary m-0 btn-lg "
                    onClick={() => 
                      setZoomLevel(zoomIn())
                    }
                  >
                    <i className="bi-zoom-out" />
                  </button>
                  <button
                    className="btn btn-bi  m-0 btn-lg "
                    style={{ color: '#fff' }}
                  >
                    {zoomLevel}
                  </button>
                  <button
                    className="btn btn-bi btn-primary hoverable btn-lg "
                    onClick={() => {
                      setZoomLevel(zoomOut())
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
          </div> */}

          <div className={`g-main ${showMenu && 'm-300 g-main-300 '}`}>
            <div
              ref={cAreaRef}
              className="canvas-box  hoverable"
              id="container"
              // onClick={() => {
              //   dispatch(setShowMenu(true))

              //       }}
            >
              {/* <canvas id="adcanvass"></canvas> */}
              {reload ? <MapView /> : ''}
            </div>
          </div>
        </section>
        <div className="space-details   show-mobile p-4 px-4">
          <div className="controls controls-mobile">
            <div className="d-flex gap-g flex-row-inverse justify-content-between align-items-center wrap-flow">
              <div className="right-controls d-flex">
                <div className="me-2">
                  <button
                    onClick={() => {
                      setStateBtn('info')
                      dispatch(setSelectMode(true))
                    }}
                    className={`btn btn-primary btn-lg hoverable ${
                      stateBtn == 'info' ? 'active' : ''
                    }  `}
                  >
                    <i className="px-2 bi bi-info-circle"></i>
                  </button>
                </div>
                <div className="buttons w-auto bo me-2 flex-nowrap">
                  <button
                    onClick={() => {
                      setStateBtn('Buy')
                      dispatch(setSelectMode(false))
                    }}
                    className={`btn btn-bi d-flex ${
                      stateBtn == 'Buy' ? 'active' : ''
                    } toggle-mode align-items-center w-100 position-relative m-0 btn-primary btn-lg 
                        `}
                  >
                    <i
                      className="bi bi-cart-fill px-2"
                      // style={{ marginTop: '-5px' }}
                    />{' '}
                    <span className="text-nowrap  hide-mobile"> Buy Mode</span>
                  </button>
                  <button
                    onClick={() => {
                      setStateBtn('View')
                      dispatch(setSelectMode(true))
                    }}
                    className={`btn btn-bi d-flex ${
                      stateBtn == 'View' ? 'active' : ''
                    } flex-nowrap toggle-mode  
                } align-items-center accordion w-100 position-relative btn-primary `}
                  >
                    <i className="px-2 bi bi-arrows-move " />
                    <span className="text-nowrap hide-mobile">View Mode</span>
                  </button>
                </div>
                <div className="buttons bo flex-nowrap">
                  <button
                    className="btn btn-bi hoverable btn-primary m-0 btn-lg "
                    onClick={() => {
                      if (zoomLevelState > 1) {
                        dispatch(setZoomOut(zoomLevelState - 1))
                        setZoomLevelState(zoomLevelState - 1)
                        dispatch(setZoomLevel(zoomLevelState - 1))
                      }
                    }}
                  >
                    <i className="px-1 bi-zoom-out" />
                  </button>
                  <button
                    className="btn btn-bi  m-0 btn-lg "
                    style={{ color: '#fff' }}
                  >
                    <span className="px-1">{zoomLevelState}X</span>
                  </button>
                  <button
                    className="btn btn-bi btn-primary hoverable btn-lg "
                    onClick={() => {
                      console.log('in')
                      if (zoomLevelState < 5) {
                        dispatch(setZoomIn(zoomLevelState + 1))
                        setZoomLevelState(zoomLevelState + 1)
                        dispatch(setZoomLevel(zoomLevelState + 1))
                      }
                    }}
                  >
                    <i className="px-1 bi-zoom-in " />
                  </button>
                </div>
                <div className="buttons flex-nowrap ">
                  <button
                    className="btn hoverable btn-primary btn-lg "
                    onClick={async () => {
                      await dispatch(setReloadPage(false))
                      await dispatch(setReloadPage(true))
                    }}
                  >
                    <i className="px-2 bi-arrow-clockwise " />
                  </button>
                  {/* <button
                    onClick={() => {
                      setThreeD(!threeD)
                      dispatch(set_3dMode(threeD))
                    }}
                    className="btn btn-primary btn-lg hoverable"
                  >
                    <span className="px-2"> {threeD ? '3D' : '2D'}</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {stateBtn == 'info' ? (
            <div className="h-100 scrollable pe-2 pb-5 mb-5">
              <h3>ABOUT MDW </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                natus assumenda dolore provident ad eaque dolorem magni quod
                praesentium, accusantium ipsa sit, quaerat nulla qui ipsam
                voluptatum tenetur dicta aspernatur?
              </p>

              <h3 className="mt-5">HOW-IT WORKS</h3>
              <div className="d-flex">
                <span className="num-border mt-1">1</span>
                <p className="ps-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  natus assumenda dolore provident ad eaque dolorem magni quod
                  praesentium, accusantium ipsa sit, quaerat nulla qui ipsam
                  voluptatum tenetur dicta aspernatur?
                </p>
              </div>
              <div className="d-flex">
                <span className="num-border mt-1">2</span>
                <p className="ps-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  natus assumenda dolore provident ad eaque dolorem magni quod
                  praesentium, accusantium ipsa sit, quaerat nulla qui ipsam
                  voluptatum tenetur dicta aspernatur?
                </p>
              </div>
              <div className="d-flex">
                <span className="num-border mt-1">3</span>
                <p className="ps-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  natus assumenda dolore provident ad eaque dolorem magni quod
                  praesentium, accusantium ipsa sit, quaerat nulla qui ipsam
                  voluptatum tenetur dicta aspernatur?
                </p>
              </div>
            </div>
          ) : stateBtn == 'View' ? (
            <>
              <h3>IT'S FOR SALE</h3>

              <div className="d-flex flex-wrap flex-column">
                <span>
                  <i className="bi bi-geo-alt" /> : 287X , 485Y
                </span>

                <span className="text-nowrap  pt-1">
                  {' '}
                  <b>
                    <i className="bi bi-tag" /> :{' '}
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
                  &nbsp;0.0942 ( $ 100 )
                </span>
                <a
                  className="btn-primary text-nowrap w-75 btn-mob mx-3 mt-5 hoverable btn-md "
                  href="#"
                >
                  <i className="bi-wallet me-2"></i>PURCHASE PLOT
                </a>
              </div>
            </>
          ) : stateBtn == 'Buy' ? (
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
                <FormThree removeFormTwoHandler={removeFormTwoHandler} />
                <FormFour removeFormTwoHandler={removeFormTwoHandler} />
                <FormFive
                  removeFormTwoHandler={removeFormTwoHandler}
                  squreInfo={squreInfo}
                  getMintImage={getMintImage}
                />
              </StepWizard>
            </div>
          ) : (
            // This For Edit
            //   <div className="accordion-body">
            //   <StepWizard>
            //     <FormEditOne
            //       addFormTwoHandler={addFormTwoHandler}
            //       setSelectorWidth={setSelectorWidth}
            //       setSelectorHeight={setSelectorHeight}
            //       selectorWidth={selectorWidth}
            //       selectorHeight={selectorHeight}
            //     />
            //     <FormEditTwo removeFormTwoHandler={removeFormTwoHandler} />
            //     <FormEditThree removeFormTwoHandler={removeFormTwoHandler} />
            //     <FormEditFour removeFormTwoHandler={removeFormTwoHandler} />
            //     <FormEditFive
            //       removeFormTwoHandler={removeFormTwoHandler}
            //       squreInfo={squreInfo}
            //       getMintImage={getMintImage}
            //     />
            //   </StepWizard>
            // </div>
            <div className="d-flex flex-wrap image-info  flex-column">
              <h3>NAME HERE</h3>
              <span className=" link">
                <i className="bi bi-link"></i> :&nbsp;
                <a href="" className="text-success">
                  https://quadspace.io
                </a>
              </span>
              <div className="d-flex mt-1">
                <span className="mb-1 me-2">
                  <img src="assets/images/square_icon.png" width="16px" /> : 100
                  Quads
                </span>

                <span className="mb-1">
                  <i className="bi bi-border " />
                  &nbsp;: ( 10 x 10 )
                </span>
              </div>

              <div className="d-flex mt-1">
                <span className="me-2">
                  <i className="bi bi-geo-alt" /> : 287X , 485Y
                </span>

                <span className="text-nowrap mb-1">
                  {' '}
                  <b>
                    <i className="bi bi-tag" /> :{' '}
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
                  &nbsp;0.0942 ( $ 100 )
                </span>
              </div>
              <span>
                <i className="bi bi-person"></i> : User Wallet
              </span>
              <span className="pt-1">
                <i className="bi bi-clipboard"></i> : Nft
              </span>
            </div>
          )}
        </div>

        {/* this for ImageInfoButten Companent */}
        {/* //////////////////////////////////////////// */}
        {/* 
             <div className="d-flex flex-wrap image-info  flex-column">
                    <h3>NAME HERE</h3>
                    <span className=" link">
                      <i className="bi bi-link"></i> :&nbsp;<a href="" className="text-success">https://quadspace.io</a>
                    </span>
                    <div className="d-flex">
                      <span className=" me-2">
                        <img src="assets/images/square_icon.png" width="16px" /> : 100 Quads
                      </span>



                      <span className="">
                        <i className="bi bi-border " />&nbsp;: ( 10 x 10 )</span>
                    </div>


                    <div className="d-flex">
                      <span className='me-2'>
                        <i className="bi bi-geo-alt" /> : 287X , 485Y
                      </span>


                      <span className="text-nowrap  "> <b>
                        <i className="bi bi-tag" /> : </b>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" width="12px" version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 784.37 1277.39"><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer" /><g id="_1421394342400"><g><polygon fill="#343434" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 " /><polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 " /><polygon fill="#3C3C3B" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 " /><polygon fill="#8C8C8C" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 " /><polygon fill="#141414" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 " /><polygon fill="#393939" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 " /></g></g></g></svg>
                        &nbsp;0.0942 ( $ 100 )</span>
                    </div>
                    <span>

                      <i className="bi bi-person"></i> : User Wallet
                    </span>
                    <span className="">
                      <i className="bi bi-clipboard"></i> : Nft
                    </span>
                    <a className="btn-primary mx-3 w-75 btn-mob mt-2 hoverable btn-md" href="#"><i className="bi-wallet me-2"></i>PURCHASE PLOT</a>

                  </div>
        */}
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
