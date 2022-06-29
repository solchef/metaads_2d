/* eslint-disable @next/next/no-img-element */

export const SliderSection = () => {
  return (
    <>

  <header>
    <div className="container hero h-100 d-flex align-items-start pt-md-5">
      <div className="row row-cols-1 row-cols-md-2 align-items-center">
        <div className="col pt-5">
          <h6><span className="gradiant">SHAPING THE FUTURE OF META-COMMERCIAL REALTY</span></h6>
          <h1>1M <span className="gradiant">QUADSPACE</span> FOR GRAB OWN METASTATE FOR $1</h1>
          <p> Quadspace metaverse allows businesses, meta realtors and individual NFT collectors to acquire
            Quad for $1.
            These estate can be used as space, 3d retail space or simply a place for you and your meta
            buddies to kick it!</p>
          <a className="btn-primary hoverable btn-sm " href="grid.html"><i className="bi bi-grid-3x3 me-2" />BUY QUADS FOR
            $1</a>
        </div>
        <div className="col">
          <img src="assets/images/hero_img.png" className="w-100" />
        </div>
      </div>
    </div>
  </header>
  <section id="phase-section" className="hide-mobile">
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3" id="phases">
        <div className="col">
          <h2>Phase 1</h2>
          <p>1 million NFT parcel presale as begun at $1 each. Each parcel are 10 x 10px square.
          </p>
          <hr />
          <div className="d-flex align-items-center mb-3">
            <img src="assets/images/square_icon.png" className="me-2" />
            <h4> = 10 X 10 PX = $1</h4>
          </div>
          <div className="d-flex align-items-center mb-3">
            <img src="assets/images/square_icon.png" className="me-2" />
            <h4> = PRICED AT $1</h4>
          </div>
          <div className="d-flex align-items-center">
            <h4>1,000,000 </h4><img src="assets/images/square_icon.png" className="mx-2" />
            <h4>AVAILABLE</h4>
          </div>
        </div>
        <div className="col">
          <h2>Phase 2</h2>
          <p>Public on opensea.io for $10 each. Parcels can be divided, sold or used as a clickable ad. </p>
          <hr />
          <div className="d-flex align-items-center mb-3">
            <img src="assets/images/sell_icon.png" className="me-2" />
            <h4> Divide Lots &amp; Sell for $10 <span>(X10)</span></h4>
          </div>
          <div className="d-flex align-items-center mb-3">
            <img src="assets/images/img_icon.png" className="me-2" />
            <h4> Upload Ad Image</h4>
          </div>
          <div className="d-flex align-items-center">
            <img src="assets/images/url_icon.png" className="me-2" />
            <h4> Clickable URL</h4>
          </div>
        </div>
        <div className="col">
          <h2>Phase 3</h2>
          <p>Convert parcels into sq.ft. with our 3D Builder &amp; offer an immersive virtual 3D retail space.
          </p>
          <hr />
          <div className="d-flex align-items-center mb-3">
            <img src="assets/images/3D_icon.png" className="me-2" />
            <h4> = 100 Sq.Ft = QUADROOM</h4>
          </div>
          <div className="d-flex align-items-center mb-3">
            <img src="assets/images/vr_icon.png" className="me-2" />
            <h4> Virtual 3D Space Builder</h4>
          </div>
          <div className="d-flex align-items-center">
            <img src="assets/images/pos_icon.png" className="me-2" />
            <h4>Sell products &amp; Services</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="phase-section" className="show-mobile">
  <div className="container">
    <div id="phases">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h2>Phase 1</h2>
            <p>1 million NFT parcel presale as begun at $1 each. Each parcel are 10 x 10px square.
            </p>
            <hr />
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <img src="assets/images/square_icon.png" className="me-2" />
                <h4> = 10 X 10 PX = $1</h4>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img src="assets/images/square_icon.png" className="me-2" />
                <h4> = PRICED AT $1</h4>
              </div>
              <div className="d-flex align-items-center">
                <h4>1,000,000 </h4>
                <img src="assets/images/square_icon.png" className="mx-2" />
                <h4>AVAILABLE</h4>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <h2>Phase 2</h2>
            <p>Public on opensea.io for $10 each. Parcels can be divided, sold or used as a clickable
              ad. </p>
            <hr />
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <img src="assets/images/sell_icon.png" className="me-2" />
                <h4> Divide Lots &amp; Sell</h4>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img src="assets/images/img_icon.png" className="me-2" />
                <h4> Upload AdSpace Image</h4>
              </div>
              <div className="d-flex align-items-center">
                <img src="assets/images/url_icon.png" className="me-2" />
                <h4> Clickable URL</h4>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <h2>Phase 3</h2>
            <p>Convert parcels into sq.ft. with our 3D Builder &amp; offer an immersive virtual 3D
              retail space.
            </p>
            <hr />
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <img src="assets/images/3D_icon.png" className="me-2" />
                <h4> = 1000 Sq.Ft = 10 X 10 X 10 = QUADROOM </h4>
              </div>
              <div className="d-flex align-items-center mb-3">
                <img src="assets/images/vr_icon.png" className="me-2" />
                <h4> Virtual 3D Space Builder</h4>
              </div>
              <div className="d-flex align-items-center">
                <img src="assets/images/pos_icon.png" className="me-2" />
                <h4>Marketplace</h4>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators hide-mobile">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
        </div>
      </div>
    </div>
  </div>
</section>


    </>
  )
}
