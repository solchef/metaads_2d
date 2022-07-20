import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../../context'
import { useIPFS } from '../../hooks/useIPFS'
import { handleMint } from '../../utils/handleMint'
import { selectLand } from '../reducers/Settings'
import { useAppSelector } from '../store/hooks'

const FormEditFour = (props) => {
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

<h3 className="text-white mb-2">SQ.NFT DATA</h3>

      <form className="btn-slide" >

        <div className="input-group hoverable mb-2">
          <span className="input-group-text ">
            <i className="bi bi-upload"></i>
          </span>
          <input
            type="text"
            placeholder="Upload Image"

            className="form-control"
          />
        </div>
      </form>
     
      <p className='mt-0 pt-0'> Recommended size (100X100px png, jpg)</p>



      <div className="d-flex justify-content-between mt-2">
        <div className="d-flex cir">
          <div onClick={() => props.goToStep(1)} className="circlee "></div>
          <div onClick={() => props.goToStep(2)} className="circlee "></div>
          <div onClick={() => props.goToStep(3)} className="circlee"></div>
          <div
            onClick={() => props.goToStep(4)}
            className="circlee active"
          ></div>
          <div onClick={() => props.goToStep(5)} className="circlee"></div>

        </div>
        <button
          className="btn btn-primary Back ps-5 pe-5 "
          onClick={props.previousStep}
        >
          Back
        </button>
        <button
          className="btn btn-primary Next ps-5 pe-5 "
          onClick={props.nextStep}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default FormEditFour
