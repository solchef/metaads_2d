/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

export const InfoSection = () => {
  return (
    <>
  
  <section id="realtor-section">
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 align-items-center">
        <div className="col">
          <img src="assets/images/presale_img.png" className="w-100" />
        </div>
        <div className="col">
          <h2 className="mt-sm-4">META REALTOR TO <span className="gradiant">ADSPACE</span> DISPLAY OPPORTUNITY</h2>
          <p>Virtual plots in the metaverses are now rivalling real-word real estate values, with popular
            locations selling for
            millions. Now is your chance to invest in the space for as low as $1. At first, each Quads
            (parcels) holds 100px (10 X 10) area that can be used for adSpace. Lots can also be divided,
            resold or rented. But wait, this is only the beginning of something much bigger...</p>
          <br />
          <a className="btn-primary hoverable btn-md" href="grid.html"><i className="bi bi-grid-3x3 me-2" />BUY QUADS FOR
            $1</a>
        </div>
      </div>
    </div>
  </section>
  <section id="retail-section">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-5">
          <h2>Virtual <span className="gradiant">Retail space</span> for your business</h2>
          <p>Soon, you will be able to convert your parcels into 3D virtual retail square footage where you
            can build and host a 3D VR environment for your business. Have your virtual clientele interact
            within your showroom and sell your product
            within Quadspace Metaverse.</p>
          <br />
          <a className="btn-primary hoverable btn-md" href="grid.html"><i className="bi bi-grid-3x3 me-2" />BUY QUADS FOR
            $1</a>
        </div>
        <div className="col-7">
          <img src="assets/images/3dretail_img.png" className="w-100" />
        </div>
      </div>
    </div>
  </section>
  <section id="marketplace-section">
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 align-items-center">
        <div className="col">
          <img src="assets/images/marketplace_img.png" className="w-100 p-4" />
        </div>
        <div className="col">
          <h2>EASY <span className="gradiant">3D SPACE BUILDER</span><br /> AND MARKETPLACE</h2>
          <p>Our development team is currently working on a state-of-the-art space builder, allowing business
            owners to quickly build their VR Retail space without having 3D modelling skills. A simple drag
            and drop interface with access to 1000s
            of 3D resources makes your perfect space. A marketplace will also allow 3rd party 3D modellers
            to sell their models, extending our comprehensive library.</p>
          <br />
          <a className="btn-primary hoverable btn-md" href="grid.html"><i className="bi bi-grid-3x3 me-2" />BUY QUADS FOR
            $1</a>
        </div>
      </div>
      {/*PARTNERS ROW ============================ */}  
      <div className="partners">
        <img src="assets/images/partners_logo.png" />
      </div>
      <div className="social">
        <a href="https://twitter.com"><i className="bi-twitter" /></a>
        <a href="https://instagram.com"><i className="bi-instagram" /></a><a href="https://discord.com"><i className="bi-discord" /></a>
      </div>
      {/*COPYRIGHT ROW ============================ */}  
      <div className="copyright">
        <h6>Copyright 2022. All Right Reserved. Quadspace.io</h6>
      </div>
    </div>
  </section>


      
    </>
  )
}
