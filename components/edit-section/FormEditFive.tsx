import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context'
import { useIPFS } from '../../hooks/useIPFS'
import { handleMint } from '../../utils/handleMint'
import { selectLand } from '../reducers/Settings'
import { useAppSelector } from '../store/hooks'

const FormEditFive = (props) => {
  const { contracts, address } = useWeb3Context()
  const adscontract = contracts['metaads']
  const { uploadMetadata, uploadImage }: any = useIPFS()
  const landData = useAppSelector(selectLand)
  const [land, setLand] = useState<any>({})

  useEffect(() => {
    setLand({
      x: landData.x,
      y: landData.y,
      w: landData.w,
      h: landData.h,
    })
  }, [landData])

  const handleSubmint = async () => {
    const result = await handleMint(
      props.landName,
      address,
      adscontract,
      props.getMintImage,
      props.squreInfo,
      uploadMetadata,
      uploadImage
    )
  }
  return (
    <>
      <div className="d-flex flex-column flex-wrap">
      <div className="d-flex align-items-center mb-2">
      <input className="form-check-input m-0 p-0 me-2 " type="checkbox" value="" id="flexCheckDefault"/>

        <p className="p-0 m-0">MARK FOR SALE ON OPENSEA.IO</p>
      </div>
       <div className='d-flex mb-2'>
       <span className=" me-2">
          <img src="assets/images/square_icon.png" width="16px" /> :{' '}
          {landData.h * landData.w}
        </span>
        <span className=" me-2">
          <i className="bi bi-border " />
          &nbsp;: ( {landData.h + ' X ' + landData.w} )
        </span>
        <span className="me-2">
          <i className="bi bi-geo-alt" /> :
          {landData.x + 'X, ' + landData.y + 'Y'}
        </span>
       </div>

      </div>
      <button
        className="btn-primary btn-slide w-100 buy-lot hoverable mt-2 "
        onClick={() => handleSubmint()}
      >
        <i className="bi-cart me-2 " />
      SAVE CHANGES
      </button>
      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div onClick={() => props.goToStep(1)} className="circlee "></div>
          <div onClick={() => props.goToStep(2)} className="circlee "></div>
          <div onClick={() => props.goToStep(3)} className="circlee"></div>
          <div onClick={() => props.goToStep(4)} className="circlee"></div>
          <div
            onClick={() => props.goToStep(5)}
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

export default FormEditFive
