import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  selectZoomLevel,
  setViewState,
  setZoomIn,
  setZoomLevel,
  setZoomOut,
  selectShowMenu,
  setShowMenu,
  setMintStatus,
  setquadPrice,
} from '../reducers/Settings'
import { store } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Web3Button } from '../Web3Button'

const Header = () => {
  const showMenu = useAppSelector(selectShowMenu)
  const [zoomLevelState, setZoomLevelState] = useState(1)
  const dispatch = useAppDispatch()
  const zLevel = useAppSelector(selectZoomLevel)

  useEffect(() => {
    setZoomLevelState(zLevel)
  }, [zLevel])

  useEffect(() => {
    setQuadPrice()
  }, [])

  const setQuadPrice = async () => {
    const price = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDP'
    )
    let quadPrice = (1 / price.data.USDP).toFixed(5)
    store.dispatch(setquadPrice(quadPrice))
  }

  return (
    <>
      <nav
        className={`navbar sticky-top d-flex navbar-dark bg-dark  `}
        style={{ marginLeft: showMenu ? '168px' : '64px' }}
      >
        <div className="container-fluid ">
          <div>
            <div>
              <div
                className={`d-flex logo-m  ${
                  showMenu && 'logo'
                } align-items-center `}
              >
                <span
                  onClick={() => {
                    dispatch(setShowMenu(!showMenu))
                    dispatch(setViewState(4))
                  }}
                  className={`icon ms-2  show-mobile ${showMenu && 'open'}  `}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </span>

                <h3 className="pb-0 mt-1 mb-0 fs-6">
                  THE MILLION <br /> DOLLAR WEBSITE
                </h3>
              </div>
            </div>
          </div>
          <div>
            <div className="controls ">
              <div className="d-flex gap-g flex-row-inverse justify-content-between align-items-center wrap-flow">
                <div className="right-controls d-flex">
                  <div className="buttons bo me-2 flex-nowrap ">
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
                        if (zoomLevelState < 10) {
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
