import axios from 'axios'
import { useEffect, useState } from 'react'
import { QuadSpaceContract } from '../../utils/constants'
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
  const [menu, setMenu] = useState(false)

  return (
    <>
      <nav
        className={`navbar ${showMenu && ' active'}  sticky-top d-flex navbar-dark bg-dark  `}
        
      >
        <div className="container-fluid ">
          <div>
            <div>
              <div
                className={`d-flex logo-m  ${
                  showMenu && 'logo'
                } align-items-center `}
              >
                {/* <span
                  onClick={() => {
                    dispatch(setShowMenu(!showMenu))
                    dispatch(setViewState(4))
                  }}
                  className={`icon ms-2  show-mobile ${showMenu && 'open'}  `}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </span> */}
                <div className='position-absolute menu-top'>
                {!menu ? 
          <>
          <button onClick={()=>setMenu(!menu)} className='btn btn-primary text-start py-2  '>  <i className="bi bi-list me-2"></i> <span className='me-2'>Menu</span></button>
          
          
          </>
        :<>

          <button onClick={()=>setMenu(!menu)}  className='btn text-start  btn-primary mt-2 py-2 w-100'>       <i className="bi bi-x-lg me-4"></i> <span className='me-3'>Menu</span></button> <br />
          <button   onClick={() => {
            dispatch(setShowMenu(true))

            dispatch(setViewState(0))
          }} className='btn text-start  btn-primary mt-2 py-2 w-100'>       <i className="icon-menu bi bi-info-circle me-4"  ></i> <span className='me-3'>About</span></button> <br />
         
          <button  onClick={() => {
            dispatch(setShowMenu(true))

            dispatch(setViewState(7))
          }}  className='btn text-start  btn-primary mt-2 py-2 w-100'>     <i className="icon-menu bi bi-map  me-4"></i> <span className='me-3'>RoadMap</span></button> <br />
          <a
          className='p-0'
          target="_blank"
          href={'https://opensea.io/' + QuadSpaceContract}
        > 
          <button   className='btn text-start  btn-primary mt-2 py-2 w-100'>   <i  className="icon-menu"><img className="me-4" height="20" width="20" src="https://opensea.io/static/images/logos/opensea.svg"/></i> <span className='me-3'>MarketPlace</span></button> <br />
         </a>
          <a
          className='p-0'
          target="_blank"
          href={'https://t.me/TheMillionDollarWebsite'}
        >   <button   className='btn text-start  btn-primary mt-2 py-2 w-100'>   <i className="bi bi-telegram me-4"></i> <span className='me-3'>Telegram</span> </button></a> <br />
            <a
          className='p-0'
          target="_blank"
          href={'https://twitter.com/quadspaceio'}
        >  
         <button   className='btn text-start  btn-primary mt-2 py-2 w-100'>       <i className="bi bi-twitter me-4"></i> <span className='me-3'>Twitter</span></button> <br />
       </a>

        </>
        }
   

        </div>
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
