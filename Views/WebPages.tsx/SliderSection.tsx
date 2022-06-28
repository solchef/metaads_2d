/* eslint-disable @next/next/no-img-element */

export const SliderSection = () => {
  return (
    <>
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

      <section id="phase-section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3" id="phases">
            <div className="col">
              <h2>Phase 1</h2>
              <p>
                1 million NFT parcel presale as begun at $1 each. Each parcel
                are 10 x 10px square.
              </p>
              <hr />
              <div className="d-flex align-items-center mb-3">
                <img
                  alt=""
                  src="/assets/images/square_icon.png"
                  className="me-2"
                />
                <h4> = 10 X 10 PX = $1</h4>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img
                  alt=""
                  src="/assets/images/square_icon.png"
                  className="me-2"
                />
                <h4> = PRICED AT $1</h4>
              </div>
              <div className="d-flex align-items-center">
                <h4>1,000,000 </h4>
                <img
                  alt=""
                  src="/assets/images/square_icon.png"
                  className="mx-2"
                />
                <h4>AVAILABLE</h4>
              </div>
            </div>
            <div className="col">
              <h2>Phase 2</h2>
              <p>
                Public on opensea.io for $10 each. Parcels can be divided, sold
                or used as a clickable ad.{' '}
              </p>
              <hr />
              <div className="d-flex align-items-center mb-3">
                <img
                  alt=""
                  src="assets/images/sell_icon.png"
                  className="me-2"
                />
                <h4>
                  {' '}
                  Divide Lots &amp; Sell for $10 <span>(X10)</span>
                </h4>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img alt="" src="assets/images/img_icon.png" className="me-2" />
                <h4> Upload Ad Image</h4>
              </div>
              <div className="d-flex align-items-center">
                <img alt="" src="assets/images/url_icon.png" className="me-2" />
                <h4> Clickable URL</h4>
              </div>
            </div>
            <div className="col">
              <h2>Phase 3</h2>
              <p>
                Convert parcels into sq.ft. with our 3D Builder &amp; offer an
                immersive virtual 3D retail space.
              </p>
              <hr />
              <div className="d-flex align-items-center mb-3">
                <img alt="" src="assets/images/3D_icon.png" className="me-2" />
                <h4>
                  {' '}
                  = 1 Sq.Ft = $1000 <span>(1000X)</span>
                </h4>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img alt="" src="assets/images/vr_icon.png" className="me-2" />
                <h4> Virtual 3D Space Builder</h4>
              </div>
              <div className="d-flex align-items-center">
                <img alt="" src="assets/images/pos_icon.png" className="me-2" />
                <h4>Sell products &amp; Services</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
