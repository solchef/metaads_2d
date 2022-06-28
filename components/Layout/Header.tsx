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
    </>
  )
}
export default Header
