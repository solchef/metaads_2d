/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

export const RoadMap = () => {
  return (
    <div
      style={{ paddingLeft: 10 }}
      className="offcanvas-body about "
      id="about"
    >
      <div className="d-flex">
        <h3 className="mb-4"> RoadMap</h3>
      </div>
      <div className="text-center">
        <img src="assets/roadmap-icon.svg" height={100} />
      </div>
      {/* <img src="assets/roadmap-icon.svg" className="mt-3" height={20} /> */}

      <ul className="timeline">
        <li>
          <h4>Phase 1</h4>
          {/* <a href="#" className="float-right">
            21 March, 2014
          </a> */}
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
          {/* <h4 className="float-right">
            4 March, 2014
          </h4> */}
          <p>TMDW Meta Token Dao Marketplace Renting Pixel space. </p>
        </li>
        <li>
          <h4>Phase 3</h4>
          {/* <h4 className="float-right">
            1 April, 2014
          </a> */}
          <p>
            Quadspace metaland deploys Server load testing demo run Background
            load testing demo run Quadspace Goes officially live!{' '}
          </p>
        </li>
      </ul>

      {/* <div className="d-flex">
        <img src="assets/start-icon.svg" className="mt-3" height={20} />

        <p className="w-100">
          <div>
            <h4 className="pb-2">Phase 1</h4>
            <div className="roadmapborder">
              $1 Pre-Sale Mint starts deploy seo optimization deploy marketing
              budget Sell out and start the SnapShot Countdown Take a snapshot
              of the whole MetaBoard and convert it into NFT Auction the NFT on
              OpenSea and donate all profits to a charity Hold a community vote
              with all the TMDW nft holders to which charity the funds will go
              to.{' '}
            </div>
          </div>
        </p>
      </div>
      <div className="d-flex">
        <img src="assets/roadmap-icon.svg" className="mt-3" height={20} />
        <p className="w-100">
          <h4 className="pb-2"> Phase 2 </h4>
          <div className="roadmapborder">
            TMDW Meta Token Dao Marketplace Renting Pixel space.{' '}
          </div>
        </p>
      </div>
      <div className="d-flex">
        <img src="assets/end-icon.svg" className="mt-3" height={20} />
        <p className="w-100">
          <h4 className="pb-2">Phase 3 </h4>
          <div className="roadmapborder">
            Quadspace metaland deploys Server load testing demo run Background
            load testing demo run Quadspace Goes officially live!{' '}
          </div>
        </p>
      </div> */}

      <div className="d-flex mt-2 justify-content-center"></div>
    </div>
  )
}
