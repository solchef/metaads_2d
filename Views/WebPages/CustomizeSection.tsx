/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import Image from 'next/image'

import { useEffect, useState } from 'react'
import {
  getMintingstatus,
  getParcel,
  selectLand,
  setLand,
  setUpdateImage,
} from '../../components/reducers/Settings'
import { TextureLoader, LoadingManager } from 'three'
import { useAppDispatch, useAppSelector } from '../../components/store/hooks'
import { useWeb3Context } from '../../context'

export const CustomizeSection = ({
  setName,
  setUrl,
  setMintImage,
  setDescription,
  handleSubmit,
}) => {
  const landData = useAppSelector(selectLand)
  const dispatch = useAppDispatch()
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState('Upload Image')


  const mintingDetail = useAppSelector(getMintingstatus)
  const {  network } = useWeb3Context()

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleChangeImage = (e) => {
    if (e.target.files.length && e.target.files[0].size / 1024 / 1024 <= 5) {
      setSelectedFile(e.target.files[0].name)
      setMintImage(e.target.files)
      setPreview(URL.createObjectURL(e.target.files[0]))
      dispatch(setUpdateImage(URL.createObjectURL(e.target.files[0])))
      // getBase64(e.target.files[0]).then((data) => {
        // const manager1 = new LoadingManager()
        // const texture = new TextureLoader(manager1).load(
        //   URL.createObjectURL(e.target.files[0])
        // )
        // manager1.onLoad = () => {
        //   texture.needsUpdate = true
        //   dispatch(setUpdateImage(texture))
        // }
      // })
    } else if (
      e.target.files.length &&
      e.target.files[0].size / 1024 / 1024 > 5
    )
      setSelectedFile('Max Size 5 MB')
    else setSelectedFile(e.target.files[0].name)
  }

  const checkIfValid = () => {
    // 
  }

  return (
    <div className="card-body m-3">
      <h3>Customize Your Squres</h3>
      <p>Set width and Height to customize</p>
      <div className="mt-2">
      
          <div className="input-group hoverable mb-4">
            <span className="input-group-text p-0">
              <i className="bi-border" />
            </span>
            <input
              type="number"
              min={1}
              max={1000}
              step={1}
              aria-label="W"
              pattern="^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$"
              placeholder="Width"
              value={landData.h}
              className="form-control"
              onChange={(e) => {
                checkIfValid()
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
              max="1000"
              pattern="^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$"
              step={1}
              placeholder="Hight"
              value={landData.w}
              className="form-control value="
              onChange={(e) => {
                dispatch(
                  setLand({
                    x: landData.x,
                    y: landData.y,
                    w: parseInt(e.target.value),
                    h: landData.h,
                  })
                ),
                  checkIfValid()
              }}
            />
          </div>
      
      </div>

      <div className="mt-2">
       
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-geo-alt"></i>
            </span>
            <input
              type="text"
              placeholder="Sq. NFT Name"
              className="form-control"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
          </div>
       
      
          <div className="input-group hoverable mb-4">
            <span className="input-group-text ">
              <i className="bi bi-link"></i>
            </span>
            <input
              type="url"
              placeholder="Redirect Link"
              className="form-control"
              onChange={(event) => {
                setUrl(event.target.value)
              }}
            />
          </div>
      

        <form
          style={{ cursor: 'pointer' }}
          onClick={() => document.getElementById('ghthth').click()}
        >
          <div className="input-group hoverable mb-3">
            <span className="input-group-text ">
              <i className="bi bi-upload"></i>
            </span>

            <input
              style={{
                borderBottomRightRadius: '0.25rem',
                borderTopRightRadius: '0.25rem',
                cursor: 'pointer',
                color: 'transparent',
              }}
              placeholder={selectedFile}
              className="form-control"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChangeImage}
              id="ghthth"
              style={{ display: 'none' }}
            />
          </div>

          {preview ? (
            <div className="text-center mb-2">
              <img alt={"preview"} src={preview} height={100} width={100} />
            </div>
          ) : (
            <></>
          )}
        </form>
      
          <div className="input-group hoverable mb-3">
            <span className="input-group-text ">
              <i className="bi bi-file-text"></i>
            </span>

            <textarea
              placeholder="Description"
              className="p-2  form-control"
              id="w3review"
              onChange={(event) => {
                setDescription(event.target.value)
              }}
              name="w3review"
              rows={4}
              cols={50}
            ></textarea>
          </div>
       
      </div>
      <p className="mb-3">
        Image Size ({landData.h}0 X {landData.w}0px) <br />
        Max Size: 5MB | File Type: JPG,PNG
      </p>
      <div className="text-center">
         {network && network.chainId === 1 ?
            <h4>{mintingDetail}</h4>
                : 
            <h4 className='text-danger'>You are connected to the wrong network. Please switch to Mainnet to mint</h4>
            }     
           </div>

      <button
        className="btn-primary hoverable mt-4 d-block  btn-md col-12"
        onClick={handleSubmit}
      >
        <i className="bi-wallet me-2"></i> UPLOAD INFO
      </button>
      <div className="d-flex mt-3 flex-wrap justify-content-between">
        <span className="me-2 mt-2">
          <i className="bi bi-geo-alt" />: &nbsp;
          {landData.x + 'X, ' + landData.y + 'Y'}
        </span>
        <span className=" me-2 mt-2">
          <i className="bi bi-border " />
          &nbsp;: ( {landData.h + ' X ' + landData.w} )
        </span>
      </div>
    </div>
  )
}
