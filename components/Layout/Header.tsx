/* eslint-disable @next/next/no-img-element */
import { Web3Button } from '../Web3Button'

const Header = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span className="gradiant">QUADSPACE</span>
          </a>
          <div>
            <a href="#grid-section" className="me-5">
              <i className="bi-cart"></i> Buy Plots
            </a>
            <Web3Button />
          </div>
        </div>
      </nav>

      <header>
        <div className="container hero h-100 d-flex align-items-start pt-5">
          <div className="row row-cols-1 row-cols-md-2 align-items-center">
            <div className="col pt-5">
              <h6>
                <span className="gradiant">SHAPING THE FUTURE OF</span>
              </h6>
              <h1>
                Metacommercial Realty &amp;{' '}
                <span className="gradiant">adspace</span> in the Metaverse
              </h1>
              <p>
                QUADSPACE is the first Meta Commercial Metaverse, a platform for
                retail businesses, meta realtors or individual NFT collectors to
                source high-yield income or brand exposure. Parcels can be sold
                or rent at profit, used as adspace and soon turned into virtual
                3D retail space where you can interact with your customer and
                even process sales.{' '}
              </p>
              <a href="#grid-section" className="link">
                <span className="gradiant">
                  Buy a Plot<i className="bi-arrow-right"></i>
                </span>
              </a>
            </div>
            <div className="col">
              <img src="/assets/images/hero_img.png" alt="" className="w-100" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default Header
