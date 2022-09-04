/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import ShareSection from '../../components/ShareSection'

export const RoadMap = () => {
  return (
    <div
      style={{ paddingLeft: 10 }}
      className="offcanvas-body about "
      id="about"
    >
      <div className="d-flex"></div>
      <div className="text-center">
        <img src="assets/roadmap-icon.svg" height={100} />
        <h3 className="mb-4 mt-3"> RoadMap</h3>
      </div>
      {/* <img src="assets/roadmap-icon.svg" className="mt-3" height={20} /> */}

      <ul className="timeline mb-2">
        <li>
          <h4>Phase 1</h4>
          <p>
            $1 Pre-Sale Mint starts deploy seo optimization deploy marketing
            budget Sell out and start the SnapShot Countdown Take a snapshot of
            the whole MetaBoard and convert it into NFT Auction the NFT on
            OpenSea and donate all profits to a charity Hold a community vote
            with all the TMDW nft holders to which charity the funds will go to.{' '}
          </p>
        </li>

        <li>
          <h4>Phase 2</h4>

          <p>TMDW Meta Token Dao Marketplace Renting Pixel space. </p>
        </li>

        <li>
          <h4>Phase 3</h4>
          <p>
            Quadspace metaland deploys Server load testing demo run Background
            load testing demo run Quadspace Goes officially live!{' '}
          </p>
        </li>
      </ul>
    
    </div>
  )
}
