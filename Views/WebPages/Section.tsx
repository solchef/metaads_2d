/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

export const Section = ({ setUrl, setMintImage, handleSubmit, setName }) => {
  return (
    <div className="offcanvas-body image-info pt-5 pb-5 p-0 ">
      <h3> SQ.NFT SIZE</h3>
      <div>
        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi-border" />
            </span>
            <input
              type="number"
              min="1"
              max="1000000"
              aria-label="x"
              placeholder="X"
              className="form-control"
            />
            <input
              type="number"
              aria-label="y"
              min="1"
              max="1000000"
              placeholder="Y"
              className="form-control value="
            />
          </div>
        </form>
      </div>
      <p>
        Select your NFI sq. Size (1 sq=10x10px) & Drag it where you want it.
      </p>
      <hr />
      <h3> Sq.NFT DATA</h3>

      <div>
        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-geo-alt"></i>
            </span>
            <input
              type="text"
              placeholder="Sq. NFT Name"
              className="form-control"
              onChange={(event) => {
                console.log(event.target.value)
                setName(event.target.value)
              }}
            />
          </div>
        </form>

        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-link"></i>
            </span>
            <input
              type="text"
              placeholder="Https://"
              className="form-control"
              onChange={(event) => {
                console.log(event.target.value)
                setUrl(event.target.value)
              }}
            />
          </div>
        </form>

        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-upload"></i>
            </span>
            <input
              type="file"
              placeholder="Upload Image"
              className="form-control"
              onChange={(event) => {
                // console.log(event.target.files[0])
                setMintImage(event.target.files[0])
              }}
            />
          </div>
        </form>
      </div>
      <p>Recommended size (100X100px png, jpg)</p>
      <div className="d-flex">
        <i className="bi w-25 bi-geo-alt"></i>

        <p className="p-0">MARK FOR SALE ON OPENSEA.IO</p>
      </div>
      <a
        className="btn-primary hoverable mx-3 btn-md hide-mobile"
        onClick={handleSubmit}
        href="#"
      >
        <i className="bi-wallet me-2"></i> PURCHASE PLOT
      </a>
      <div className="d-flex mt-3 flex-wrap">
        <span className=" me-2 mt-2">
          <img src="assets/images/square_icon.png" width="16px" /> : 100
        </span>
        <span className=" me-2 mt-2">
          <i className="bi bi-border " />
          &nbsp;: ( 10 x 10 )
        </span>
        <span className="me-2 mt-2">
          <i className="bi bi-geo-alt" /> : 287X , 485Y
        </span>
        <span className="me-2 mt-2 text-nowrap">
          {' '}
          <b>
            <i className="bi bi-tag" /> :{' '}
          </b>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            width="12px"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 784.37 1277.39"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer" />
              <g id="_1421394342400">
                <g>
                  <polygon
                    fill="#343434"
                    fillRule="nonzero"
                    points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                  />
                  <polygon
                    fill="#3C3C3B"
                    fillRule="nonzero"
                    points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,1277.38 392.07,956.52 -0,724.89 "
                  />
                  <polygon
                    fill="#141414"
                    fillRule="nonzero"
                    points="392.07,882.29 784.13,650.54 392.07,472.33 "
                  />
                  <polygon
                    fill="#393939"
                    fillRule="nonzero"
                    points="0,650.54 392.07,882.29 392.07,472.33 "
                  />
                </g>
              </g>
            </g>
          </svg>
          &nbsp;0.0942 ( $ 100 )
        </span>
      </div>
    </div>
  )
}
