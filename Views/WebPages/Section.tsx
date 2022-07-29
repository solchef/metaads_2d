/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import { Web3Button } from '../../components';
import {
  getBalance,
  getMintingstatus,
  selectLand,
  setLand,
} from '../../components/reducers/Settings'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
// import { updateX, updateY } from './Map'
import { Web3Balance } from '../../components/Web3Balance';
import { useWeb3Context } from '../../context';

export const Section = ({
  setName,
  setUrl,
  setMintImage,
  setDescription,
  handleSubmit,
}) => {
  const landData = useAppSelector(selectLand)
  const { address } = useWeb3Context()
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState('Upload Image')
  useEffect(() => {}, [])

  const mintingDetail = useAppSelector(getMintingstatus)
  const balance = useAppSelector(getBalance)

  const handleChangeImage = (e) => {
    if (e.target.files.length && e.target.files[0].size / 1024 / 1024 <= 5) {
      setSelectedFile(e.target.files[0].name)
      setMintImage(e.target.files)
    } else if (
      e.target.files.length &&
      e.target.files[0].size / 1024 / 1024 > 5
    )
      setSelectedFile('Max Size 5 MB')
    else setSelectedFile('Upload Image')
  }
  return (
    <div className="offcanvas-body image-info mt-4  pb-5 p-0 ">
      <h3> SQ.NFT SIZE</h3>
      <div className="mt-2">
        <form>
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi-border" />
            </span>
            <input
              type="number"
              min="1"
              max="1000000"
              defaultValue={1}
              aria-label="W"
              placeholder="Width"
              className="form-control"
              onChange={(e) => {
                dispatch(
                  setLand({
                    x: landData.x,
                    y: landData.y,
                    w: landData.w,
                    h: parseInt(e.target.value),
                  })
                )
              }}
            />
            
            <input
              type="number"
              aria-label="H"
              min="1"
              max="1000000"
              defaultValue={1}
              placeholder="Hight"
              className="form-control value="
              onChange={(e) => {
                dispatch(
                  setLand({
                    x: landData.x,
                    y: landData.y,
                    w: parseInt(e.target.value),
                    h: landData.h,
                  })
                )
              }}
            />
          </div>
        </form>
      </div>
      <p>
        Spec sq. Size (1 sq=10x10px)
      </p>
      <hr />
      <div className="">
      <span className=" me-2 mt-2"><b>Token Price:</b> 0.000058</span><br/>
       <span className=" me-2 mt-2"><b>Account Balance:</b>  {address ? <Web3Balance/> : 'Not Connected'}  </span>
    </div>

    <br/>
    <div className="d-flex  ">
        <span className=" me-2 mt-2">
          <img src="assets/images/square_icon.png" width="16px" /> :{' '}
          &nbsp;{landData.h * landData.w} {(landData.h * landData.w) == 1  ? 'token' : 'tokens'}
        </span>
        <span className="me-2 mt-2 text-nowrap">
          {' '}
      
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
          </svg> :
          &nbsp;{(landData.h * landData.w * 0.000058).toFixed(5)} ( $ {landData.h * landData.w}{' '}
          )
        </span>
   
    </div>
    <br/>
  <div className="flex flex-row">

        <span className="me-2 mt-2">
          <i className="bi bi-geo-alt" />: 
          &nbsp; {landData.x + 'X, ' + landData.y + 'Y'}
        </span>
        
        <span className=" me-2 mt-2">
          <i className="bi bi-border " />
          &nbsp;: ( {landData.h + ' X ' + landData.w} )
        </span>
        <br/>
      <div className="text-center">
        <h4>{mintingDetail}</h4>
      </div>

      {address ? 
        <>
        {balance < (landData.h * landData.w * 0.000058) && 
          <div className=" text-warning">
          <p>You do not have enough Etherium in your connected wallet. Please add some funds, refresh and try again.</p>
        </div>
        }
          <button
            className={`btn-primary hoverable d-block mx-3 mt-3 btn-md col-11` }
            onClick={handleSubmit}
            disabled={ balance < (landData.h * landData.w * 0.000058)}
          >
            <i className="bi-wallet me-2"></i> PURCHASE LOT
          </button>
        </>
        :
        <Web3Button title="PURCHASE LOT"/>
     }
      </div>
 
    </div>
  )
}
