import { useEffect, useState } from 'react'
import {
  selectViewState,
  selectZoomLevel,
  setReloadPage,
  setSelectMode,
  setViewState,
  setZoomIn,
  setZoomLevel,
  setZoomOut,
  selectShowMenu,
} from '../reducers/Settings'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Web3Button } from '../Web3Button'

const Header = () => {
  // const [threeD, setThreeD] = useState(true)
  const showMenu = useAppSelector(selectShowMenu)
  //alaoui
  const [stateBtn, setStateBtn] = useState('info')
  const vewState = useAppSelector(selectViewState)
  const [zoomLevelState, setZoomLevelState] = useState(1)
  const dispatch = useAppDispatch()
  const zLevel = useAppSelector(selectZoomLevel)

  useEffect(() => {
    setZoomLevelState(zLevel)
  }, [zLevel])

  return (
    <>
      <nav className={`navbar sticky-top navbar-dark bg-dark`}>
        <div className="container-fluid  py-2">
          <div>
            <div>
              <div
                className={`d-flex logo-m  ${
                  showMenu && 'logo'
                } align-items-center `}
              >
                <img
                  className="me-3"
                  src="assets/images/million-dollar-logo.svg"
                  width="50px"
                />

                <h3>
          
                  THE MILLION <br /> DOLLAR WEBSITE
                </h3>
              </div>
            </div>
          </div>
          <div>
            <div className="controls ">
              <div className="d-flex gap-g flex-row-inverse justify-content-between align-items-center wrap-flow">
                <div className="right-controls d-flex">
                  <div className="buttons bo me-3 flex-nowrap hide-mobile">
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
                      <i className="bi-zoom-out" />
                    </button>
                    <button
                      className="btn btn-bi  m-0 btn-lg "
                      style={{ color: '#fff' }}
                    >
                      {zoomLevelState}X
                    </button>
                    <button
                      className="btn btn-bi btn-primary hoverable btn-lg "
                      onClick={() => {
                        if (zoomLevelState < 5) {
                          dispatch(setZoomIn(zoomLevelState + 1))
                          setZoomLevelState(zoomLevelState + 1)
                          dispatch(setZoomLevel(zoomLevelState + 1))
                        }
                      }}
                    >
                      <i className="bi-zoom-in " />
                    </button>
                  </div>
                  <Web3Button />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header

// <div className="buttons w-auto bo me-2 flex-nowrap">
// <button
//   onClick={() => {
//     setStateBtn('Buy')
//     dispatch(setViewState(1))
//     dispatch(setSelectMode(false))
//   }}
//   className={`btn btn-bi d-flex ${
//     vewState == 1 ? 'active' : ''
//   } toggle-mode align-items-center w-100 position-relative m-0 btn-primary btn-lg
//   `}
// >
//   <i
//     className="bi bi-cart-fill me-2"
//     // style={{ marginTop: '-5px' }}
//   />{' '}
//   <span className="text-nowrap hide-mobile"> Buy Mode</span>
// </button>
// <button
//   onClick={() => {
//     setStateBtn('View')
//     dispatch(setViewState(2))
//     dispatch(setSelectMode(true))
//   }}
//   className={`btn btn-bi d-flex ${
//     vewState == 2 || vewState === 3 ? 'active' : ''
//   } flex-nowrap toggle-mode
// } align-items-center accordion w-100 position-relative btn-primary `}
// >
//   <i className="bi bi-arrows-move me-2" />
//   <span className="text-nowrap hide-mobile">View Mode</span>
// </button>
// </div>

// <div className="me-2">
// <button
//   onClick={() => {
//     setStateBtn('info')
//     dispatch(setViewState(0))
//     dispatch(setSelectMode(true))
//   }}
//   className={`btn btn-primary btn-lg hoverable ${
//     vewState == 0 ? 'active' : ''
//   }  `}
// >
//   <i className="bi bi-info-circle"></i>
// </button>
// </div>
// <div className="buttons flex-nowrap ">
// <button
//   className="btn hoverable btn-primary btn-lg "
//   onClick={async () => {
//     await dispatch(setReloadPage(false))
//     await dispatch(setReloadPage(true))
//   }}
// >
//   <i className="bi-arrow-clockwise " />
// </button>

// {/* <button
//   onClick={() => {
//     setThreeD(!threeD)
//     dispatch(set_3dMode(threeD))
//   }}
//   className="btn btn-primary btn-lg hoverable"
// >
//   {threeD ? '3D' : '2D'}
// </button> */}
// </div>
