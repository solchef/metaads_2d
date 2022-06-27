/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

export const InfoSection = () => {
  return (
    <>
      <section id="reator-section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 align-items-center">
            <div className="col">
              <img
                alt=""
                src="assets/images/presale_img.png"
                className="w-100"
              />
            </div>
            <div className="col">
              <h2>
                A <span className="gradiant">1000X</span> Meta Real-Estate &amp;
                Adspace Opportunity
              </h2>
              <p>
                Real estate within the Metaverse is rapidly becoming a sizzling
                asset class. Virtual plots in the metaverses are now rivalling
                real-word real estate values, with popular locations selling for
                millions. Now is your chance to invest in meta-commercial real
                estate. Unlike other Metaverse, Quadspace focuses on retail
                opportunities and AdSpace, which means you will not only be able
                to resell your plot, but advertise businesses directly on your
                plot even before it's built. Take advantage of the presale for
                $1 parcels as you can 1000X your investment as fast as 90 days
                when phase 3 begins.
              </p>
              <a href="#grid-section" className="link">
                <span className="gradiant">
                  Buy a Plot
                  <i className="bi-arrow-right" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="retail-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-5">
              <h2>
                Virtual <span className="gradiant">Retail space</span> for your
                business
              </h2>
              <p>
                Soon, you will be able to convert your parcels into 3D virtual
                retail square footage where you can build and host a 3D VR
                environment for your business. Have your virtual clientele
                interact within your showroom and sell your product within
                Quadspace Metaverse.
              </p>
              <a href="#grid-section" className="link">
                <span className="gradiant">
                  Buy a Plot
                  <i className="bi-arrow-right" />
                </span>
              </a>
            </div>
            <div className="col-7">
              <img
                alt=""
                src="assets/images/3dretail_img.png"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="marketplace-section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 align-items-center">
            <div className="col">
              <img
                alt=""
                src="assets/images/marketplace_img.png"
                className="w-100 p-4"
              />
            </div>
            <div className="col">
              <h2>
                EASY <span className="gradiant">3D SPACE BUILDER</span>
                <br /> AND MARKETPLACE
              </h2>
              <p>
                Our development team is currently working on a state-of-the-art
                space builder, allowing business owners to quickly build their
                VR Retail space without having 3D modelling skills. A simple
                drag and drop interface with access to 1000s of 3D resources
                makes your perfect space. A marketplace will also allow 3rd
                party 3D modellers to sell their models, extending our
                comprehensive library.
              </p>
              <a href="#grid-section" className="link">
                <span className="gradiant">
                  Buy a Plot
                  <i className="bi-arrow-right" />
                </span>
              </a>
            </div>
          </div>
          <div className="partners">
            <img alt="" src="assets/images/partners_logo.png" />
          </div>
          <div className="social">
            <a href="https://twitter.com">
              <i className="bi-twitter" />
            </a>
            <a href="https://instagram.com">
              <i className="bi-instagram" />
            </a>
            <a href="https://discord.com">
              <i className="bi-discord" />
            </a>
          </div>
          <div className="copyright">
            <h6>Copyright 2022. All Right Reserved. Quadspace.io</h6>
          </div>
        </div>
      </section>

      
    </>
  )
}
