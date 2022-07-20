import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setReloadPage,
  setSelectMode,
  setViewState,
  setZoomIn,
  setZoomOut,
  set_3dMode,
  set_3dModeData,
} from '../reducers/Settings'
import { store } from '../store'
import { useAppDispatch } from '../store/hooks'
import { Web3Button } from '../Web3Button'

const Header = () => {
  const [threeD, setThreeD] = useState(true)
  const [stateBtn, setStateBtn] = useState('info')
  const [zoomLevel, setZoomLevel] = useState(1)
  const dispatch = useAppDispatch()
  return (
    <>
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <div className="container-fluid py-2">
          <div>
            <div className="show-mobile">
              <div className="d-flex align-items-center ">
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

            <div className="controls hide-mobile">
              <div className="d-flex gap-g flex-row-inverse justify-content-between align-items-center wrap-flow">
                <div className="right-controls d-flex">
                  <div className="me-2">
                    <button
                      onClick={() => {
                        setStateBtn('info')
                        dispatch(setViewState(0))
                        dispatch(setSelectMode(true))
                      }}
                      className={`btn btn-primary btn-lg hoverable ${
                        stateBtn == 'info' ? 'active' : ''
                      }  `}
                    >
                      <i className="bi bi-info-circle"></i>
                    </button>
                  </div>
                  <div className="buttons w-auto bo me-2 flex-nowrap">
                    <button
                      onClick={() => {
                        setStateBtn('Buy')
                        dispatch(setViewState(1))
                        dispatch(setSelectMode(false))
                      }}
                      className={`btn btn-bi d-flex ${
                        stateBtn == 'Buy' ? 'active' : ''
                      } toggle-mode align-items-center w-100 position-relative m-0 btn-primary btn-lg 
                      `}
                    >
                      <i
                        className="bi bi-cart-fill me-2"
                        // style={{ marginTop: '-5px' }}
                      />{' '}
                      <span className="text-nowrap hide-mobile"> Buy Mode</span>
                    </button>
                    <button
                      onClick={() => {
                        setStateBtn('View')
                        dispatch(setViewState(2))
                        dispatch(setSelectMode(true))
                      }}
                      className={`btn btn-bi d-flex ${
                        stateBtn == 'View' ? 'active' : ''
                      } flex-nowrap toggle-mode  
                    } align-items-center accordion w-100 position-relative btn-primary `}
                    >
                      <i className="bi bi-arrows-move me-2" />
                      <span className="text-nowrap hide-mobile">View Mode</span>
                    </button>
                  </div>
                  <div className="buttons bo flex-nowrap">
                    <button
                      className="btn btn-bi hoverable btn-primary m-0 btn-lg "
                      onClick={() => {
                        dispatch(setZoomOut(zoomLevel - 1))
                        setZoomLevel(zoomLevel + 1)
                      }}
                    >
                      <i className="bi-zoom-out" />
                    </button>
                    <button
                      className="btn btn-bi  m-0 btn-lg "
                      style={{ color: '#fff' }}
                    >
                      {zoomLevel}X
                    </button>
                    <button
                      className="btn btn-bi btn-primary hoverable btn-lg "
                      onClick={() => {
                        dispatch(setZoomIn(zoomLevel + 1))
                        setZoomLevel(zoomLevel + 1)
                      }}
                    >
                      <i className="bi-zoom-in " />
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
                      <i className="bi-arrow-clockwise " />
                    </button>

                    <button
                      onClick={() => {
                        setThreeD(!threeD)
                        dispatch(set_3dMode(threeD))
                      }}
                      className="btn btn-primary btn-lg hoverable"
                    >
                      {threeD ? '3D' : '2D'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Web3Button />
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header
