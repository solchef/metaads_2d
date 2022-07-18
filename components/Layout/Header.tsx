
import Link from 'next/link'
import { Web3Button } from '../Web3Button'

const Header = () => {

  return (
    <>
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <div className="container-fluid py-2">
          <div>
          <div className="d-flex ">
            <i className="bi-flag me-3" />
            <h3>THE MILLION <br /> DOLLAR WEBSITE</h3>
          </div>

          <div className="controls hide-mobile">
            <div className="d-flex gap-g flex-row-inverse justify-content-between align-items-center wrap-flow">
            
              <div className="right-controls d-flex">
                <div className='me-2'>
                <Link href="/space">
                    <button className="btn btn-primary btn-lg hoverable">
                    <i className="bi bi-info-circle"></i>
                    </button>
                  </Link>
                </div>
                <div className="buttons w-auto bo me-2 flex-nowrap">
                  <button
             
             
                    className={`btn btn-bi d-flex toggle-mode align-items-center w-100 position-relative m-0 btn-primary btn-lg 
                      `}
                
                  >
                    <i
                      className="bi bi-cart-fill me-2"
                      // style={{ marginTop: '-5px' }}
                    />{' '}
                    <span className="text-nowrap hide-mobile"> Buy Mode</span>
                  </button>
                  <button
                   
                
                    className={`btn btn-bi d-flex flex-nowrap toggle-mode  
                    } align-items-center accordion w-100 position-relative btn-primary `}
                  
                  >
                    <i className="bi bi-arrows-move me-2" />
                    <span className="text-nowrap hide-mobile">View Mode</span>
                  </button>
                </div>
                <div className="buttons bo flex-nowrap">
                  <button
                    className="btn btn-bi hoverable btn-primary m-0 btn-lg "
                   
                  >
                    <i className="bi-zoom-out" />
                  </button>
                  <button
                    className="btn btn-bi  m-0 btn-lg "
                    style={{ color: '#fff' }}
                  >
                1X
                  </button>
                  <button
                    className="btn btn-bi btn-primary hoverable btn-lg "
                 
                  >
                    <i className="bi-zoom-in " />
                  </button>
                </div>
                <div className="buttons flex-nowrap ">
                  <button
                    className="btn hoverable btn-primary btn-lg "
                  >
                    <i className="bi-arrow-clockwise " />
                  </button>
                  <Link href="/space">
                    <button className="btn btn-primary btn-lg hoverable">
                     3D
                    </button>
                  </Link>
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
