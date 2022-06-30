/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { Web3Button } from '../Web3Button'

const Header = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">
              {' '}
              <img alt="" src="assets/images/quadspace_brand_icon.svg" />
              <span className="gradiant ms-2">QUADSPACE</span>
            </a>
          </Link>
          <div>
            <Web3Button />
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header
