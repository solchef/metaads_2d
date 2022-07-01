import React, { useEffect } from 'react'
import { useWeb3Context } from '../context'
import useCanvas from '../hooks/useCanvas'
import { useIPFS } from '../hooks/useIPFS'
import { handleMint } from '../utils/handleMint'

const FormFour = (props) => {
  const { contracts, address } = useWeb3Context()
  const adscontract = contracts['metaads']
  const { squreInfo, getMintImage } = useCanvas()
  const { uploadMetadata, uploadImage }: any = useIPFS()

  const handleSubmint = async () => {
    console.log(props.landName)
    console.log(squreInfo)
    console.log(adscontract)
    const result = await handleMint(
      props.landName,
      address,
      adscontract,
      getMintImage,
      squreInfo,
      uploadMetadata,
      uploadImage
    )
  }
  return (
    <>
      <button
        className="btn-primary btn-lg w-100 buy-lot hoverable mt-1"
        onClick={handleSubmint}
      >
        <i className="bi-cart me-2 " />
        BUY LOT{' '}
      </button>

      <div className="btn-slide text-nowrap mt-3">
        <span className=" pe-2">
          <img src="assets/images/square_icon.png" width="20px" /> : 1{' '}
        </span>
        <span className="text-nowrap pe-2">
          {' '}
          <b>
            <i className="bi bi-tag"></i> :{' '}
          </b>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            width="24px"
            height="24px"
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
          </svg>{' '}
          0.333 (1)
        </span>

        <span className=" pe-2">
          <i className="bi bi-border "></i> : ( 1 x 1 )
        </span>
        <span className="pe-2">
          <i className="bi bi-geo-alt"></i> 1X , 1Y{' '}
        </span>
      </div>

      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div onClick={() => props.goToStep(1)} className="circlee "></div>
          <div onClick={() => props.goToStep(2)} className="circlee "></div>
          <div onClick={() => props.goToStep(3)} className="circlee"></div>
          <div
            onClick={() => props.goToStep(4)}
            className="circlee active"
          ></div>
        </div>
        <button
          className="btn btn-primary Back ps-5 pe-5 "
          onClick={props.previousStep}
        >
          Back
        </button>
      </div>
    </>
  )
}

export default FormFour
